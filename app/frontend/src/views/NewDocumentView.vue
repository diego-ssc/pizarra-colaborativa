<script setup lang="ts">
import { WhiteboardEndpoint, type CreateWhiteboardRequest, type CreateWhiteboardResponse } from '@/lib/api/api';
import { useAPIClient } from '@/lib/api/client';
import { useCollection } from '@/lib/editor/editor';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';


const collection = useCollection()
const router = useRouter()
const client = useAPIClient()
const newBoardName = ref('')

const workspaces = ref([]) 
const selectedWorkspace = ref('') 

async function loadWorkspaces() {
  try {
    const response = await client.get('/')
    workspaces.value = response.data 
  } catch (error) {
    console.error('Error loading workspaces:', error)
  }
}

async function addDoc(boardName: string) {
  try {
    const res = await client.post<CreateWhiteboardRequest, CreateWhiteboardResponse>(
      WhiteboardEndpoint,
      { title: boardName }
    );
    const id = res.data.whiteBoardId;
    collection.createDoc(id);
    router.push({ path: `/d/${id}` });
  } catch (error) {
    console.error('Error creating whiteboard:', error);
  }
}

onMounted(() => {
  loadWorkspaces();
});

</script>

<template>
  
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div class="bg-white p-6 border border-black rounded-xl shadow-lg relative" style="width: 500px; margin-top: -50px;">
      <h1 class="flex justify-center font-bold mb-6 text-2xl">Nombre de la pizarra nueva:</h1>
      <input class="border border-black rounded m-2 w-full text-lg p-2" type="text" v-model="newBoardName">
      <h1 class="flex justify-center font-bold mt-6 mb-6 text-2xl">Selecciona un espacio de trabajo para la nueva pizarra:</h1>
      <div class="flex justify-center mb-4">
        <select class="border border-black rounded m-2 text-lg p-2" v-model="selectedWorkspace">
          <option v-for="workspace in workspaces" :key="workspace.id" :value="workspace.id">{{ workspace.name }}</option>
        </select>
      </div>
      <div class="flex justify-center">        
        <button class="border border-black p-2 rounded hover:bg-green-400 text-lg " @click="addDoc(newBoardName)">Crear Pizarra</button>              
      </div>
    </div>
  </div>
</template>
