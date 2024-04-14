<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { type AppState } from './EditorProvider.vue'

const { editor } = inject<AppState>('appState')!
const editorContainerRef = ref<HTMLDivElement>()

onMounted(() => {
  editorContainerRef.value && editorContainerRef.value.appendChild(editor)
})
</script>

<template>
  <div class="editor-container" ref="editorContainerRef"></div>
</template>

