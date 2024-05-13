<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { AxiosError } from 'axios'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import AuthCard from '@/components/AuthCard.vue'
import { useAPIClient, usePost } from '@/lib/api/client'
import { LoginEndpoint, type GetUserByIDResponse, type LoginRequest, type LoginResponse, UserByIDEndpoint } from '@/lib/api/api'
import { useUserStore } from '@/stores/user'
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import AuthFormField from '@/components/AuthFormField.vue'

const authCardProps = {
  title: 'Inicia sesión',
  linkTitle: 'Regístrate',
  linkName: 'register'
}

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, { message: 'Campo requerido' }),
    password: z.string().min(1, { message: 'Campo requerido' })
  })
)

const form = useForm({
  validationSchema: formSchema
})

const { toast } = useToast()

const userStore = useUserStore()
const router = useRouter()

const { post, data, error, isLoading } = usePost<LoginRequest, LoginResponse>(LoginEndpoint)

const onSubmit = form.handleSubmit(async (values) => {
  await post({
    email: values.email,
    password: values.password
  })
})

const client = useAPIClient()

watch(data, async (value) => {
  if (value) {
    await userStore.login(value.id, value.token, async (user) => {
      try {
        const res = await client.get<GetUserByIDResponse>(UserByIDEndpoint({ id: value.id }))
        user.value.username = res.data.username
        user.value.email = res.data.email
      } catch (e) {
        console.log(e)
      }
    })
    router.push({ name: 'home' })
  }
})

watch(error, (err) => {
  if (err) {
    let errorMessage = ''
    if (err instanceof AxiosError && err.response && err.response.status === 401) {
      errorMessage = 'Usuario o contraseña incorrectos'
    } else {
      errorMessage = 'Ha ocurrido un error'
    }
    form.resetForm()
    toast({
      description: errorMessage,
      variant: 'destructive'
    })
  }
})
</script>

<template>
  <AuthCard v-bind="authCardProps">
    <form @submit="onSubmit">
      <CardContent class="grid gap-4">
        <AuthFormField name="email" label="Correo electrónico" type="email" />
        <AuthFormField name="password" label="Contraseña" type="password" />
      </CardContent>
      <CardFooter>
        <div v-if="isLoading" class="w-full">
          <Button disabled class="w-full">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            Iniciando sesión
          </Button>
        </div>
        <div v-else class="w-full">
          <Button type="submit" class="w-full"> Iniciar sesión </Button>
        </div>
      </CardFooter>
    </form>
  </AuthCard>
</template>
