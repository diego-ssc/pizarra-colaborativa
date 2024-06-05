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
import { onBeforeMount, onMounted, ref } from 'vue';
import { useToast } from './ui/toast';
import { useRoute } from 'vue-router';
import { useGet, usePost } from '@/lib/api/client';
import { PermissionByIDEndpoint, type HasAccessResponse, type Action, type AddPermissionRequest } from '@/lib/api/api';
import { Loader2 } from 'lucide-vue-next'
import ShareByLinkOptions from './ShareByLinkOptions.vue';
import DialogFooter from './ui/dialog/DialogFooter.vue';
import DialogClose from './ui/dialog/DialogClose.vue';
import LinkIcon from './icons/LinkIcon.vue';
import ShareAccessList from './ShareAccessList.vue';

const open = ref(false)

const { toast } = useToast()

const route = useRoute(); 
const docID = route.params.id as string;
const { get, data, error, isLoading } = useGet<HasAccessResponse>(PermissionByIDEndpoint({ id: docID }))
onMounted(() => {
  get()
})

const emails = ref<string[]>([])
const selectedAction = ref<Action>('Read')
const postClient = usePost<AddPermissionRequest, unknown>(PermissionByIDEndpoint({id: docID}))
async function shareDoc() {
  await postClient.post({
    action: selectedAction.value,
    emails: emails.value
  })
  if (!postClient.error.value && postClient.data.value === '') {
    open.value = false
    toast({
      description: 'Pizarra Compartida',
    })
  }
}

async function copyLink() {
  await navigator.clipboard.writeText(window.location.href);
}

function resetState(opened: boolean) {
  if (opened) {
    emails.value = []
    selectedAction.value = 'Read'
  }
}
</script>

<template>
  <Dialog v-model:open="open" @update:open="resetState">
    <DialogTrigger as-child>
      <Button variant="default" @click="get">
        Compartir
      </Button>
    </DialogTrigger>
    <DialogContent class="w-2/3 z-[1010]">
      <DialogHeader>
        <DialogTitle class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Compartir pizarra</DialogTitle>
      </DialogHeader>
      <div v-if="error" class="text-red-500">
        Ha ocurrido un error
      </div>
      <div v-else-if="isLoading">
        Cargando...
      </div>
      <div v-else-if="data === 'Admin'">
        <div v-if="postClient.error.value" class="text-red-500">
          Los correos introducidos no corresponden a usuarios registrados
        </div>
        <ShareByEmailForm v-model:emails="emails" v-model:action="selectedAction"/>
        <ShareAccessList/>
        <ShareByLinkOptions/>
      </div>
      <div v-else>
        Solo los administradores pueden cambiar el acceso
      </div>
      <DialogFooter>
        <div class="flex justify-between w-full">
          <Button variant="link" class="p-0 text-blue-500" @click="copyLink">
            <LinkIcon class="fill-blue-500 mr-1"/> Copiar enlace
          </Button>
          <Button v-if="emails.length > 0" @click="shareDoc">Compartir</Button>
          <div v-else-if="postClient.isLoading.value">
            <Button disabled>
              <Loader2 class="w-4 h-4 mr-2 animate-spin" />
              Compartiendo
            </Button>
          </div>
          <DialogClose v-else as-child>
            <Button variant="default">Listo</Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
