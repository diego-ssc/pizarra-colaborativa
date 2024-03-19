<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import AuthCard from '@/components/AuthCard.vue'
import { Input } from '@/components/ui/input'
import { useAPIClient } from '@/lib/api/client'
import { LoginEndpoint, type LoginRequest, type LoginRespone } from '@/lib/api/api'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { AxiosError } from 'axios'

const authCardProps = {
  title: 'Inicia sesión',
  linkTitle: 'Regístrate',
  linkName: 'register'
}

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('El correo no es válido'),
    password: z.string().min(8, { message: 'La contraseña debe tener 8 caracteres mínimo' })
  })
)

const form = useForm({
  validationSchema: formSchema
})

const client = useAPIClient()
const userStore = useUserStore()
const router = useRouter()

const errorMessage = ref('')

const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)
  try {
    errorMessage.value = ''
    const response = await client.post<LoginRequest, LoginRespone>(LoginEndpoint, {
      email: values.email,
      password: values.password
    })
    userStore.login(response.data.token)
    router.push({ name: 'home' })
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.status === 401) {
      errorMessage.value = 'Usuario o contraseña incorrectos'
    } else {
      //TODO: add toast with unknown error
    }
  } finally {
  }
})
</script>

<template>
  <AuthCard v-bind="authCardProps">
    <form @submit="onSubmit">
      <CardContent class="grid gap-4">
        <p v-if="errorMessage" class="text-[0.8rem] font-medium text-destructive grid gap-2">
          {{ errorMessage }}
        </p>
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
      </CardContent>
      <CardFooter>
        <Button type="submit" class="w-full"> Iniciar sesión </Button>
      </CardFooter>
    </form>
  </AuthCard>
</template>
