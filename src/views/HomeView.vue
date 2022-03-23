<template>
  <transition name="fade">
    <div v-if="loaded">
      <p class="date" v-if="status.published.open">PO on <strong>{{ status.published.date.toDateString() }}</strong></p>
      <p v-else>PO closed</p>
      <div v-if="status.published.open" class="grid">
        <Cards v-for="treat in treats.published" :key="treat.name" :treat="treat" @cart="addToCart($event, item)" />
        <!-- <Cards v-show="preview" v-for="treat in treats.preview" :key="treat.name" :treat="treat" :showDetails="true"/> -->
      </div>
      <div v-else>
        <p>thank you for your enthusiasm!<br>please be patient for next open PO 😁</p>
      </div>
    </div>
  </transition>
</template>

<script>
// import gsap from "gsap"
import Cards from '@/components/Cards.vue'
import Airtable from '@/services/Airtable'
import Status from '@/services/Status'
import { mapStores } from 'pinia'
import { useCartStore } from "@/store";

export default {
  name: 'App',
  components: {
    Cards
  },
  data() {
    return {
      airtableResponse: [],
      open: [],
      preview: false,
      loaded: false,
      cart: [],
    }
  },
  methods: {
    bake_cookie(name, value) {
      const cookie = [name, '=', JSON.stringify(value), '; expires=', this.getDate, '; path=/; SameSite=Strict;'].join('');
      // const cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/; SameSite=Strict;'].join('');
      document.cookie = cookie;
    },
    addToCart(item) {
      this.cart.push(item)
      this.cartStore.items = this.cart
      this.bake_cookie('cart', this.cart)
    },
    async getTreats () {
      try {
        const response = await Airtable.getTreats()
        this.airtableResponse = response.data.records
      } catch(err) {
        console.log(err)
      }
    },
    async getStatus() {
      try {
        const response = await Status.getStatus()
        this.open = response.data.records
        this.loaded = true
      } catch(err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.getStatus() 
    this.getTreats()
    this.cart = this.cartStore.items       
  },
  computed: {
    getDate() {
      // expire in 7 days
      return (new Date(Date.now()+ 604800*1000)).toUTCString();
    },
    treats() {
        const published = []
        const preview = []
        for (var i = 0; i !== this.airtableResponse.length; i++) {
          const project = {
            name: this.airtableResponse[i].fields.Name,
            thumb: this.airtableResponse[i].fields.Thumbnail,
            price: this.airtableResponse[i].fields.Price,
            stock: this.airtableResponse[i].fields.Stock,
            notes: this.airtableResponse[i].fields.Notes,
            show: this.airtableResponse[i].fields['Show on Page']
          }
          if (this.airtableResponse[i].fields['Show on Page']) published.push(project)
          else preview.push(project)
        }
        return { published, preview }
    },
    status() {
      let published = {}
      let preview = {}
      for (var i = 0; i !== this.open.length; i++) {
          const stat = {
            open: this.open[i].fields['PO'],
            date: new Date(this.open[i].fields['PO Date']),
          }
          if (this.open[i].fields.Name === 'Live') published = stat
          else if (this.open[i].fields.Name === 'Preview') preview = stat
        }
        return { published, preview }
    },
    ...mapStores(useCartStore)
  }
}
</script>

<style lang="scss" scoped>
    .date {
      font-family: MADE Coachella;
      font-weight: 100;
      text-align: left;

      strong {
        font-weight: 700;
      }
    }

    .grid {
      --grid-layout-gap: 3vw;
      --grid-column-count: 4;
      --grid-item--min-width: 100px;

      --gap-count: calc(var(--grid-column-count) - 1);
      --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
      --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));
      margin: auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
      grid-gap: var(--grid-layout-gap);
    }
</style>
