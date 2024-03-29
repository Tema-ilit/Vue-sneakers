import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import FavoritesPage from './pages/FavoritesPage.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/favorites', name: 'Favorite', component: FavoritesPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
