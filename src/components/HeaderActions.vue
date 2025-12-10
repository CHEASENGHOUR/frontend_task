<template>
  <div class="flex items-center justify-between mb-4 bg-white p-3 shadow rounded">
    <h2 class="text-xl font-semibold text-gray-700">{{ title }}</h2>
    <button
      @click="emitAdd"
      class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      + Add
    </button>
  </div>
</template>

<script setup>

const props = defineProps({
  title: { type: String, required: true }
});

const emit = defineEmits(["search", "add"]);

const emitAdd = () => {
  emit("add");
};
</script>
