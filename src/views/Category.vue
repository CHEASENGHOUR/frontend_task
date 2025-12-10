<template>
    <div>
        <HeaderActions title="Category" @add="handleAdd" />
        <h1 class="text-xl font-bold my-4">Category List</h1>
        <div class="grid grid-cols-3 gap-4">
            <template v-for="cat in categories" :key="cat.id">
                <div v-for="product in cat.products" :key="product.id" class="bg-white p-4 rounded shadow">
                    <img v-if="product.image" :src="product.image" alt="Product Image"
                        class="w-full h-32 sm:h-40 md:h-48 object-cover rounded mb-2" />
                    <div v-else class="w-full h-32 bg-gray-200 flex items-center justify-center rounded mb-2">
                        <span class="text-gray-500">No Image</span>
                    </div>
                    <h2 class="text-lg font-semibold">{{ product.name }}</h2>
                    <p class="text-sm text-gray-500">Category: {{ cat.name }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import HeaderActions from "../components/HeaderActions.vue";
import { ref, onMounted } from "vue";

const categories = ref([]);

const handleAdd = () => {
    console.log("Add category clicked");
};

const fetchCategories = async () => {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/categories");
        const data = await res.json();
        if (data.success) {
            categories.value = data.categories;
        } else {
            console.error("Failed to fetch categories");
        }
    } catch (err) {
        console.error("Error fetching categories:", err);
    }
};

onMounted(() => {
    fetchCategories();
});
</script>
