import { createRouter, createWebHistory, type Router } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import LoginView from '@/views/LoginView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import CreateAccountView from '@/views/CreateAccountView.vue'
import NewDocumentView from '@/views/NewDocumentView.vue'
import Landing from '@/views/Landing.vue'

const DocumentView = () => import('../views/DocumentView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: CreateAccountView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/d/:id',
      name: 'document',
      component: DocumentView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'newdoc',
      component: NewDocumentView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound,
      meta: {
        requiresAtuh: false
      }
    }
  ]
})

export function setupRouterAuthGuard(router: Router) {
  const userStore = useUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  router.beforeEach((to, _, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!isLoggedIn.value) {
        next({ name: 'login' })
      } else {
        next()
      }
    } else {
      next()
    }
  })
}

export default router
