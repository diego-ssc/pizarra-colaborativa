<script setup lang="ts">
import { type HasAccessResponse, PermissionByIDEndpoint, type Action, type AddPermissionRequest } from '@/lib/api/api';
import { useAPIClient, useGet, usePost } from '@/lib/api/client';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Button from './ui/button/Button.vue';
import { useToast } from './ui/toast';
import DialogClose from './ui/dialog/DialogClose.vue';

const route = useRoute(); 
const docID = route.params.id as string;
const { get, data, error, isLoading } = useGet<HasAccessResponse>(PermissionByIDEndpoint({ id: docID }))
onMounted(() => {
  get()
})

const emails = ref<string[]>([])
const selectedAction = ref<Action>('Read')
const postClient = usePost<AddPermissionRequest, unknown>(PermissionByIDEndpoint({id: docID}))
function shareDoc() {
  postClient.post({
    action: selectedAction.value,
    emails: emails.value
  })
}
</script>

<template>
  <div v-if="error">
    Ha ocurrido un error
  </div>
  <div v-else-if="isLoading">
    Cargando...
  </div>
  <div v-else-if="data === 'Admin'">
    <div v-if="postClient.error.value" class="text-red-500">
      Los correos introducidos no corresponden a usuarios registrados
    </div>
    <div v-if="emails.length === 0">
      Introduzca un correo y presione enter
    </div>
     <TagsInput v-model="emails" class="my-4">
        <TagsInputItem v-for="item in emails" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>

        <TagsInputInput placeholder="ejemplo@correo.com" />
      </TagsInput>
    <div class="flex justify-between my-4">
      <Select v-model="selectedAction">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Lector" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup class="z-[1001]">
            <SelectItem value="Read">Lector</SelectItem>
            <SelectItem value="Write">Editor</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div v-if="emails.length === 0">
        <Button disabled @click="shareDoc">Compartir</Button>
      </div>
      <div v-else>
        <Button @click="shareDoc">Compartir</Button>
      </div>
    </div>

  </div>
  <div v-else>
    Solo los administradores pueden cambiar el acceso
  </div>
</template>
