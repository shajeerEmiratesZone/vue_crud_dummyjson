import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'
// axios.defaults.baseURL = 'https://dummyjson.com'

const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(pinia)

const auth = useAuthStore()
auth.loadTokensFromStorage()

app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
