<script setup lang="ts">
import { PermissionByIDEndpoint, type Action, type AddPermissionRequest } from '@/lib/api/api';
import { usePost } from '@/lib/api/client';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Loader2 } from 'lucide-vue-next'
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

const emit = defineEmits(['shared'])

const route = useRoute(); 
const docID = route.params.id as string;

const emails = ref<string[]>([])
const selectedAction = ref<Action>('Read')
const postClient = usePost<AddPermissionRequest, unknown>(PermissionByIDEndpoint({id: docID}))
function shareDoc() {
  postClient.post({
    action: selectedAction.value,
    emails: emails.value
  })
}

watch(postClient.data, (value) => {
  // If request is in progress or there is an error value is null.
  // Only emit event when doc was shared successfully. 
  if (value === '') {
    emit('shared')
  }
})
</script>

<template>
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
    <div v-else-if="postClient.isLoading.value">
      <Button disabled>
        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
        Compartiendo
      </Button>
    </div>
    <div v-else>
      <Button @click="shareDoc">Compartir</Button>
    </div>
  </div>
</template>
