<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import TopBar from '@/components/TopBar.vue';
import ClockIcon from '@/components/icons/ClockIcon.vue';
import WorldIcon from '@/components/icons/WorldIcon.vue';
import StarIcon from '@/components/icons/StarIcon.vue';
import { Button } from '@/components/ui/button'
import { type GetWhiteboardsResponse, WhiteboardEndpoint } from '@/lib/api/api';
import { useGet } from '@/lib/api/client';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const isSidebarOpen = ref(false)

const userStore = useUserStore()
const router = useRouter()

function logout() {
  userStore.logout()
  router.push({ path: '/' })
}

const { get, data } = useGet<GetWhiteboardsResponse>(WhiteboardEndpoint)

onMounted(() => {
  get()
})

</script>


<template>
<div>
  <TopBar>
    <div class="flex grow justify-end">
      <div class="flex grow justify-center">
        <SearchBar/>
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
      <div class="flex items-center">
    </div>


    <div class="flex flex-row h-full">
      <div class="bg-black w-50 overflow-hidden transition-all duration-300" :class="{ 'w-64': isSidebarOpen }">
        <div class="p-3">
           <!-- icono bonito -->
          <button class="text-white hover:text-white focus:outline-none ml-4" @click="isSidebarOpen = !isSidebarOpen">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M4 5h12v2H4V5zm0 7h12v2H4v-2zm0 7h12v2H4v-2z"/></svg>
        </button>

        </div>
        <div class="px-4 py-0" v-if="isSidebarOpen">
          <ul>
            <li class="mb-2">
              <a href="#" class="flex items-center text-white hover:text-gray-10 hover:bg-gray-100 p-2 rounded">
               <WorldIcon/>
               <span class="block text-sm">Todas las pizarras</span>
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="flex items-center text-white hover:text-gray-10 hover:bg-gray-100 p-2 rounded">
                <ClockIcon/>
                <span class="text-sm">Pizarras recientes</span>
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="flex items-center text-white hover:text-gray-10 hover:bg-gray-100 p-2 rounded">
                <StarIcon/>
                <span class="block text-sm">Pizarras favoritas</span>
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="flex items-center text-white hover:text-gray-10 hover:bg-gray-100 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" class=" w-10" >
                  <path fill="#ffffff" d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/>
                </svg>
                <span class="block text-sm">Pizarras compartidas</span>
              </a>
            </li>
          </ul>
        </div>
      </div>


      
      <div class="bg-white w-full p-4">
        <div class="flex flex-wrap -mx-3 mb-6">

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <div class="border border-black border-t-1 border-b-4 border-x-1 p-3 rounded flex flex-col justify-content-flex-end hover:bg-gray-300">
              <RouterLink to="/new">
              <div class="flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" class="flex-1">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
              </div>
              <h2 class="text-sm font-italic text-black text-center">Nueva pizarra</h2>
              </RouterLink>
            </div>
          </div>

          <div v-for="board in data" class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <RouterLink :to="{ path: 'd/' + board.whiteBoardId }">
            <div class="border border-black border-t-1 border-b-4 border-x-1 p-3 rounded flex flex-col justify-content-flex-end hover:bg-gray-300">
              <h2 class="text-sm font-italic text-black text-center border-b-2 mb-0">{{ board.title }}</h2>
              <h6 class="text-sm font-italic text-black text-center border-b-2 mb-0">Fecha creación: {{ board.createdAt }}</h6>
            </div>
            </RouterLink>
          </div>
        </div>
      </div>

      
    </div>
  </div>

</div>

    <footer style="background-color:black; position: absolute; bottom: 0px; width: 100%;">
        <p style=" color:white;font-size: xx-small;">Proyecto desarrollado por el equipo 1</p>
    </footer>
</div>
</template>

