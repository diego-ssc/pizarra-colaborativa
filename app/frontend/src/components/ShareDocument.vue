<script setup lang="ts">
import { CopyIcon } from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ShareDocumentOptions from './ShareDocumentOptions.vue'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Compartir
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md z-[1010]">
      <DialogHeader>
        <DialogTitle>Compartir pizarra</DialogTitle>
      </DialogHeader>
      <ShareDocumentOptions/>
    </DialogContent>
  </Dialog>
</template>
