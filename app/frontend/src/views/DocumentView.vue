<script setup lang="ts">
import EditorProvider from '@/components/EditorProvider.vue'
import EditorContainer from '@/components/EditorContainer.vue'
</script>

<template>
  <EditorProvider>
    <div class="h-full">
      <EditorContainer class="h-full" />
    </div>
  </EditorProvider>
</template>
