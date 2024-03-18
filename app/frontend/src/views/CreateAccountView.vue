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
            Regístrate
          </CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid grid-cols-2 gap-6">
          </div>

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
          <Button class="w-full">
            Regístrarse
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
