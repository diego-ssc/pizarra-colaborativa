<script setup lang="ts">
import { useEditor, } from '@/lib/editor/editor'
import { sync } from '@/lib/editor/sync'

const props = defineProps<{
  docID: string
}>()

const editor = useEditor()

function switchDoc (id: any) {
  let doc = editor.collection.getDoc(id)
  if (!id) {
    console.log('id cant be empty')
  } else {
    console.log(doc)
    if (!doc) doc = editor.loadDoc(id)
    console.log('loaded doc')
    sync(editor.editor, doc, id)
  }
}

switchDoc(props.docID)
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>


