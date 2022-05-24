import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/korisnici',
    name: 'korisnici',
    component: () => import(/* webpackChunkName: "about" */ '../views/KorisniciView.vue')
  },
  {
    path: '/kategorije',
    name: 'kategorije',
    component: () => import(/* webpackChunkName: "about" */ '../views/KategorijeView.vue')
  },
  {
    path: '/brandovi',
    name: 'brandovi',
    component: () => import(/* webpackChunkName: "about" */ '../views/BrandoviView.vue')
  },
  {
    path: '/proizvodi',
    name: 'proizvodi',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProizvodiView.vue')
  },
  {
    path: '/izvjestaj',
    name: 'izvjestaj',
    component: () => import(/* webpackChunkName: "about" */ '../views/IzvjestajView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
