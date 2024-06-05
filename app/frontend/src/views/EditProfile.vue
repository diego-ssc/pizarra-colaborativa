<script setup lang="ts">
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/user';
import AuthCard from '@/components/AuthCard.vue';
import { storeToRefs } from 'pinia';
import { CardContent, CardHeader} from '../components/ui/card';
import { Input } from '@/components/ui/input';

import { type GetUsersResponse, UserEndpoint, UserByIDEndpoint, } from '@/lib/api/api';

import { ref } from 'vue';
import { useAPIClient, useGet, usePatch } from '@/lib/api/client';

const router = useRouter()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const client = useAPIClient()

const showModalUser = ref(false)
const showModalEmail = ref(false)
const showModalPassword = ref(false)

const newUsername = ref('')
const newEmail = ref('')
const newPassword = ref('')

const username = user.value.username
const email = user.value.email

const { get, data } = useGet<GetUsersResponse>(UserEndpoint)

function openModal(): void {
  showModalUser.value = true;
}

function modalEmail(): void{
  showModalEmail.value = true;
  newEmail.value = data.value!.find(user=> user.userId === user.value.id)?.email || ''
}

function modalPassword(): void{
  showModalPassword.value = true;
  newPassword.value = data.value!.find(user=> user.userId === user.value.id)?.password || ''
}

function closeModal(): void {
  showModalUser.value = false;
}

function closeModalEmail(): void {
  showModalEmail.value = false;
}

function closeModalPassword(): void {
  showModalPassword.value = false;
}

async function saveNewName() {
  try {
    await client.patch(UserByIDEndpoint({ id: user.value.id }), { username: newUsername.value })
    get()
    closeModal()
  } catch (error) {
    console.error('Error al guardar el nuevo nombre:', error)
  }
}

async function saveNewMail() {
  try {
    await client.patch(UserByIDEndpoint({ id: user.value.id}), { email: newEmail.value })
    get()
    closeModalEmail()
  } catch (error) {
    console.error('Error al guardar el nuevo correo electrónico:', error)
  }
}

async function saveNewPassword() {
  try {
    await client.patch(UserByIDEndpoint({ id: user.value.id }), { password: newPassword.value })
    get()
    closeModalPassword()
  } catch (error) {
    console.error('Error al guardar el nuevo correo electrónico:', error)
  }
}

function logout() {
  userStore.logout()
  router.push({ path: '/' })
}
</script>

<template>
    <TopBar>
        <div class="flex grow justify-end">
            <RouterLink to="/home" class="mr-3">
                <Button> Página principal </Button>
            </RouterLink>
            <Button class="justify-self-end mr-5" @click="logout"> Cerrar sesión </Button>
        </div>
    </TopBar>

    <!-- Linea negra -->
    <div class="flex flex-col h-screen" :style="{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }">

        <div style="background-color:black; text-align:center; padding: 5px;"></div>

        <AuthCard v-bind="user">
            <CardContent class="grid gap-2">
                <p class="float-left text-3xl">Editar datos de usuario</p>

                <span >Nombre de usuario: {{ username }}</span>
                <button class="border border-black p-0.5 rounded hover:bg-gray-400 mr-1" @click="openModal()">
                  Editar nombre de usuario
                </button>

                <span>Correo: {{ email }}</span>
                <button class="border border-black p-0.5 rounded hover:bg-gray-400 mr-1" @click="modalEmail()">
                  Editar correo de usuario
                </button>

                <p>Contraseña:</p>
                <button class="border border-black p-0.5 rounded hover:bg-gray-400 mr-1" @click="modalPassword()">
                  Editar contraseña de usuario
                </button>
            
            </CardContent>
        </AuthCard>

        <transition>
            <div class="modal" v-if="showModalUser">
              <h1>Nuevo nombre de usuario: </h1>
                <input class="border border-black rounded m-2" type="text" v-model="newUsername">
                <button class="border border-black p-1 rounded hover:bg-gray-400"@click="saveNewName()"> Guardar</button>
                <button class=" text-xl font-bold absolute top-1 right-2" @click="closeModal">&times;</button>
            </div>
                
        </transition>

        <transition>
            <div class="modal" v-if="showModalEmail">
              <h1>Nuevo correo electrónico: </h1>
                <input class="border border-black rounded m-2" type="text" v-model="newEmail">
                <button class="border border-black p-1 rounded hover:bg-gray-400"@click="saveNewMail()"> Guardar</button>
                <button class=" text-xl font-bold absolute top-1 right-2" @click="closeModalEmail">&times;</button>
            </div>
        </transition>

        <transition>
            <div class="modal" v-if="showModalPassword">
              <h1>Nueva contraseña: </h1>
                <input class="border border-black rounded m-2" type="text" v-model="newPassword">
                <button class="border border-black p-1 rounded hover:bg-gray-400"@click="saveNewPassword()"> Guardar</button>
                <button class=" text-xl font-bold absolute top-1 right-2" @click="closeModalPassword">&times;</button>
            </div>
        </transition>


    </div>




    <div>
        <footer style="background-color:black; position: absolute; bottom: 0px; width: 100%;">
            <p style=" color:white;font-size: xx-small;">Proyecto desarrollado por el equipo 1</p>
        </footer>
    </div>



</template>

