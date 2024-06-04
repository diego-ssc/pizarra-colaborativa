<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ShareByEmailForm from './ShareByEmailForm.vue'
import { onMounted, ref } from 'vue';
import { useToast } from './ui/toast';
import { useRoute } from 'vue-router';
import { useGet } from '@/lib/api/client';
import { PermissionByIDEndpoint, type HasAccessResponse } from '@/lib/api/api';

const open = ref(false)

const { toast } = useToast()

function onShared() {
  open.value = false
  toast({
    description: 'Pizarra Compartida',
  })
}

const route = useRoute(); 
const docID = route.params.id as string;
const { get, data, error, isLoading } = useGet<HasAccessResponse>(PermissionByIDEndpoint({ id: docID }))
onMounted(() => {
  get()
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline" @click="get">
        Compartir
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md z-[1010]">
      <DialogHeader>
        <DialogTitle>Compartir pizarra</DialogTitle>
      </DialogHeader>
      <div v-if="error" class="text-red-500">
      </div>
      <div v-else-if="isLoading">
        Cargando...
      </div>
      <div v-else-if="data === 'Admin'">
        <ShareByEmailForm @shared="onShared"/>
      </div>
      <div v-else>
        Solo los administradores pueden cambiar el acceso
      </div>
    </DialogContent>
  </Dialog>
</template>
