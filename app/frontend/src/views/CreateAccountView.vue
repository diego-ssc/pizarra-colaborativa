<script setup lang="ts">
import { useRouter } from 'vue-router'

import { Button } from '../components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'

const router = useRouter()

function navToLogin() {
  router.push({ path: 'login' })
}
</script>
<template>
  <div class="flex justify-center h-screen items-start mt-32">
    <div class="w-full max-w-md p-6 bg-white">
      <Card class="shadow-lg">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl">
            <div class="flow-root">
              <p class="float-left text-2xl">Regístrate</p>
              <Button class="float-right" variant="link" @click="navToLogin">Inicia sesión</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid grid-cols-2 gap-6"></div>

          <div class="grid gap-2">
            <Label for="email">Nombre de usuario</Label>
            <Input id="email" type="email" placeholder="" />
          </div>
          <div class="grid gap-2">
            <Label for="email">Correo electrónico</Label>
            <Input id="email" type="email" placeholder="m@ejemplo.com" />
          </div>
          <div class="grid gap-2">
            <Label for="password">Contraseña</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full"> Regístrarse </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
