<script setup>
import DrawerBasketHead from './DrawerBasketHead.vue'
import CartListBasket from './CartListBasket.vue'
import InfoBlock from './infoBlock.vue'

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  isCreatingOrder: Boolean,
  orderId: Number
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col">
    <DrawerBasketHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ №${orderId} скоро будет передан курьерской даоставке.`"
        image-url="/order-success-icon.png"
      />

      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
    </div>

    <CartListBasket />

    <div v-if="totalPrice" class="flex flex-col gap-4 mt-7">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} Руб.</b>
      </div>

      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ vatPrice }} Руб.</b>
      </div>
      <button
        @click="() => emit('createOrder')"
        :disabled="totalPrice ? false : true"
        :class="totalPrice ? 'cursor-pointer' : 'cursor-default'"
        class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 transition active:bg-lime-700"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
