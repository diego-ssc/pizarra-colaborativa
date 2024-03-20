<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAPIClient, type HTTPResponse } from '@/lib/api/client'
import { HomeEndpoint } from '@/lib/api/api'

const loading = ref(false)
const message = ref<HTTPResponse<any, any> | null>(null)
const error = ref(null)

const client = useAPIClient()

async function fetchHello() {
  error.value = message.value = null
  loading.value = true

  try {
    const response = await client.get(HomeEndpoint)
    message.value = response.data
  } catch (err: any) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
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
    </div>
  </div>
</template>
