<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import { ref } from 'vue'

import { Button } from '../components/ui/button'
import { CardContent, CardFooter } from '../components/ui/card'
import AuthCard from '@/components/AuthCard.vue'
import AuthFormField from '@/components/AuthFormField.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useAPIClient } from '@/lib/api/client'
import { useUserStore } from '@/stores/user'
import {
  CreateAccountEndpoint,
  type CreateAccountRequest,
  type CreateAccountResponse
} from '@/lib/api/api'

const authCardProps = {
  title: 'Regístrate',
  linkTitle: 'Inicia sesión',
  linkName: 'login'
}

const formSchema = toTypedSchema(
  z
    .object({
      username: z.string().min(1, { message: 'Campo requerido' }),
      email: z.string().email('El correo no es válido'),
      password: z.string().min(8, { message: 'La contraseña debe tener 8 caracteres mínimo' }),
      confirmPassword: z.string().min(1, { message: 'Campo requerido' })
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword']
    })
)

const form = useForm({
  validationSchema: formSchema
})

const { toast } = useToast()

const client = useAPIClient()
const userStore = useUserStore()
const router = useRouter()

const isLoading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    isLoading.value = true
    const response = await client.post<CreateAccountRequest, CreateAccountResponse>(
      CreateAccountEndpoint,
      {
        username: values.username,
        email: values.email,
        password: values.password
      }
    )
    userStore.login(response.data.token)
    router.push({ name: 'home' })
  } catch (error) {
    form.resetForm()
    toast({
      description: 'Ha ocurrido un error',
      variant: 'destructive'
    })
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <AuthCard v-bind="authCardProps">
    <form @submit="onSubmit">
      <CardContent class="grid gap-4">
        <AuthFormField name="username" label="Nombre de usuario" type="text" />
        <AuthFormField name="email" label="Correo electrónico" type="email" />
        <AuthFormField name="password" label="Contraseña" type="password" />
        <AuthFormField name="confirmPassword" label="Confirmar contraseña" type="password" />
      </CardContent>
      <CardFooter>
        <Button type="submit" class="w-full"> Regístrarse </Button>
      </CardFooter>
    </form>
  </AuthCard>
</template>
