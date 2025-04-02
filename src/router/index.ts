import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import FlightView from '@/views/FlightView.vue'
import TableView from '@/views/TableView.vue'
import AirlineView from '@/views/AirlineView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/flight/:id',
      name: 'flight',
      component: FlightView,
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
    },
    {
      path: '/airline',
      name: 'airline',
      component: AirlineView,
    },
  ],
})

export default router
