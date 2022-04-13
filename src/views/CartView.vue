<template>
  <button @click="$router.push('/')" class="back">
    <p>back</p>
  </button>
  <div class="cartPage">
    <!-- <p>{{productSubtotals}}</p> -->
    <ul>
      <li v-for="(qty, name) in cartList" :key="name">
        {{qty}}x
        {{name}}
        Rp. {{ price(name).price }}
        <button @click="remove(name)">
          <p>remove</p>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useCartStore } from "@/store"
import gsap from 'gsap'

export default {
  methods: {
    delete_cookie(name) {
      document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; SameSite=None;', window.location.host.toString()].join('');
      // document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', 'SameSite=None', window.location.host.toString()].join('');
    },
    price(name) {
      return this.cartStore.items.find((item) => item.name === name)
    },
    remove(name) {
      this.cartStore.items = this.cartStore.items.filter((item) => {
        return item !== this.price(name)
      })
    }
  },
  mounted() {
    console.log(this.cartList)
    gsap.to('body', {
      'background color': 'white',
      duration: 0,
    })
  },
  computed: {
    cartList() {
      const list = {}
      this.cartStore.items.forEach((item) => {
        list[item.name] = (list[item.name] || 0) + 1
      })
      return list
    },
    ...mapStores(useCartStore)
  }
}
</script>

<style lang="scss" scoped>
.cartPage {
  position: relative;
  top: 3em;
  text-align: left;
}

.back {
  position: absolute;
  top: 15px;
  left: 15px;
}

button {
  font-family: MADE Coachella;
  background-color: var(--primary);
  padding: 1em 2em;
  border: none;
  border-radius: 10px/10px;
  cursor: pointer;
  color: white;
  margin-right: auto;
  display: block;

  p {
    margin: 0;
  }
}
</style>
