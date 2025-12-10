<template>
  <div class="bg-white p-8 rounded-lg shadow max-w-5xl mx-auto mt-6">
    <h2 class="text-2xl font-bold mb-8 text-green-700">Add Product</h2>

    <form @submit.prevent="submitProduct" class="space-y-8">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <!-- Name -->
          <div>
            <label class="block mb-1 font-medium text-gray-700">Product Name</label>
            <input v-model="product.name" type="text"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter product name" required />
          </div>

          <!-- Category Dropdown -->
          <div>
            <label class="block mb-1 font-medium text-gray-700">Category</label>
            <div class="relative">
              <button type="button" @click="showDropdown = !showDropdown"
                class="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-left focus:outline-none focus:ring-2 focus:ring-green-400">
                {{ selectedCategoryName || 'Select Category' }}
                <svg class="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div v-show="showDropdown"
                class="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow max-h-60 overflow-auto">
                <input v-model="search" type="text" placeholder="Search category..."
                  class="w-full px-4 py-2 border-b border-gray-200 focus:outline-none focus:ring-0" />
                <ul>
                  <li v-for="cat in filteredCategories" :key="cat.id">
                    <button type="button" class="w-full text-left px-4 py-2 hover:bg-green-50 hover:text-green-700"
                      @click="selectCategory(cat)">
                      {{ cat.name }}
                    </button>
                  </li>
                </ul>
                <div v-if="filteredCategories.length === 0" class="px-4 py-2 text-gray-400 text-sm">No results found
                </div>
              </div>
            </div>
          </div>

          <!-- Price -->
          <div>
            <label class="block mb-1 font-medium text-gray-700">Price</label>
            <input v-model.number="product.price" type="number"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter price" required />
          </div>

          <!-- Discount Dropdown -->
          <div>
            <label class="block mb-1 font-medium text-gray-700">Discount Type</label>
            <div class="relative">
              <button type="button" @click="showDiscountDropdown = !showDiscountDropdown"
                class="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-left focus:outline-none focus:ring-2 focus:ring-green-400">
                {{ selectedDiscountName || 'No Discount' }}
                <svg class="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div v-show="showDiscountDropdown"
                class="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow max-h-48 overflow-auto">
                <ul>
                  <li v-for="option in discountOptions" :key="option.value">
                    <button type="button" class="w-full text-left px-4 py-2 hover:bg-green-50 hover:text-green-700"
                      @click="selectDiscount(option)">
                      {{ option.label }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <input v-model.number="product.discount_value" type="number" placeholder="Discount Value"
              class="mt-2 w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>

          <!-- Description -->
          <div>
            <label class="block mb-1 font-medium text-gray-700">Description</label>
            <textarea v-model="product.description"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              rows="4" placeholder="Enter description"></textarea>
          </div>
        </div>

        <!--Image Upload -->
        <div class="flex flex-col items-center justify-start space-y-4">
          <label class="block mb-1 font-medium text-gray-700">Product Image</label>

          <button type="button" @click="triggerFileInput"
            class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Upload Image
          </button>
          <input ref="fileInput" type="file" class="hidden" @change="handleImage" accept="image/*" />

          <div v-if="previewImage"
            class="w-full h-64 border rounded-lg overflow-hidden flex items-center justify-center">
            <img :src="previewImage" alt="Preview" class="object-cover w-full h-full" />
          </div>
          <div v-else class="w-full h-64 border rounded-lg flex items-center justify-center text-gray-400">
            Image Preview
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end space-x-4 mt-6">
        <button type="button" @click="cancel"
          class="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">Cancel</button>
        <button type="submit"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Save</button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const product = ref({
  name: '',
  category_id: '',
  price: 0,
  discount_type: '',
  discount_value: 0,
  description: '',
  image: null
})

const categories = ref([])
const previewImage = ref(null)
const search = ref('')
const showDropdown = ref(false)
const selectedCategoryName = ref('')

const showDiscountDropdown = ref(false)
const selectedDiscountName = ref('')
const discountOptions = [
  { value: '', label: 'No Discount' },
  { value: 'percent', label: 'Percent' },
  { value: 'amount', label: 'Amount' },
]

// Fetch categories
const fetchCategories = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/categories')
    const data = await res.json()
    if (data.success) categories.value = data.categories
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => fetchCategories())

// Category dropdown
const selectCategory = (cat) => {
  product.value.category_id = cat.id
  selectedCategoryName.value = cat.name
  showDropdown.value = false
  search.value = '' // reset search
}

// Discount dropdown
const selectDiscount = (option) => {
  product.value.discount_type = option.value
  selectedDiscountName.value = option.label || 'No Discount'
  showDiscountDropdown.value = false
}

// Filter categories
const filteredCategories = computed(() => {
  if (!search.value) return categories.value
  return categories.value.filter(c => c.name.toLowerCase().includes(search.value.toLowerCase()))
})

// Image upload
const fileInput = ref(null)
const triggerFileInput = () => fileInput.value.click()
const handleImage = (event) => {
  const file = event.target.files[0]
  if (file) {
    product.value.image = file
    previewImage.value = URL.createObjectURL(file)
  } else {
    product.value.image = null
    previewImage.value = null
  }
}
const submitProduct = async () => {
  try {
    const formData = new FormData()
    for (const key in product.value) {
      if (product.value[key] !== null) formData.append(key, product.value[key])
    }

    const res = await fetch('http://127.0.0.1:8000/api/products', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    if (data.success) {
      alert('Product added successfully!')
      router.push({ name: 'Products', query: { refresh: Date.now() } })
    } else {
      console.error(data.errors || data.message)
      alert('Failed to add product')
    }
  } catch (err) {
    console.error(err)
    alert('Error adding product')
  }
}


const cancel = () => router.push({ name: 'Products' })
</script>
