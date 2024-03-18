<script setup lang="ts">
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
</script>
<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <Card>
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl">
            Iniciar sesión
          </CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">Nombre de usuario o correo electrónico</Label>
            <Input id="username" type="text" placeholder="" />
          </div>
          <div class="grid gap-2">
            <Label for="password">Contraseña</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full">
            Iniciar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
