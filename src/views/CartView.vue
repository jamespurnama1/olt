<template>
  <div class="cartPage">
    <!-- <p>{{productSubtotals}}</p> -->
    <ul>
      <li v-for="(item) in productSubtotals" :key="item.name">
          <!-- <p>{{item[JSON.parse(item[index])].name}}</p> -->
          <p>{{item}}</p>
          <p>{{Object.keys(productSubtotals)[0]}}</p>
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
    },
  },
  mounted() {
    const counts = {}
      this.cartStore.items.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1
      })
    console.log(this.productSubtotals, typeof this.productSubtotals)
  },
  computed: {
    ...mapStores(useCartStore),
    productSubtotals() {
      const counter = {}

      this.cartStore.items.forEach((obj) => {
          const key = JSON.stringify(obj)
          counter[key] = (counter[key] || 0) + 1
      })
        return counter
    }
  }
}
</script>

<style lang="scss" scoped>
.cartPage {
  position: relative;
  top: 3em;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      text-align: left;

      p {
        margin: 0;

        &:first-child {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
