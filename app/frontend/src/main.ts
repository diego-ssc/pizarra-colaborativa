import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAPIClient } from './lib/api/client'

const app = createApp(App)
const client = createAPIClient({
  baseURL: 'http://localhost:3000/api/auth/login',
  timeoutMillis: 5000,
  getAuthToken: () => {
    return null
  }
})

app.use(router)
app.use(client)

app.mount('#app')
