<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import HomeView from './views/HomeView.vue';
</script>

<template>
  <RouterView class="h-full" />
  <Toaster />
</template>

<style>
html,
body,
#app {
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
