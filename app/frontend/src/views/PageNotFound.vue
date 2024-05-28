<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Card, CardHeader, CardTitle } from '../components/ui/card'
import TopBar from '@/components/TopBar.vue';
const userStore = useUserStore()
</script>


<template>
  <TopBar></TopBar>
    <div class="flex justify-center h-screen items-start mt-32">
      <div class="w-full max-w-md p-6 bg-white">
        <Card class="shadow-lg">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl">
                <h1>Oh...</h1>
              <div class="flow-root">
                <div class="container">
                <img src="../../public/Error.png" />
            </div>
            <center><h1 class="float-center text-2xl">Error 404: Página inexistente</h1></center>
              </div>
            </CardTitle>
            <center>
                <p> ¡Vaya! ¿Por qué no lo intentas otra vez? <br> Esta vez hazlo con una página que sí exista.</p>
            </center>
        </CardHeader>
        </Card>
      </div>
    </div>
  </template>