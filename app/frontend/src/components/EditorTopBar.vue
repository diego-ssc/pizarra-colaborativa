<script setup lang="ts">

</script>

<template>

    <div class="flex w-full w-fit rounded-xl border bg-card shadow">
        <div>
            <img class="w-36 h-10" src="../../public/logo.png" alt="Logo de Pizarro">

        </div>
        <div class="left-content"> 
            <button class="px-3 py-2 bg-cyan-500 m-4 text-white rounded-xl shadow ">Mis pizarras</button>
        </div>
        <div class="right-content"> 
            <button class="px-3 py-2 bg-amber-400 m-4 text-white rounded-xl  shadow ">Compartir</button>
        </div>
        <div>
            <input class="border border-black rounded m-2" type="text" v-model="newName">
            
        </div>
    </div>
</template>



