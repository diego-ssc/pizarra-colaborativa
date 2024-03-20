<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAPIClient, type HTTPResponse } from '@/lib/api/client'
import { HomeEndpoint } from '@/lib/api/api'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Button } from '@/components/ui/button'

const loading = ref(false)
const message = ref<HTTPResponse<any, any> | null>(null)
const error = ref(null)

const client = useAPIClient()
const router = useRouter()
const userStore = useUserStore()

async function fetchHello() {
  error.value = message.value = null
  loading.value = true

  try {
    const response = await client.get(HomeEndpoint)
    message.value = response.data
  } catch (err: any) {
    if (err instanceof AxiosError && err.request && err.request.status === 401) {
      userStore.logout()
      router.push({ name: 'login' })
    } else {
      error.value = err.toString()
    }
  } finally {
    loading.value = false
  }
}

function onClick() {
  userStore.logout()
  router.push({ name: 'login' })
}

onMounted(() => {
  fetchHello()
})
</script>

<template>
  <div class="post">
    <div v-if="loading" class="loading">Cargando...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="message" class="content">
      <h2
        class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        {{ message }}
      </h2>
      <Button @click="onClick"> Cerrar sesión </Button>
    </div>
  </div>
</template>
