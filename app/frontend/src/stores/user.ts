import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const authToken = ref('')

  const isLoggedIn = computed(() => authToken.value !== '')

  function login(token: string) {
    authToken.value = token
  }

  function logout() {
    authToken.value = ''
  }

  return { authToken, isLoggedIn, login, logout }
})
