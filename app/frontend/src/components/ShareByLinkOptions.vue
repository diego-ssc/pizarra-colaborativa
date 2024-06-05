<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import LockIcon from './icons/LockIcon.vue';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import EarthIcon from './icons/EarthIcon.vue';
import { useGet, usePatch } from '@/lib/api/client';
import { PermissionByIDEndpoint, WhiteboardByIDEndpoint, type UpdateDefaultPermissionRequest, type GetWhiteboardByIDResponse } from '@/lib/api/api';
import { useRoute } from 'vue-router';

const selectedAccess = ref<'public' | 'restricted'>('restricted')

const route = useRoute(); 
const docID = route.params.id as string;
const { patch, isLoading } = usePatch<UpdateDefaultPermissionRequest, any>(PermissionByIDEndpoint({ id: docID }))

async function updateDefaultAccess(access: string) {
  const isPublic = access === 'public' ? true : false
  await patch({ isPublic })
}

const { get, data } = useGet<GetWhiteboardByIDResponse>(WhiteboardByIDEndpoint({ id: docID }))

onBeforeMount(async () => {
  await get()
  if (data.value?.isPublic) {
    selectedAccess.value = 'public'
  }
})
</script>

<template>
  <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
    Acceso general
  </h4>
  <div class="flex">
    <div v-if="selectedAccess === 'restricted'" class="rounded-full p-2 bg-gray-400">
      <LockIcon class="fill-white"/>
    </div>
    <div v-if="selectedAccess === 'public'" class="rounded-full p-2 bg-green-400">
      <EarthIcon class="fill-white"/>
    </div>
    <div class="flex-col ml-1">
      <div>
        <Select v-model="selectedAccess" @update:modelValue="updateDefaultAccess">
          <SelectTrigger class="h-5 border-none shadow-none w-fit hover:border-none p-1 text-sm">
            <SelectValue placeholder="Restringido" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup clas="z-[1001]">
              <SelectItem value="restricted">Restringido</SelectItem>
              <SelectItem value="public">Público</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <p v-if="selectedAccess === 'restricted'" class="text-xs text-muted-foreground px-1">
          Solo las personas con acceso pueden abrir la pizarra
        </p>
        <p v-if="selectedAccess === 'public'" class="text-xs text-muted-foreground px-1">
          Cualquier persona con el enlace puede editar la pizarra
        </p>
      </div>
    </div>
    <div v-if="isLoading">
      Actualizando...
    </div>
  </div>
</template>
