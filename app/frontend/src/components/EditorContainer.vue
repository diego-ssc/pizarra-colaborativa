<script setup lang="ts">
import { useEditor } from '@/lib/editor/editor';
import { onMounted, ref } from 'vue'

const { editor } = useEditor();
const editorContainerRef = ref<HTMLDivElement>()

onMounted(() => {
  editorContainerRef.value && editorContainerRef.value.appendChild(editor)
})
</script>

<template>
  <div class="editor-container" ref="editorContainerRef"></div>
</template>

