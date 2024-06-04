<script setup lang="ts">
import { WhiteboardByIDEndpoint } from '@/lib/api/api';
import { ref } from 'vue';
import { useAPIClient } from '@/lib/api/client';
import ShareDocumentDialog from './ShareDocumentDialog.vue';

const props = defineProps<{
    docID: string
    title: string
}>()

const client = useAPIClient();
const name = ref(props.title);

async function saveNewName(boardId: string) {
    try {
        await client.patch(WhiteboardByIDEndpoint({ id: boardId }), { title: name.value })
    } catch (error) {
        console.error('Error al guardar el nuevo nombre:', error)
    }
}
</script>

<template>
    <div class="flex justify-center items-center w-fit rounded-2xl border bg-card shadow p-2">
        <RouterLink class="flex h-10 ml-5 mr-5" to="/">
            <img class="w-10 h-10" src="../../public/pizarra.png">
        </RouterLink>

        <input class="mx-2 outline-none focus:border focus:border-blue-500 rounded-l text-2xl font-semibold tracking-tight" type="text" id="title-input" v-model="name" @blur="saveNewName(props.docID)"/>

        <ShareDocumentDialog/>
    </div>
</template>
