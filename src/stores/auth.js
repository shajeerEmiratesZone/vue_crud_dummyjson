import { defineStore } from 'pinia'
import api from '@/api/axios.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    avatar: null,
    fullName: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state?.accessToken,
  },
  actions: {
    async login(credentials) {
      const res = await api.post('/user/login', credentials)
      this.accessToken = res.data.accessToken
      this.refreshToken = res.data.refreshToken
      this.avatar = res.data.image
      this.fullName = res.data.firstName + ' ' + res.data.lastName
      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)
      localStorage.setItem('avatar', this.avatar)
      localStorage.setItem('fullName', this.fullName)
      await this.getLoggedInUser()
    },

    async getLoggedInUser() {
      const res = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      this.user = res.data
    },

    async logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      this.avatar = null
      this.fullName = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('avatar')
      localStorage.removeItem('fullName')
    },

    loadTokensFromStorage() {
      this.accessToken = localStorage.getItem('accessToken')
      this.refreshToken = localStorage.getItem('refreshToken')
      this.avatar = localStorage.getItem('avatar')
      this.fullName = localStorage.getItem('fullName')
    },

    async refreshAcessToken() {
      try {
        const res = await api.post('/auth/refresh', {
          refreshToken: this.refreshToken,
        })
        this.accessToken = res.data.accessToken
        localStorage.setItem('accessToken', this.accessToken)
        return this.accessToken
      } catch (e) {
        this.logout()
        throw e
      }
    },
  },
})
