import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const STORE_NAME = 'user'

export const useUserStore = defineStore('user', () => {
  const authToken = useLocalStorage<string>(STORE_NAME, '')

  const isLoggedIn = computed(() => authToken.value !== '')

  function login(token: string) {
    authToken.value = token
  }

  function logout() {
    authToken.value = ''
  }

  return { authToken, isLoggedIn, login, logout }
})
