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
    <div class="flex justify-center items-center w-fit rounded-lg border bg-card shadow py-1.5 px-2.5">
        <RouterLink class="flex h-9 w-9" to="/">
            <img class="w-9 h-9" src="../../public/pizarra.png">
        </RouterLink>

        <input class="mx-2 outline-none focus:border focus:border-blue-500 rounded-l max-w-48 scroll-m-20 text-xl font-semibold tracking-tight" type="text" id="title-input" v-model="name" @blur="saveNewName(props.docID)"/>

        <ShareDocumentDialog/>
    </div>
</template>
