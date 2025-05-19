import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

let isRefreshing = false
let subscribers = []

function onRefreshed(token) {
  subscribers.forEach((cb) => cb(token))
  subscribers = []
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

// Request: add access token
api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

// Response: handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry && auth.refreshToken) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        try {
          const newToken = await auth.refreshAccessToken()
          isRefreshing = false
          onRefreshed(newToken)
        } catch (e) {
          isRefreshing = false
          return Promise.reject(e)
        }
      }

      return new Promise((resolve) => {
        addSubscriber((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(api(originalRequest))
        })
      })
    }

    return Promise.reject(error)
  },
)

export default api
