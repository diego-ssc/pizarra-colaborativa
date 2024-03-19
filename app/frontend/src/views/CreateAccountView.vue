<script setup lang="ts">
import { Button } from '../components/ui/button'
import { CardContent, CardFooter } from '../components/ui/card'
import AuthCard from '@/components/AuthCard.vue'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'

const authCardProps = {
  title: 'Regístrate',
  linkTitle: 'Inicia sesión',
  linkName: 'login'
}
</script>
<template>
  <AuthCard v-bind="authCardProps">
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
  </AuthCard>
</template>
