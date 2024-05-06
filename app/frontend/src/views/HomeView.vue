<script setup lang="ts">
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

function confirmDeleteWhiteboard() {
  if (confirm('¿Estás seguro de que quieres borrar esta pizarra?')) {
    deleteWhiteboard()
  }else{

  }

  
}

function deleteWhiteboard() {
  console.log('Borrar pizarra')
}

const { get, data } = useGet<GetWhiteboardsResponse>(WhiteboardEndpoint)

onMounted(() => {
  get()
})

</script>


<template>
<div>
  
    <header style="background-color:#ffffff; padding: 15px;">
            <table style="float: right;">
                <tr>
                    <th> 
                        <Button @click="logout"> Cerrar sesión </Button>
                    </th>
                </tr>
            </table>
            <table>
                <tr>
                    <th>
                        <img src="../../public/pizarra.png" style="height: 40px; margin-left: 20px; float: left;">
                    </th>
                    <a href="/">
                        <th>
                            <img src="../../public/logo.png" alt="Logo de Pizarro" style="height: 40px; align-items:right;">
                        </th>
                    </a>
                </tr>
            </table>
    </header>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" class=" w-10" >
                  <path fill="#ffffff" d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/>
                </svg>
                <span class="block text-sm">Todas las pizarras</span>
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="flex items-center text-white hover:text-gray-10 hover:bg-gray-100 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" class=" w-10" >
                  <path fill="#ffffff" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                </svg>
                <span class="text-sm">Pizarras recientes</span>
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="flex items-center text-white hover:text-gray-10 hover:bg-gray-100 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" class=" w-10" >
                  <path fill="#ffffff" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                </svg>
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

                <div class="text-right mt-2"> <!-- Contenedor del botón con alineación a la derecha -->
                    <button style=" background-color:  yellow ; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;" @click="favouriteWhiteboard" >
                      <img src="../../public/favouriteWhiteboard.png" alt="favouriteWhiteboard" style="width: 20px; height: auto;">
                    </button>
                    <button style="background-color:  #d9005f ; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;" @click="confirmDeleteWhiteboard" onmouseover="this.style.backgroundColor='#ff0055';" onmouseout="this.style.backgroundColor='#d9005f';">
                      <img src="../../public/deleteWhiteboard.png" alt="deleteWhiteboard" style="width: 20px; height: auto;">
                    </button>
                </div>
            
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

