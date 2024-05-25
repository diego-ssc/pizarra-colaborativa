import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

const STORE_NAME = 'user'

export type User = {
  id: string,
  token: string,
  username: string,
  email: string
}

export const useUserStore = defineStore('user', () => {
  const user = useLocalStorage<User>(STORE_NAME, { id: '', token: '', username: '', email: '' })

  const isLoggedIn = computed(() => user.value.token !== '')

  async function login(id: string, token: string, cb?: (user: RemovableRef<User>) => Promise<void>) {
    user.value.id = id
    user.value.token = token
    if (cb) {
      await cb(user)
    }
  }

  function logout() {
    user.value.id = ''
    user.value.token = ''
    user.value.username = ''
    user.value.email = ''
  }

  return { user, isLoggedIn, login, logout }
})
