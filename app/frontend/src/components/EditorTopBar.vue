<script setup lang="ts">
import { type GetWhiteboardsResponse, WhiteboardEndpoint, WhiteboardByIDEndpoint, } from '@/lib/api/api';
import { onMounted, ref } from 'vue';
import { useAPIClient, useGet, usePatch } from '@/lib/api/client';

const { get, data } = useGet<GetWhiteboardsResponse>(WhiteboardEndpoint)
const client = useAPIClient()
const newName = ref('')


async function editTitle(boardId: string) {
    try {
        await client.patch(WhiteboardByIDEndpoint({ id: boardId }), { title: newName.value })
        get()
    } catch (error) {
        console.error('Error al guardar el nuevo nombre:', error)
    }
}
</script>

<template>

    <div class="flex w-full w-fit rounded-xl border bg-card shadow">
        <div>
            <img class="ml-8 mt-3 w-36 h-10" src="../../public/logo.png" alt="Logo de Pizarro">

        </div>
        <router-link to="/home">
            <div class="left-content"> 
                <button class="px-3 py-2 bg-cyan-500 m-4 text-white rounded-xl shadow hover:bg-cyan-600">Mis pizarras</button>
            </div>
        </router-link>
        
        <div>
            <input class="border border-black rounded m-2 mt-6" type="text" v-model="newName">
            
        </div>

        <div class=""> 
            <button class="px-3 py-2 bg-amber-400 m-4 text-white rounded-xl shadow hover:bg-amber-600 ">Compartir</button>
        </div>

    </div>
</template>



