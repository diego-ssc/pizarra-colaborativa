<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { Button } from '../components/ui/button'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import TopBar from '@/components/TopBar.vue';


const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)

const router = useRouter()

onMounted(() => {
    if (isLoggedIn.value) {
        router.push({ name: 'home' })
    }
})

</script>

<template>
    <TopBar>
        <table style="float: right;">
            <tr>
                <th> 
                    <RouterLink to="/login"> <Button> Iniciar sesión </Button> </RouterLink>
                </th>
                <th>
                    <RouterLink to="/register"> <Button> Regístrate </Button> </RouterLink>
                </th>
             </tr>
        </table>
    </TopBar>

    <div style="background-color:black; text-align:center; padding: 8px;">
        <h1 style="color: white;"> 
            ¡Crear una pizarra colectiva nunca había sido tan fácil!
        </h1>
    </div>

    <div style="align-items: center; text-align:center; display: grid; grid-template-columns: 1fr 1fr;">
        <div style="align-items: center;">
            <p style="text-align: center; margin: 20px; padding: 10px;"> 
                <img src="../../public/Pizarro.png" style="height: 50%; align-content: center;">
                Con <b>pizarro</b>, puedes colaborar en cualquier momento con tus amigos, tu grupo de trabajo o tu equipo escolar.
                Sólo necesitas tener una cuenta para comenzar. <b>¿Todo listo?</b></p>
        </div>
        <div>
            <img src="../../public/muestra.png" style="border: 5px solid; border-radius: 5px; margin-top: 28px;">
        </div>
    </div>


    <footer style="background-color:black; position: absolute; bottom: 0px; width: 100%;">
        <p style=" color:white;font-size: xx-small;">Proyecto desarrollado por el equipo 1</p>
    </footer>
</template>
