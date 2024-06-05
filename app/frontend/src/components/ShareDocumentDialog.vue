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
import ShareByLinkOptions from './ShareByLinkOptions.vue';
import DialogFooter from './ui/dialog/DialogFooter.vue';
import DialogClose from './ui/dialog/DialogClose.vue';
import LinkIcon from './icons/LinkIcon.vue';

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

async function copyLink() {
  await navigator.clipboard.writeText(window.location.href);
}
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
        <DialogTitle class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Compartir pizarra</DialogTitle>
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
      <ShareByLinkOptions/>
      <DialogFooter>
        <div class="flex justify-between w-full">
          <Button variant="link" class="p-0 text-blue-500" @click="copyLink">
            <LinkIcon class="fill-blue-500 mr-1"/> Copiar enlace
          </Button>
          <DialogClose as-child>
            <Button variant="default">Listo</Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
