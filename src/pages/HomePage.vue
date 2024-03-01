<script setup>
import { inject, reactive, watch, ref, onMounted } from 'vue'
import CardList from '../components/CardList.vue'
import axios from 'axios'
import debounce from 'lodash.debounce'

const { addToCardBaskets, removeFromeCart, cartBaskets } = inject('cart')
const items = ref([])

const filters = reactive({
  sortBy: String,
  searchQuery: String | ''
})

const onchangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCardBaskets(item)
  } else {
    removeFromeCart(item)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }

      item.isFavorite = true
      const { data } = await axios.post(`https://4448375c9bd7f417.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false

      await axios.delete(`https://4448375c9bd7f417.mokky.dev/favorites/${item.favoriteId}`)

      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 200)

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://4448375c9bd7f417.mokky.dev/items`, { params })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      idAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://4448375c9bd7f417.mokky.dev/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(
  async () => {
    const localCart = localStorage.getItem('cartBaskets')
    cartBaskets.value = localCart ? JSON.parse(localCart) : []

    await fetchItems()
    await fetchFavorites()

    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cartBaskets.value.some((cartBaskets) => cartBaskets.id === item.id)
    }))
  }
  // axios.get('https://4448375c9bd7f417.mokky.dev/items').then((resp) => console.log(resp.data))
)

watch(cartBaskets, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex justify-between items-center mb-10">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

    <div class="flex gap-4">
      <select @change="onchangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (доргие)</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-1.5 pl-10 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск"
        />
      </div>
    </div>
  </div>

  <CardList :items="items" @addToFavorite="addToFavorite" @add-to-card-baskets="onClickAddPlus" />
</template>
