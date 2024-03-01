<script setup>
import { computed, provide, ref, watch } from 'vue'
import axios from 'axios'
import HeaderShop from './components/HeaderShop.vue'
import DrawerBasket from './components/DrawerBasket.vue'

/* Корзина */
const cartBaskets = ref([])

const drawerBasketOpen = ref(false)
const isCreatingOrder = ref(false)
const orderId = ref(null)

const totalPrice = computed(() => cartBaskets.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerBasketOpen.value = false
}

const openDrawer = () => {
  drawerBasketOpen.value = true
}

const addToCardBaskets = (item) => {
  cartBaskets.value.push(item)
  item.isAdded = true
}

const removeFromeCart = (item) => {
  cartBaskets.value.splice(cartBaskets.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://4448375c9bd7f417.mokky.dev/orders`, {
      items: cartBaskets.value,
      totalPrice: totalPrice.value
    })

    cartBaskets.value = []

    orderId.value = data.id
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

watch(
  cartBaskets,
  () => {
    localStorage.setItem('cartBaskets', JSON.stringify(cartBaskets.value))
  },
  { deep: true }
)

provide('cart', { closeDrawer, openDrawer, cartBaskets, addToCardBaskets, removeFromeCart })

/* Корзина */
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <DrawerBasket
      v-if="drawerBasketOpen"
      :total-price="totalPrice"
      :vat-price="vatPrice"
      @create-order="createOrder"
      :is-creating-order="isCreatingOrder"
      :order-id="orderId"
    />
    <HeaderShop :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
