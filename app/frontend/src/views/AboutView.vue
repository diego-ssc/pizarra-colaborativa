<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <Button>TestButto</Button>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
