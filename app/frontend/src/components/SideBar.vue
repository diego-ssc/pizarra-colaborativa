<script setup lang="ts">
import { ref } from 'vue';
import BarsIcon from './icons/BarsIcon.vue';

const isSidebarOpen = ref(false)
</script>

<template>
<div class="bg-black w-50 overflow-hidden transition-all duration-300 px-1" :class="{ 'w-64': isSidebarOpen }">
  <div class="ml-1 p-3">
    <button class="text-white hover:text-white focus:outline-none" @click="isSidebarOpen = !isSidebarOpen">
      <BarsIcon class="fill-current"/>
    </button>
  </div>

  <div class="py-0" v-if="isSidebarOpen">
      <slot></slot>
  </div>
</div>
</template>
