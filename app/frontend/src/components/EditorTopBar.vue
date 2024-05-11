<script setup lang="ts">
import { type GetWhiteboardsResponse, WhiteboardEndpoint, WhiteboardByIDEndpoint, } from '@/lib/api/api';
import { onMounted, ref } from 'vue';
import { useAPIClient, useGet, usePatch } from '@/lib/api/client';

const { get, data } = useGet<GetWhiteboardsResponse>(WhiteboardEndpoint)
const client = useAPIClient()
const newName = ref('')
const editing = ref(false)


async function editTitle(boardId: string) {
    try {
        await client.patch(WhiteboardByIDEndpoint({ id: boardId }), { title: newName.value })
        get()
    } catch (error) {
        console.error('Error al guardar el nuevo nombre:', error)
    }
}

function start_editing() {
    editing.value = true
}

function saveTitle(){

}

function toggleEditing() {
    editing.value = !editing.value;
}
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
        
        <div v-if="!editing" @click="startEditing">{{ newName }}</div>
        <input class="border border-black rounded-xl m-2 mt-6 ml-10" type="text" v-model="newName">
            

        <button class="px-3 py-2 bg-amber-400 m-4 text-black font-bold rounded-xl shadow hover:bg-amber-600 ml-auto">Compartir</button>

    </div>
</template>



