<template>
  <div class="w-64 bg-white shadow-md py-8">
    <div class="p-4">
      <div
        v-for="item in menuItems"
        :key="item.id"
        @click="goTo(item)"
        :class="[
          'flex items-center p-3 rounded-md cursor-pointer transition-colors',
          route.name === item.routeName ? 'bg-green-50 text-green-600' : 'hover:bg-gray-100'
        ]"
      >
        <i :class="['fas', item.icon, 'mr-3']"></i>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Sidebar menu
const menuItems = [
  { id: "category", label: "Category", icon: "fa-folder", routeName: "Category" },
  { id: "bookPrice", label: "BookPrice", icon: "fa-list", routeName: "BookPrice" },
  { id: "product", label: "Products", icon: "fa-circle", routeName: "Products" }
];

// Go to route
const goTo = (item) => {
  router.push({ name: item.routeName });
};
</script>
