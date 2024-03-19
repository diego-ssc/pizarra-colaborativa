<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
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

const formSchema = toTypedSchema(
  z
    .object({
      username: z.string(),
      email: z.string().email('El correo no es válido'),
      password: z.string().min(8, { message: 'La contraseña debe tener 8 caracteres mínimo' }),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'] // path of error
    })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>
<template>
  <AuthCard v-bind="authCardProps">
    <form @submit="onSubmit">
      <CardContent class="grid gap-4">
        <FormField class="grid gap-2" v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Nombre de usuario</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField class="grid gap-2" v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Correo electrónico</FormLabel>
            <FormControl>
              <Input type="email" placeholder="usuario@ejemplo.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField class="grid gap-2" v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Contraseña</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField class="grid gap-2" v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel>Confirmar contraseña</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button type="submit" class="w-full"> Regístrarse </Button>
      </CardFooter>
    </form>
  </AuthCard>
</template>
