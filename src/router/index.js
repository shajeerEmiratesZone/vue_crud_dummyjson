import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      meta: { requiresAuth: true },
      component: () => import('../views/Users/Index.vue'),
    },
    {
      path: '/users/create',
      name: 'create-user',
      meta: { requiresAuth: true },
      component: () => import('../views/Users/Create.vue'),
    },
    {
      path: '/users/edit/:id',
      name: 'edit-user',
      meta: { requiresAuth: true },
      component: () => import('../views/Users/Edit.vue'),
    },
    {
      path: '/login',
      name: 'login-form',
      component: () => import('../views/Auth/Login.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  if (!auth.accessToken && localStorage.getItem('refreshToken')) {
    await auth.refreshAccessToken()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
