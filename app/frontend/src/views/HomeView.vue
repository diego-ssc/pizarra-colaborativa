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
import ShareIcon from '@/components/icons/ShareIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import BarsIcon from '@/components/icons/BarsIcon.vue';

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

    <div class="flex flex-row h-full">
      <div class="bg-black w-50 overflow-hidden transition-all duration-300" :class="{ 'w-64': isSidebarOpen }">
        <div class="p-3">
          <button class="text-white hover:text-white focus:outline-none ml-4" @click="isSidebarOpen = !isSidebarOpen">
            <BarsIcon class="fill-current"/>
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
                <ShareIcon/>
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
                <PlusIcon/>
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

