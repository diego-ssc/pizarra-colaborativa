import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouterAuthGuard } from './router'
import { createAPIClient } from './lib/api/client'
import { createPinia, storeToRefs } from 'pinia'
import { useUserStore } from './stores/user'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
setupRouterAuthGuard(router)

const userStore = useUserStore()
const { authToken } = storeToRefs(userStore)

const client = createAPIClient({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeoutMillis: 5000,
  getAuthToken: () => {
    return authToken.value
  }
})

app.use(client)

app.mount('#app')
