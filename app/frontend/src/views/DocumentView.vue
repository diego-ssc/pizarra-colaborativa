<script setup lang="ts">
import EditorProvider from '@/components/EditorProvider.vue'
import EditorContainer from '@/components/EditorContainer.vue'
import UndoRedoButton from '@/components/UndoRedoButton.vue';
import { useRoute } from 'vue-router';
import { useGet } from '@/lib/api/client';
import { WhiteboardByIDEndpoint, type GetWhiteboardByIDResponse, type HasAccessResponse, PermissionByIDEndpoint } from '@/lib/api/api';
import { onMounted } from 'vue';
import EditorTopBar from '@/components/EditorTopBar.vue';

const route = useRoute()
const docID = route.params.id as string

const docClient = useGet<GetWhiteboardByIDResponse>(WhiteboardByIDEndpoint({ id: docID }))
const permissionClient = useGet<HasAccessResponse>(PermissionByIDEndpoint({id: docID}))

onMounted(async () => {
  await permissionClient.get()
  await docClient.get()
})
</script>

<template>
  <div v-if="docClient.isLoading.value || permissionClient.isLoading.value">Cargando ...</div>
  <div v-else-if="permissionClient.error.value">Ha ocurrido un error</div>
  <div v-else-if="permissionClient.data.value === 'Denied'">No cuenta con los permisos necesarios para visualizar el documento</div>
  <div v-else-if="docClient.error.value">El documento no existe</div>
  <EditorProvider v-else-if="docClient.data.value && permissionClient.data.value" :docID="docID" :readonly="permissionClient.data.value === 'Read'">
    <div class="h-full">
      <EditorTopBar class="absolute top-6 left-6 z-40" :title="docClient.data.value.title" :docID="docID"/>
      <UndoRedoButton class="absolute bottom-6 right-6 z-40"/>
      <EditorContainer class="h-full" />
    </div>
  </EditorProvider>
</template>
