<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ShareAccessListItem from './ShareAccessListItem.vue';
import { ListPermissionEndpoint, type UsersWithAccessResponse } from '@/lib/api/api';
import { useRoute } from 'vue-router';
import { useGet } from '@/lib/api/client';
import ScrollArea from './ui/scroll-area/ScrollArea.vue';

const route = useRoute(); 
const docID = route.params.id as string;

const { get, data, isLoading, error } = useGet<UsersWithAccessResponse>(ListPermissionEndpoint({id: docID}))

const userList = ref<UsersWithAccessResponse>([])

onBeforeMount(async () => {
  await get()
  if (data.value) {
    userList.value = data.value
  }
})

async function updateList(removedID: number) {
  userList.value = userList.value.filter((user) => user.userID !== removedID)
}
</script>

<template>
  <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
    Personas con acceso
  </h4>
  <div v-if="error" class="text-red-500">
    No se pudieron obtener los usuarios con acceso
  </div>
  <div v-else-if="isLoading">
    Cargando...
  </div>
  <ScrollArea v-else-if="userList" class="w-full max-h-48">
    <TransitionGroup name="list" tag="ul">
      <ShareAccessListItem v-for="user in userList" v-bind="user" @removedAccess="updateList" :key="user.userID"/>
    </TransitionGroup>
  </ScrollArea>
</template>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
