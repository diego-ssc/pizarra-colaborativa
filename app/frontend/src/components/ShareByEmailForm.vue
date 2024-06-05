<script setup lang="ts">
import { type Action } from '@/lib/api/api';
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const emails = defineModel<string[]>('emails', { default: [] })
const selectedAction = defineModel<Action>('action')
</script>

<template>
  <div v-if="emails.length === 0">
    Introduzca un correo y presione enter
  </div>
  <div class="flex">
    <TagsInput v-model="emails" class="my-4 w-full">
      <TagsInputItem v-for="item in emails" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
      <TagsInputInput placeholder="ejemplo@correo.com" />
    </TagsInput>

    <Select v-if="emails.length !== 0" v-model="selectedAction">
      <SelectTrigger class="w-fit my-4 ml-2">
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
  </div>
</template>
