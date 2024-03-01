<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  title: String,
  imageUrl: String,
  price: Number
})
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 round-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }} руб.</b>
        <img
          @click="emit('onClickRemove')"
          class="opacity-50 hover:opacity-100 transition cursor-pointer"
          src="/close.svg"
          alt="close"
        />
      </div>
    </div>
  </div>
</template>
