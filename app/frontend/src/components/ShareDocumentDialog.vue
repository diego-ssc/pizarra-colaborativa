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
import { ref } from 'vue';
import { useToast } from './ui/toast';

const open = ref(false)

const { toast } = useToast()

function onShared() {
  open.value = false
  toast({
    description: 'Pizarra Compartida',
  })
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline">
        Compartir
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md z-[1010]">
      <DialogHeader>
        <DialogTitle>Compartir pizarra</DialogTitle>
      </DialogHeader>
      <ShareByEmailForm @shared="onShared"/>
    </DialogContent>
  </Dialog>
</template>
