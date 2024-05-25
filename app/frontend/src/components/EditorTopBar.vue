<script setup lang="ts">
import { type GetWhiteboardsResponse, WhiteboardEndpoint, WhiteboardByIDEndpoint } from '@/lib/api/api';
import { onMounted, ref, watch } from 'vue';
import { useAPIClient, useGet, usePatch } from '@/lib/api/client';
import { useRoute } from 'vue-router'; 

const { get, data } = useGet<GetWhiteboardsResponse>(WhiteboardEndpoint);
const client = useAPIClient();
const route = useRoute(); 
const boardId = route.params.id as string; 
const name = ref('');
const showName = ref(false);

function currentWhiteboard(boardId: string): void {
    showName.value = true;
    name.value = data.value!.find(board => board.whiteBoardId === boardId)?.title || ''
}

async function saveNewName(boardId: string) {
    try {
        await client.patch(WhiteboardByIDEndpoint({ id: boardId }), { title: name.value })
        get()
        showName.value = false;
    } catch (error) {
        console.error('Error al guardar el nuevo nombre:', error)
    }
}



onMounted(() => {
    get();    
});


</script>

<template>
    <div class="flex w-full w-fit rounded-xl border bg-card shadow">
        <div>
            <img class="ml-8 mt-3 w-36 h-10" src="../../public/logo.png" alt="Logo de Pizarro">
        </div>
        <router-link to="/home">
            <div class="left-content">
                <button class="px-3 py-2 bg-cyan-500 m-4 text-black font-bold rounded-xl shadow hover:bg-cyan-600">Mis pizarras</button>
            </div>
        </router-link>
        <button class="px-3 py-2 bg-green-400 m-4 text-black font-bold rounded-xl shadow hover:bg-green-600" @click="currentWhiteboard(boardId)">Cambiar nombre</button>

        <div v-if="showName">
        <input class="border border-black rounded-xl m-4 text-center mt-6" type="text" id="title-input" v-model="name" @keydown.enter="saveNewName(boardId)"/>
        </div>
        
        <button class="px-3 py-2 bg-amber-400 m-4 text-black font-bold rounded-xl shadow hover:bg-amber-600 ml-auto">Compartir</button>
    </div>
</template>
