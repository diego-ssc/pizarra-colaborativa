<script setup lang="ts">
import { provideEditor } from '@/lib/editor/editor'

provideEditor()
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>


