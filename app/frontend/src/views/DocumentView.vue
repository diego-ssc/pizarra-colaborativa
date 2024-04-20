<script setup lang="ts">
import EditorProvider from '@/components/EditorProvider.vue'
import EditorContainer from '@/components/EditorContainer.vue'
import UndoRedoButton from '@/components/UndoRedoButton.vue';
</script>

<template>
  <EditorProvider>
    <div class="h-full">
      <UndoRedoButton class="fixed top-2 left-2 z-[1001]"/>
      <EditorContainer class="h-full" />
    </div>
  </EditorProvider>
</template>
