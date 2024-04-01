<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useGet } from '@/lib/api/client'
import { HomeEndpoint } from '@/lib/api/api'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Button } from '@/components/ui/button'

const router = useRouter()
const userStore = useUserStore()

const { get, data, error, isLoading } = useGet(HomeEndpoint)

watch(error, (err) => {
  if (err) {
    if (err instanceof AxiosError && err.request && err.request.status === 401) {
      userStore.logout()
      router.push({ name: 'login' })
    }
  }
})

function onClick() {
  userStore.logout()
  router.push({ name: 'login' })
}

onMounted(() => get())
</script>

<template>
  <div class="post">
    <div v-if="isLoading" class="loading">Cargando...</div>

    <div v-if="error" class="error">{{ error.toString() }}</div>

    <div v-if="data" class="content">
      <h2
        class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        {{ data }}
      </h2>
      <Button @click="onClick"> Cerrar sesión </Button>
    </div>
  </div>
</template>
