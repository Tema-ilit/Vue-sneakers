<script setup>
import { inject } from 'vue'
import CartItemBasket from './CartItemBasket.vue'

const { cartBaskets, removeFromeCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4" v-auto-animate>
    <CartItemBasket
      v-for="item in cartBaskets"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromeCart(item)"
    />
  </div>
</template>
