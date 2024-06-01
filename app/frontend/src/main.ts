import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouterAuthGuard } from './router'
import { createAPIClient } from './lib/api/client'
import { createPinia, storeToRefs } from 'pinia'
import { useUserStore } from './stores/user'
import { createCollection } from './lib/editor/editor'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
setupRouterAuthGuard(router)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const client = createAPIClient({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeoutMillis: 5000,
  getAuthToken: () => {
    return user.value ? user.value.token : ''
  }
})
app.use(client)

const collection = createCollection(client)
app.use(collection)

app.mount('#app')
