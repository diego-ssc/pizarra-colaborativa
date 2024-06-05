<script setup lang="ts">
import { PermissionByIDEndpoint, type Action, type AddPermissionRequest } from '@/lib/api/api';
import Avatar from './ui/avatar/Avatar.vue';
import AvatarFallback from './ui/avatar/AvatarFallback.vue';
import { ref } from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import SelectSeparator from './ui/select/SelectSeparator.vue';
import { usePost } from '@/lib/api/client';
import { useRoute } from 'vue-router';

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const props = defineProps<{
  userID: number
  username: string
  email: string
  role: Action
}>()

const emit = defineEmits<{
  (e: 'removedAccess', id: number): void
}>()

const selectedRole = ref<Action>(props.role)

const route = useRoute(); 
const docID = route.params.id as string;
const postClient = usePost<AddPermissionRequest, unknown>(PermissionByIDEndpoint({id: docID}))

function updateAccess(value: string) {
  postClient.post({
    action: value as Action,
    emails: [props.email]
  })
  if (value === 'Denied') {
    emit('removedAccess', props.userID)
  }
}
</script>

<template>
  <li :key="userID" class="flex justify-between py-2">
    <div class="flex">
      <Avatar>
        <AvatarFallback>{{ username[0] }}</AvatarFallback>
      </Avatar>
      <div class="flex-col ml-2">
        <p class="text-m font-semibold">{{ username }}</p>
        <p class="text-xs font-medium leading-none">{{ email }}</p>
      </div>
    </div>
    <div v-if="user.id === userID.toString()" class="self-center text-sm mr-3 pr-4">
      {{ role }}
    </div>
    <Select v-else v-model="selectedRole" class="self-end" @update:modelValue="updateAccess">
      <SelectTrigger class="w-fit self-end">
        <SelectValue :placeholder="role"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup class="z-[1001]">
          <SelectItem value="Read">Lector</SelectItem>
          <SelectItem value="Write">Editor</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectSeparator/>
          <SelectItem value="Denied">Revocar acceso</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

  </li>
</template>
