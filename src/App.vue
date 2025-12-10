<template>
  <div class="flex h-screen bg-gray-100">
    <SideBar />
    <div class="flex-1 p-4 overflow-auto py-16">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import SideBar from './views/SideBar.vue'
</script>
