import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'

const routes = [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/company',
    name: 'list-companies',
    component: HomeView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'add',
        name: 'add-company',
        component: HomeView,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/import-sheet',
    name: 'import-sheet',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { getters } = store
  if (to.meta.requiresAuth && !getters['authentication/isAuthenticated']) {
    next({ name: 'sign-in' })
  } else {
    next()
  }
})

export default router
