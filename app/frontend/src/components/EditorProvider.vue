<script setup lang="ts">
import { useEditor, } from '@/lib/editor/editor'
import { sync } from '@/lib/editor/sync'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const props = defineProps<{
  docID: string
}>()

const editor = useEditor()
const synced = ref(false)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

function switchDoc (id: any) {
  synced.value = false
  let doc = editor.collection.getDoc(id)
  if (!doc) {
    doc = editor.loadDoc(id)
  }
  console.log(editor.collection.awarenessStore.awareness)
  editor.collection.awarenessStore.awareness.setLocalStateField('user', { name:  user.value.username })
  sync(editor.editor, doc, id, () => {
    synced.value = true
  }, editor.collection.awarenessStore.awareness)
}

switchDoc(props.docID)
</script>

<template>
  <div>
    <slot v-if="synced"></slot>
  </div>
</template>


