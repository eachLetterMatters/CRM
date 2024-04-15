import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import ClientsView from '../views/clients/ClientsView.vue'
import ClientDetailsView from '../views/clients/client_details/ClientDetailsView.vue'

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
  },
  {
    path: '/clientdetails:id',
    name: 'clientdetails',
    component: ClientDetailsView,
    // props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
