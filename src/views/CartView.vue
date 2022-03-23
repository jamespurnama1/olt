<template>
  <div class="cartPage">
    <ul>
      <li v-for="item in cartStore.items" :key="item.name">
        {{item.name}}
        {{item.price}}
      </li>
    </ul>
  </div>
    <!-- <button v-show="cart.length" class="cart" @click="viewCart=false">
      <div class="dot">
        <p>{{cart.length}}</p>
      </div>
      <p>Order</p>
      <div v-show="viewCart" class="bgChange"/>
    </button> -->
</template>

<script>
import { mapStores } from 'pinia'
import { useCartStore } from "@/store";

export default {
  methods: {
    delete_cookie(name) {
      document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; SameSite=None;', window.location.host.toString()].join('');
      // document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', 'SameSite=None', window.location.host.toString()].join('');
    }
  },
  mounted() {},
  computed: {
    ...mapStores(useCartStore)
  }
}
</script>

<style lang="scss" scoped>
.cartPage {

}
</style>
