<script setup lang="ts">
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import AuthCard from '@/components/AuthCard.vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const authCardProps = {
  title: 'Inicia sesión',
  linkTitle: 'Regístrate',
  linkName: 'register'
}
</script>

<template>
  <AuthCard v-bind="authCardProps">
    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">Correo electrónico</Label>
        <Input id="email" type="email" placeholder="usuario@ejemplo.com" />
      </div>
      <div class="grid gap-2">
        <Label for="password">Contraseña</Label>
        <Input id="password" type="password" />
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full"> Iniciar sesión </Button>
    </CardFooter>
  </AuthCard>
</template>
