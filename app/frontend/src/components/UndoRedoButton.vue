<script setup lang="ts">
import { useEditor } from '@/lib/editor/editor'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { onBeforeMount, ref } from 'vue';
import UndoIcon from '@/components/icons/UndoIcon.vue';
import RedoIcon from '@/components/icons/RedoIcon.vue';


const editor = useEditor()

const canUndo = ref(false)
const canRedo = ref(false)

onBeforeMount(() => {
  editor.doc.slots.historyUpdated.on(() => {
    canUndo.value = editor.doc.canUndo
    canRedo.value = editor.doc.canRedo
  })
})
</script>

<template>
  <div class="flex justify-center items-center w-fit rounded-xl border bg-card shadow">
    <Button variant="ghost" :disabled="!canUndo" @click="editor.doc.undo()">
      <UndoIcon />
    </Button>
    <Separator orientation="vertical"/>
    <Button variant="ghost" :disabled="!canRedo" @click="editor.doc.redo()">
      <RedoIcon />
    </Button>
  </div>
</template>
