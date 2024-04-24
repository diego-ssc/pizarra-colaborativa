<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '../components/ui/button'
import CardFooter from '@/components/ui/card/CardFooter.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import { ref } from 'vue';

const showSidebar = ref(false);
const userName = 'John Doe'; // nombre del usuario


</script>

<template>
    <header style="background-color:#ffffff; padding: 15px;">
            <table style="float: right;">
                <tr>
                    <th> 
                        <a href="/login"> <Button> Cerrar sesión </Button> </a>
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

    <div style="background-color:black; text-align:center; padding: 2px;">
        <h1 style="color: white;"> 
        </h1>
    </div>
    <div v-if="showSidebar" style="background-color: black; width: 200px; height: 100vh; position: fixed; top: 0; left: 0; z-index: 1;">
     <h2 style="color: white;">Nombre del usuario</h2>
     <!-- Contenido de la barra lateral -->
   </div>

  <!-- Botón para desplegar la barra lateral -->
    <button @click="showSidebar =!showSidebar" style="background-color: black; color: white; border: none; padding: 10px; cursor: pointer;">
    {{ userName }}
   </button>




    <footer style="background-color:black; position: absolute; bottom: 0px; width: 100%;">
        <p style=" color:white;font-size: xx-small;">Proyecto desarrollado por el equipo 1</p>
    </footer>
</template>