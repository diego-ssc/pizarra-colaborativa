<script setup lang="ts">
import { useRouter } from 'vue-router'

import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle } from '../components/ui/card'

const props = defineProps<{
  title: string
  linkTitle: string
  linkName: string
}>()

const router = useRouter()
function navTo() {
  router.push({ name: props.linkName })
}
</script>

<template>
  <div class="flex justify-center h-screen items-start mt-32">
    <div class="w-full max-w-md p-6 bg-white">
      <Card class="shadow-lg">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl">
            <div class="flow-root">
              <p class="float-left text-2xl">{{ title }}</p>
              <Button class="float-right" variant="link" @click="navTo">
                {{ linkTitle }}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <slot></slot>
      </Card>
    </div>
  </div>
</template>
