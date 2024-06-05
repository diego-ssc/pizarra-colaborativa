<script setup lang="ts">
import { WhiteboardEndpoint, type CreateWhiteboardRequest, type CreateWhiteboardResponse } from '@/lib/api/api';
import { useAPIClient } from '@/lib/api/client';
import { useCollection } from '@/lib/editor/editor';
import { useRouter } from 'vue-router';
import { ref } from 'vue';


const collection = useCollection()
const router = useRouter()
const client = useAPIClient()

const newBoardName = ref('')

async function addDoc (boardName: string) {
  const res = await client.post<CreateWhiteboardRequest, CreateWhiteboardResponse>(
    WhiteboardEndpoint,
    { title: boardName },
  )
  const id = res.data.whiteBoardId
  collection.createDoc(id)
  router.push({ path: `/d/${id}` })
}

</script>

<template>
  
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" >
    <div class="bg-white p-6 border border-black rounded-xl shadow-lg relative">
      <h1 class="flex justify-center font-bold mb-4">Nombre de la pizarra nueva:</h1>
      <input class="border border-black rounded m-2 w-full" type="text" v-model="newBoardName">
      <h1 class="flex justify-center font-bold mb-4">Selecciona un espacio de trabajo para la nueva pizarra:</h1>
      <div class="flex justify-center mb-4">
        <select class="border border-black rounded m-2" v-model="selectedWorkspace">
          <option v-for="workspace in workspaces" :key="workspace.id" :value="workspace.id">{{ workspace.name }}</option>
        </select>
      </div>
      <div class="flex justify-center">        
        <button class="border border-black p-2 rounded hover:bg-green-400" @click="addDoc(newBoardName)">Crear Pizarra</button>              
      </div>
    </div>
  </div>
</template>
