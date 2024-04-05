import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import ClientsView from '../views/clients/ClientsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/clients',
    name: 'clients',
    component: ClientsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
