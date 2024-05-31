<script setup lang="ts">
import { EDITOR_INJECTION_KEY, createEditor, provideEditor, useCollection, useEditor } from '@/lib/editor/editor'
import { sync } from '@/lib/editor/sync'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { inject, onBeforeUnmount, onMounted, onUnmounted, provide, ref } from 'vue'

const props = defineProps<{
  docID: string
  readonly: boolean
}>()

const collection = useCollection()
const synced = ref(false)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const editor = createEditor()
provide(EDITOR_INJECTION_KEY, editor)

function switchDoc (id: any) {
  synced.value = false
  let doc = collection.loadDoc(id)
  collection.collection.awarenessStore.awareness.setLocalStateField('user', { name:  user.value.username })
  editor.doc = doc
  sync(editor, doc, id, () => {
    collection.collection.awarenessStore.setReadonly(editor.doc.blockCollection, props.readonly)
    synced.value = true
  }, collection.collection.awarenessStore.awareness)
}

onMounted(() => {
  switchDoc(props.docID)
})
</script>

<template>
  <div>
    <slot v-if="synced"></slot>
  </div>
</template>


