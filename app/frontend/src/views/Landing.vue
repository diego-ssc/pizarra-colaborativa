<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '../components/ui/button'
import CardFooter from '@/components/ui/card/CardFooter.vue';
import CardContent from '@/components/ui/card/CardContent.vue';



</script>

<template>
    <header style="background-color:#ffffff; padding: 15px;">
            <table style="float: right;">
                <tr>
                    <th> 
                        <a href="/login"> <Button> Iniciar sesión </Button> </a>
                    </th>
                    <th>
                        <a href="/register"> <Button> Regístrate </Button> </a>
                    </th>
                </tr>
            </table>
            <table>
                <tr>
                    <th>
                        <img src="../../public/pizarra.png" style="height: 60px; margin-left: 20px; float: left;">
                    </th>
                    <a href="/">
                        <th>
                            <img src="../../public/logo.png" alt="Logo de Pizarro" style="height: 50px; align-items:right;">
                        </th>
                    </a>
                </tr>
            </table>
    </header>

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