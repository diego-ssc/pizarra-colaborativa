<script setup lang="ts">
import { useEditor, } from '@/lib/editor/editor'
import { sync } from '@/lib/editor/sync'
import { ref } from 'vue'

const props = defineProps<{
  docID: string
}>()

const editor = useEditor()
const synced = ref(false)

function switchDoc (id: any) {
  synced.value = false
  let doc = editor.collection.getDoc(id)
  if (!doc) {
    doc = editor.loadDoc(id)
  }
  sync(editor.editor, doc, id, () => {
    synced.value = true
  })
}

switchDoc(props.docID)
</script>

<template>
  <div>
    <slot v-if="synced"></slot>
  </div>
</template>


