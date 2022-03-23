<template>
  <div class="logos" :class="{down: viewCart}">
    <img :src="require('@/assets/logo1.png')" alt="Our Little Treats"/>
    <img :src="require('@/assets/logo2.png')" alt="Our Little Treats"/>
  </div>
  <router-view/>
    <div class="contact">
    <a href="https://instagram.com/ourlittletreats" target="_blank">@ourlittletreats</a>
    <a href="https://wa.me/6281546013130" target="_blank">+62 815-4601-3130</a>
  </div>
  <transition name="slideLeft">
    <button v-if="cartStore.items && cartStore.items.length" class="cart" @click="checkout()">
      <div class="dot">
        <p>{{cartStore.items.length}}</p>
      </div>
      <p v-if="$route.path === '/'">Checkout</p>
      <p v-else-if="$route.path === '/cart'">Order</p>
      <div class="bgChange" :class="{scaled: viewCart}"/>
    </button>
  </transition>
</template>

<script>
import { mapStores } from 'pinia'
import { useCartStore } from "@/store";

export default ({
  data() {
    return {
      viewCart: false,
    }
  },
  methods: {
    checkout() {
      if (this.$route.path === '/') {
      this.viewCart = true
      setTimeout(() => {
        this.$router.push('/cart')
      }, 2000)
      } else if (this.$route.path === '/cart') {
        window.open('https://wa.me/6281546013130', '_blank')
      }
    },
    read_cookie(name) {
      let result = document.cookie.match(new RegExp(name + '=([^;]+)'))
      result && (result = JSON.parse(result[1]))
      return result
    },
  },
  mounted() {
    try {
      this.cartStore.items = this.read_cookie('cart')
    } catch(err) {
      console.log(err)
    }
  },
  computed: {
    ...mapStores(useCartStore)
  }
})
</script>

<style lang="scss">
body {
  background-color: var(--secondary);
  font-family: MADE Canvas, Verdana, Geneva, Tahoma, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  --primary: #806657;
  --secondary: #DCD4D1;

  #app {
    margin: clamp(5px, 7vw, 25px);

    .contact {
      display: flex;
      flex-direction: column;
      margin-top: 1em;

      a {
        color: black;
        margin-top: 0.5em;
        text-align: left;
        font-family: MADE coachella;
        font-weight: 300;
      }
    }

    .logos {
      position: relative;
      height: 20vh;
      min-height: 50px;
      display: flex;
      justify-content: space-between;
      z-index: 20;
      transition: transform 1s ease;

      &.down {
        transform: translateY(3em);
      }
    }

    .cart {
      position: fixed;
      bottom: 15px;
      right: 15px;
      font-family: MADE Coachella;
      background-color: white;
      padding: 1em 2em;
      border: none;
      border-radius: 10px/10px;
      cursor: pointer;
      z-index: 10;

      .bgChange {
        opacity: 0;
        position: absolute;
        border-radius: 1px/1px;
        width: 1px;
        height: 1px;
        background-color: white;
        transition: transform 2s ease;

        &.scaled {
          opacity: 1;
          transform: scale(5000);
        }
      }

      .dot {
        position: absolute;
        top: -15px;
        left: -15px;
        border-radius: 30px / 30px;
        height: 30px;
        width: 30px;
        background-color: var(--primary);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
      }
    }
  }
}
</style>
