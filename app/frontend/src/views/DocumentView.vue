<script setup lang="ts">
import EditorProvider from '@/components/EditorProvider.vue'
import Sidebar from '@/components/Sidebar.vue'
import TopBar from '@/components/TopBar.vue'
import EditorContainer from '@/components/EditorContainer.vue'
</script>

<template>
  <EditorProvider>
    <div class="app">
      <Sidebar />
      <div class="main-content">
        <TopBar />
        <EditorContainer />
      </div>
    </div>
  </EditorProvider>
</template>

<style scoped>
.app {
  display: flex;
  font-family: sans-serif;
}

.sidebar {
  padding: 10px;
  width: 250px;
}

.sidebar .header {
  margin-bottom: 10px;
}

.doc-item {
  padding: 5px;
}

.doc-item.active,
.doc-item:hover {
  background-color: #f0f0f0;
}

.top-bar {
  display: flex;
  flex-direction: row-reverse;
}

.top-bar button {
  margin: auto 2px;
}

.main-content {
  flex: 1;
}
</style>
