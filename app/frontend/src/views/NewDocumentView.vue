<script setup lang="ts">
import { GetUserByIDResponse, GetWhiteboardsResponse, WhiteboardEndpoint, type CreateWhiteboardRequest, type CreateWhiteboardResponse } from '@/lib/api/api';
import { useAPIClient, useGet } from '@/lib/api/client';
import { useCollection } from '@/lib/editor/editor';
import { useRouter } from 'vue-router';
import { ref } from 'vue';


const collection = useCollection()
const router = useRouter()
const client = useAPIClient()
const newBoardName = ref('')


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

</script>

<template>
  
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div class="bg-white p-6 border border-black rounded-xl shadow-lg relative" style="width: 500px; margin-top: -50px;">
      <h1 class="flex justify-center font-bold mb-6 text-2xl">Nombre de la pizarra nueva:</h1>
      <input class="border border-black rounded m-2 w-full text-lg p-2" placeholder="Nombre de la Pizarra" type="text" v-model="newBoardName">
      
      <div class="flex justify-center">        
        <button class="border border-black p-2 rounded hover:bg-green-400 text-lg mt-6 " @click="addDoc(newBoardName)">Crear Pizarra</button>              
      </div>
    </div>
  </div>
</template>
