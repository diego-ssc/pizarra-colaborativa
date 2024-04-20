<script setup lang="ts">
import { useEditor } from '@/lib/editor/editor'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ref } from 'vue';
import IconUndo from '@/components/icons/IconUndo.vue';
import IconRedo from '@/components/icons/IconRedo.vue';


const { editor } = useEditor()

const canUndo = ref(false)
const canRedo = ref(false)

editor.doc.slots.historyUpdated.on(() => {
  canUndo.value = editor.doc.canUndo
  canRedo.value = editor.doc.canRedo
})
</script>

<template>
  <div class="flex justify-center items-center w-fit rounded-xl border bg-card shadow">
    <Button variant="ghost" :disabled="!canUndo" @click="editor.doc.undo()">
      <IconUndo />
    </Button>
    <Separator orientation="vertical"/>
    <Button variant="ghost" :disabled="!canRedo" @click="editor.doc.redo()">
      <IconRedo />
    </Button>
  </div>
</template>
