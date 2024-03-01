<script setup>
import CardItem from './CardItem.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits('addToFavorite', 'addToCardBaskets')
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <CardItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-favorite="item.isFavorite"
      :on-click-add="isFavorites ? null : () => emit('addToCardBaskets', item)"
      :on-click-favorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :is-added="item.isAdded"
    />
  </div>
</template>
