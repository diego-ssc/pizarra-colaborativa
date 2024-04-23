<script setup lang="ts">
import { collection, createDoc, provideEditor, loadDoc, initEditor } from '@/lib/editor/editor'
import { sync } from '@/lib/editor/sync'
import { api } from '@/lib/editor/api'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()

const room = route.params.id

initEditor()

function switchDoc (id: any) {
  let doc = collection.getDoc(id)
  if (!id) {
    console.log('id cant be empty')
  } else {
    if (!doc) doc = loadDoc(id)
    sync(doc, id)
  }
}

const router = useRouter()


async function addDoc () {
  const { id } = await api.addDocMeta()
  console.log(id)
  createDoc(id)
  switchDoc(id)
  router.push({ path: `/d/${id}` })
}

if (room) {
  switchDoc(room)
} else {
  addDoc()
}

provideEditor()
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>


