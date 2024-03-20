<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { AxiosError } from 'axios'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import AuthCard from '@/components/AuthCard.vue'
import { useAPIClient } from '@/lib/api/client'
import { LoginEndpoint, type LoginRequest, type LoginRespone } from '@/lib/api/api'
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

const client = useAPIClient()
const userStore = useUserStore()
const router = useRouter()

const isLoading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    isLoading.value = true
    const response = await client.post<LoginRequest, LoginRespone>(LoginEndpoint, {
      email: values.email,
      password: values.password
    })
    userStore.login(response.data.token)
    router.push({ name: 'home' })
  } catch (error) {
    let errorMessage = ''
    if (error instanceof AxiosError && error.response && error.response.status === 401) {
      errorMessage = 'Usuario o contraseña incorrectos'
    } else {
      errorMessage = 'Ha ocurrido un error'
    }
    form.resetForm()
    toast({
      description: errorMessage,
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
