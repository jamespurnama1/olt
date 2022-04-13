<template>
  <router-link to="/">
    <!-- <transition name="slideRight"> -->
      <button v-if="$route.path === '/cart'" class="back">
        <p>Back</p>
      </button>
    <!-- </transition> -->
    <div class="bgChangeBrown" :class="{scaled: $route.path === '/'}"/>
  </router-link>
  <div class="logos" :class="{down: $route.path === '/cart'}">
    <img :src="require('@/assets/logo1.png')" alt="Our Little Treats"/>
    <img :src="require('@/assets/logo2.png')" alt="Our Little Treats"/>
  </div>
  <router-view :key="$route.path" />
    <div class="contact">
    <a href="https://instagram.com/ourlittletreats" target="_blank">@ourlittletreats</a>
    <a href="https://wa.me/6281546013130" target="_blank">+62 815-4601-3130</a>
  </div>
  <transition name="slideLeft">
    <button v-if="cartStore.items && cartStore.items.length" class="cart" :class="{brown: $route.path === '/cart'}" @click="checkout()">
      <div class="dot">
        <p>{{cartStore.items.length}}</p>
      </div>
      <p v-if="$route.path === '/'">Checkout</p>
      <p v-else-if="$route.path === '/cart'">Order</p>
      <div class="bgChange" :class="{scaled: $route.path === '/cart'}"/>
    </button>
  </transition>
</template>

<script>
import { mapStores } from 'pinia'
import { useCartStore } from "@/store";

export default ({
  data() {
    return {
    }
  },
  methods: {
    checkout() {
      if (this.$route.path === '/') {
      // setTimeout(() => {
        this.$router.push('/cart')
      // }, 2000)
      } else if (this.$route.path === '/cart') {
        window.open('https://wa.me/6281546013130', '_blank')
      }
    },
    read_cookie(name) {
      let result = document.cookie.match(new RegExp(name + '=([^;]+)'))
      result && (result = JSON.parse(result[1]))
      return result
    },
    changeBG() {
      if (this.$route.path === '/cart') {
        document.querySelector('body').style.setProperty('--secondary', 'white')
        document.querySelector('body').style.setProperty('--tertiary', '#DCD4D1')
      } else {
        document.querySelector('body').style.setProperty('--secondary', '#DCD4D1')
        document.querySelector('body').style.setProperty('--tertiary', 'white')
      }
    }
  },
  mounted() {
    try {
      if (this.read_cookie('cart')) this.cartStore.items = this.read_cookie('cart')
    } catch(err) {
      console.log(err)
    }
  },
  created() {
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
  --tertiary: white;

  #app {
    position: relative;
    margin: clamp(5px, 7vw, 25px);
    min-height: 87vh;
    padding-bottom: 3em;
    margin-bottom: 0;

    .contact {
      position: absolute;
      bottom: 0;
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

    .back {
      position: fixed;
      left: 15px;
      top: 15px;
      font-family: MADE Coachella;
      background-color: var(--tertiary);
      padding: 1em 2em;
      border: none;
      border-radius: 10px/10px;
      cursor: pointer;
      z-index: 10;

      p {
        margin: 0;
      }
    }

    .bgChangeBrown {
      position: fixed;
      left: 15px;
      top: 15px;
      opacity: 0;
      border-radius: 1px/1px;
      width: 1px;
      height: 1px;
      background-color: #DCD4D1;
      z-index: 10;
      // transition: transform 2s ease;

      &.scaled {
        animation: scaled 3s;

        @keyframes scaled {
          0% {opacity: 1;}
          90% {transform: scale(5000); opacity: 1;}
          100% {opacity: 0;}
        }
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

      &.brown {
        background-color: var(--tertiary);
      }

      .bgChange {
        opacity: 0;
        position: absolute;
        border-radius: 1px/1px;
        width: 1px;
        height: 1px;
        background-color: white;
        // transition: transform 2s ease;

        &.scaled {
          animation: scaled 3s;

          @keyframes scaled {
            0% {opacity: 1;}
            90% {transform: scale(5000); opacity: 1;}
            100% {opacity: 0;}
          }
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
