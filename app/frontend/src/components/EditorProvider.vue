<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { initEditor } from '@/lib/editor/editor'
import { DocCollection } from '@blocksuite/store'
import { AffineEditorContainer } from '@blocksuite/presets'

export interface AppState {
  editor: AffineEditorContainer
  collection: DocCollection
}

provide('appState', initEditor())
</script>
