import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CartView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  console.log(to)
  setTimeout(() => {
    if (to.name === 'cart') {
      document.querySelector('body').style.setProperty('--secondary', 'white')
      document.querySelector('body').style.setProperty('--tertiary', '#DCD4D1')
    } else {
      document.querySelector('body').style.setProperty('--secondary', '#DCD4D1')
      document.querySelector('body').style.setProperty('--tertiary', 'white')
    }
  }, 1500)
})

export default router
