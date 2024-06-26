<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import TopBar from '@/components/TopBar.vue';
import SideBar from '@/components/SideBar.vue';
import ClockIcon from '@/components/icons/ClockIcon.vue';
import WorldIcon from '@/components/icons/WorldIcon.vue';
import StarIcon from '@/components/icons/StarIcon.vue';
import { Button } from '@/components/ui/button'
import { type GetWhiteboardsResponse, WhiteboardEndpoint, WhiteboardByIDEndpoint, } from '@/lib/api/api';
import { useAPIClient, useGet, usePatch } from '@/lib/api/client';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ShareIcon from '@/components/icons/ShareIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import { Input } from '@/components/ui/input'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';

const userStore = useUserStore()
const router = useRouter()

const showModal = ref(false)
const newName = ref('')
const selectedBoardID = ref('')


const { get, data } = useGet<GetWhiteboardsResponse>(WhiteboardEndpoint)
const client = useAPIClient()

async function saveNewName(boardId: string) {
  try {
    await client.patch(WhiteboardByIDEndpoint({ id: boardId }), { title: newName.value })
    get()
    closeModal()
  } catch (error) {
    console.error('Error al guardar el nuevo nombre:', error)
  }
}

function openModal(boardId: string): void {
  showModal.value = true;
  newName.value = data.value!.find(board => board.whiteBoardId === boardId)?.title || ''
  selectedBoardID.value = boardId
}

function closeModal(): void {
  showModal.value = false;
}

function logout() {
  userStore.logout()
  router.push({ path: '/' })
}


async function confirmDeleteWhiteboard(boardId: string) {
  if (confirm('¿Estás seguro de que quieres borrar esta pizarra?')) {
    await deleteWhiteboard(boardId)
  }
}

async function deleteWhiteboard(boardId: string) {
  try {
    await client.delete(WhiteboardByIDEndpoint({ id: boardId }))
    get()
  } catch (error) {
    console.error('Error al guardar el nuevo nombre:', error)
  }
}

const searchQuery = ref<string | number>('');

onMounted(() => {
  get()
})

function onEnter() {
  if (searchQuery.value === '') {
    get()
  } else {
    get({title: searchQuery.value })
  }
}
</script>


<template>
<div>
  <TopBar>
    <div class="flex grow justify-end">
      <div class="flex grow justify-center">
        <Input v-model="searchQuery" v-on:keyup.enter="onEnter" type="search" placeholder="Buscar..." class="md:w-[250px] lg:w-[450px]"/>
      </div>
      <Button class="justify-self-end mr-5" @click="logout"> Cerrar sesión </Button>
    </div>
  </TopBar>

 <!-- Linea negra -->
 <div class="flex flex-col h-screen" :style="{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }">
    <div style="background-color:black; text-align:center; padding: 2px;">
        <h1 style="color: white;"> 
        </h1>
    </div>

 <!-- centrar  -->
    <div class="flex flex-col h-screen">

    <div class="flex flex-row h-full">
      
      <ScrollArea class="w-full h-full">
      <div class="bg-white w-full p-4">
        <div class="flex flex-wrap -mx-3 mb-6">

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <div class="border border-black border-t-1 border-b-4 border-x-1 p-3 rounded flex flex-col justify-content-flex-end hover:bg-gray-300">
            <RouterLink to="/new">  
              <div class="flex items-center justify-center mb-2 cursor-pointer" @click="openNewBoardModal">
                <PlusIcon/>
              </div>
              <h2 class="text-sm font-italic text-black text-center">Nueva pizarra</h2>
            </RouterLink>
            </div>
          </div>

          

          <div v-for="board in data" class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              
            <div class="border border-black border-t-1 border-b-4 border-x-1 p-3 rounded flex flex-col justify-content-flex-end hover:bg-gray-300">
              <RouterLink :to="{ path: 'd/' + board.whiteBoardId }">
                <h2 class="text-sm font-italic text-black text-center border-b-2 mb-0">{{ board.title }}</h2>
                <h6 class="text-sm font-italic text-black text-center border-b-2 mb-0">Fecha creación: {{ board.createdAt }}</h6>
              </RouterLink>   
              <div class="text-right mt-1"> 

                <button v-if="board.role === 'Admin'" class="border border-black p-0.5 rounded hover:bg-blue-400 mr-1" @click="openModal(board.whiteBoardId)">
                  <img src="../../public/editBoard.png" alt="editWhiteboard" style="width: 20px; height: auto;">
                </button>


                <button v-if="board.role === 'Admin'" class="border border-black p-0.5 rounded hover:bg-red-500 mr-1" @click="confirmDeleteWhiteboard(board.whiteBoardId)" >
                  <img src="../../public/deleteWhiteboard.png" alt="deleteWhiteboard" style="width: 20px; height: auto;">
                </button>
              </div>
            </div>
          </div>

          <transition>
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" v-if="showModal">
              <div class="bg-white p-6 border border-black rounded-xl shadow-lg relative">
                <h1 class="flex justify-center font-bold">Nuevo nombre de la pizarra: </h1>
                <input class="border border-black rounded m-2" type="text" v-model="newName">
                <button class="border border-black p-1 rounded hover:bg-green-400" @click="saveNewName(selectedBoardID)"> Guardar</button>
                <button class="text-xl font-bold absolute top-1 right-2" @click="closeModal">&times;</button>
              </div>
            </div>
          </transition>
          
        </div>
      </div>
      </ScrollArea>
    </div>
  </div>
</div>

</div>
</template>





