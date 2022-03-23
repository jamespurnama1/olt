import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  // optional actions
  actions: {
    reset() {
      this.items = []
    },
  },
})
