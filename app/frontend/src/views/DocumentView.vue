<script setup lang="ts">
import EditorProvider from '@/components/EditorProvider.vue'
import EditorContainer from '@/components/EditorContainer.vue'
import UndoRedoButton from '@/components/UndoRedoButton.vue';
import { useRoute } from 'vue-router';
import { useGet } from '@/lib/api/client';
import { WhiteboardByIDEndpoint } from '@/lib/api/api';
import { onMounted } from 'vue';

const route = useRoute()
const docID = route.params.id as string

const { get, error, isLoading } = useGet(WhiteboardByIDEndpoint({ id: docID }))

onMounted(() => get())
</script>

<template>
  <div v-if="isLoading">Cargando ...</div>
  <div v-else-if="error">El documento no existe</div>
  <EditorProvider v-else :docID="docID">
    <div class="h-full">
      <UndoRedoButton class="absolute bottom-6 right-6 z-[1001]"/>
      <EditorContainer class="h-full" />
    </div>
  </EditorProvider>
</template>
