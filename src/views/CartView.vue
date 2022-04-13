<template>
  <div class="cartPage">
    <div class="flex">
      <h1>Checkout</h1>
      <p @click="clear()" class="clear">Clear Cart</p>
    </div>
    <TransitionGroup v-if="cartList && Object.keys(cartList).length" name="list" tag="ul">
      <li v-for="(qty, name) in cartList" :key="name">
        <p>
          {{qty}}x
          <strong>{{name}}</strong>
          <br>
          Rp. {{ price(name).price.toLocaleString() }}
        </p>
        <button @click="remove(name)">
          <p>remove</p>
        </button>
      </li>
    </TransitionGroup>
    <p v-else>Your Cart is Empty.</p>
    <transition name="fade">
      <span class="total">
        <h3 :key="totalPrice">Total: Rp. {{totalPrice.toLocaleString()}}</h3>
        <p>*exclusive of shipping costs</p>
      </span>
    </transition>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useCartStore } from "@/store"
// import gsap from 'gsap'

export default {
  methods: {
    bake_cookie(name, value) {
      const cookie = [name, '=', JSON.stringify(value), '; expires=', this.getDate, '; path=/; SameSite=Strict;'].join('');
      // const cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/; SameSite=Strict;'].join('');
      document.cookie = cookie;
    },
    delete_cookie(name) {
      document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; SameSite=Strict;', window.location.host.toString()].join('');
      // document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', 'SameSite=None', window.location.host.toString()].join('');
    },
    price(name) {
      return this.cartStore.items.find((item) => item.name === name)
    },
    remove(name) {
      this.cartStore.items = this.cartStore.items.filter((item) => {
        return item !== this.price(name)
      })

      if (!this.cartStore.items.length) {
        this.delete_cookie('cart')
        this.$router.push('/')
      } else {
        this.bake_cookie('cart', this.cartStore.items)
      }
    },
    clear() {
      this.cartStore.items = []
      this.delete_cookie()
      this.$router.push('/')
    }
  },
  mounted() {
  },
  computed: {
    cartList() {
      const list = {}
      this.cartStore.items.forEach((item) => {
        list[item.name] = (list[item.name] || 0) + 1
      })
      return list
    },
    totalPrice() {
      let total = 0
      this.cartStore.items.forEach((x) => {
        total += this.price(x.name).price
      })
      return total
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
  flex-grow: 1;
  margin-bottom: 4em;

  .flex {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3em;
    align-items: flex-end;

    h1 {
      font-family: MADE Coachella;
      background-color: var(--primary);
      padding: 0.25em 0.5em;
      border: none;
      border-radius: 10px/10px;
      color: white;
      margin-right: auto;
      display: block;
      margin: 0;
      width: fit-content;
    }

    .clear {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      padding-bottom: 1em;
      flex-grow: 1;

      button {
        margin: 0;
        padding: 0.5em 1em;
        background-color: var(--tertiary);
        transition: background-color 0.5s ease;

        p {
          color: var(--primary);
          font-size: 0.85em;
        }
      }
    }
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

    .total {
      margin-top: auto;
      text-align: right;
      position: absolute;
      right: 0;
      bottom: 0;

      p, h3 {
        margin: 0;
      }

      p {
        font-size: 0.5em;
      }
  }

  p {
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
}
</style>
