import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Our Little Treats' }
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue'),
    meta: { title: 'Our Little Treats | Cart' }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/cart' && to.path !== '/') return { name: 'home' }
  setTimeout(() => {
    if (to.name === 'cart') {
      document.querySelector('body').style.setProperty('--secondary', 'white')
      document.querySelector('body').style.setProperty('--tertiary', '#DCD4D1')
    } else if (to.name === 'home') {
      document.querySelector('body').style.setProperty('--secondary', '#DCD4D1')
      document.querySelector('body').style.setProperty('--tertiary', 'white')
    }
  }, 1000)
})

export default router
