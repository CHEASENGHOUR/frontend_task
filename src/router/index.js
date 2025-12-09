import { createRouter, createWebHistory } from "vue-router";
import Category from "../views/Category.vue";
import BookPrice from "../views/BookPrice.vue";
import Product from "../views/Products.vue";
import FormProducts from "../components/FormProducts.vue";

const routes = [
  {
    path: "/",
    name: "Category",
    component: Category,
  },
  {
    path: "/book-price",
    name: "BookPrice",
    component: BookPrice,
  },
  {
    path: "/products",
    name: "Products",
    component: Product,
  },
  {
    path: "/products/add",
    name: "ProductsAdd",
    component: FormProducts,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
