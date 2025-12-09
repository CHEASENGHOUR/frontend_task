<template>
  <div>
    <HeaderActions 
      title="Products"
      @add="goToAddProduct"
    />
    <h1 class="text-lg font-semibold my-4">Products List</h1>
    <table class="min-w-full border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Image</th>
          <th class="p-2 border">Code</th>
          <th class="p-2 border">Name</th>
          <th class="p-2 border">Category</th>
          <th class="p-2 border">Price</th>
          <th class="p-2 border">Discount</th>
          <th class="p-2 border">Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
          <td class="p-2 border">
            <img 
              v-if="product.image" 
              :src="product.image" 
              alt="Product Image" 
              class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
            />
            <span v-else class="text-gray-400">No Image</span>
          </td>
          <td class="p-2 border">{{ product.code }}</td>
          <td class="p-2 border">{{ product.name }}</td>
          <td class="p-2 border">{{ product.category_name }}</td>
          <td class="p-2 border">${{ product.price }}</td>
          <td class="p-2 border">
            {{ product.discount_type ? product.discount_value + (product.discount_type === 'percent' ? '%' : '$') : '-' }}
          </td>
          <td class="p-2 border">${{ product.total_price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import HeaderActions from '../components/HeaderActions.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const products = ref([])
const router = useRouter()

const goToAddProduct = () => {
  router.push({ name: 'ProductsAdd' })
}
const fetchProducts = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/products')
    const data = await res.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}
onMounted(() => {
  fetchProducts()
})
</script>
