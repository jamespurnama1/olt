`<template>
  <router-link to="/">
    <transition name="slideRight">
      <button v-if="$route.path === '/cart'" class="back">
        <p>Back</p>
      </button>
    </transition>
    <div class="bgChangeBrown" :class="{scaled: $route.path === '/'}"/>
  </router-link>
  <div class="logos" :class="{down: $route.path === '/cart'}">
    <img :src="require('@/assets/logo1.png')" alt="Our Little Treats"/>
    <img :src="require('@/assets/logo2.png')" alt="Our Little Treats"/>
  </div>
  <router-view :status="status" :loaded="loaded" v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  <div class="contact">
    <a :href="`https://instagram.com/${status.instagram}`" target="_blank">@{{status.instagram}}</a>
    <a :href="`https://wa.me/${status.whatsapp}`" target="_blank">+{{status.whatsapp}}</a>
  </div>
  <transition name="slideLeft">
    <button :key="$route.path" v-if="cartStore.items && cartStore.items.length" class="cart" @click="checkout()">
      <div class="dot">
        <p>{{cartStore.items.length}}</p>
      </div>
      <p v-if="$route.path === '/'">Checkout</p>
      <p v-else-if="$route.path === '/cart'">Order</p>
    </button>
  </transition>
    <div class="bgChange" :class="{scaled: $route.path === '/cart'}"/>
</template>

<script>
import { mapStores } from 'pinia'
import Status from '@/services/Status'
import { useCartStore } from "@/store";

export default ({
  data() {
    return {
      open: [],
      loaded: false,
    }
  },
  methods: {
    checkout() {
      if (this.$route.path === '/') {
      // setTimeout(() => {
        this.$router.push('/cart')
      // }, 2000)
      } else if (this.$route.path === '/cart') {
        let string = `${encodeURIComponent(this.status.header)} %0a`
        Object.entries(this.cartList).forEach(([item, qty]) => string = string + `${encodeURIComponent(`${qty}x *${item}*`)} %0a Rp. ${this.price(item).price * qty} %0a %0a `)
        string = string + `_*Total tanpa ongkir: ${this.totalPrice}*_`
        window.open(`https://api.whatsapp.com/send?phone=${this.status.whatsapp}&text=${string}`, '_blank')
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
    },
    price(name) {
      return this.cartStore.items.find((item) => item.name === name)
    },
  },
  mounted() {
    try {
      if (this.read_cookie('cart')) this.cartStore.items = this.read_cookie('cart')
    } catch(err) {
      console.log(err)
    }
  },
  async created() {
    try {
        const response = await Status.getStatus()
        this.open = response.data.records
        if (!this.status.open) this.$router.push('/')
        this.loaded = true
      } catch(err) {
        console.log(err)
      }
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
    previewDomain() {
      return window.location.host.split('.')[0] === 'preview'
    },
    status() {
      let published = {}
      let preview = {}
      for (var i = 0; i !== this.open.length; i++) {
        const stat = {
          open: this.open[i].fields['PO'],
          date: new Date(this.open[i].fields['PO Date']),
          whatsapp: this.open[i].fields['WhatsApp'],
          instagram: this.open[i].fields['Instagram'],
          header: this.open[i].fields['Header']
        }
        if (this.open[i].fields.Name === 'Live') published = stat
        else if (this.open[i].fields.Name === 'Preview') preview = stat
      }
      if (this.previewDomain) return preview
      else return published
    },
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

    @keyframes scaled {
    0% {opacity: 1;}
    80% {transform: scale(5000); opacity: 1;}
    100% {opacity: 0;}
  }

  #app {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: clamp(5px, 7vw, 25px);
    min-height: 87vh;
    padding-bottom: 3.5em;
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
      left: clamp(5px, 7vw, 25px);
      top: clamp(5px, 7vw, 25px);
      font-family: MADE Coachella;
      background-color: var(--tertiary);
      transition: background-color 0.5s ease;
      padding: 1em 2em;
      border: none;
      border-radius: 10px/10px;
      cursor: pointer;
      z-index: 11;
      display: flex;

      &:before {
        transform: rotate(180deg);
        content: url(@/assets/arrow.svg);
        width: 20px;
        float: left;
        margin-right: 5px;
        margin-top: -2px;
      }

      p {
        margin: 0;
      }

      img {
        transform: rotate(180deg);
        
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
      z-index: -1;

      &.scaled {
        animation: scaled 1.5s;
      }
    }

    .cart {
      position: fixed;
      bottom: clamp(5px, 7vw, 25px);
      right: clamp(5px, 7vw, 25px);
      font-family: MADE Coachella;
      background-color: var(--tertiary);
      padding: 1em 2em;
      border: none;
      border-radius: 10px/10px;
      cursor: pointer;
      z-index: 10;
      display: flex;
      align-items: center;
      transition: background-color 0.5s ease;

      &:after {
        content: url(@/assets/arrow.svg);
        width: 20px;
        float: right;
        margin-left: 5px;
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

    .bgChange {
      position: fixed;
      bottom: clamp(5px, 7vw, 25px);
      right: clamp(5px, 7vw, 25px);
      opacity: 0;
      border-radius: 1px/1px;
      width: 1px;
      height: 1px;
      background-color: white;
      z-index: -1;

      &.scaled {
        animation: scaled 1.5s;
      }
    }
  }
}
</style>
