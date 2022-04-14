<template>
  <transition name="fade">
    <div v-if="loaded">
      <p class="date" v-if="status.open">PO on <strong>{{ status.date.toDateString() }}</strong></p>
      <p class="closed" v-else><strong>PO closed</strong></p>
      <TransitionGroup tag="div" name="fade" v-if="status.open" class="grid">
          <Cards v-for="treat in treats" :key="treat.name || loaded" :treat="treat" @cart="addToCart($event, item)" />
      </TransitionGroup>
      <div v-else>
        <p class="closed">thank you for your enthusiasm!<br>please be patient for next open PO 😁</p>
      </div>
    </div>
  </transition>
</template>

<script>
import Cards from '@/components/Cards.vue'
import Airtable from '@/services/Airtable'
import { mapStores } from 'pinia'
import { useCartStore } from "@/store";

export default {
  name: 'Home-View',
  components: {
    Cards
  },
  data() {
    return {
      airtableResponse: [],
      open: [],
      preview: false,
      cart: [],
    }
  },
  props: {
    status: Object,
    loaded: Boolean,
  },
  methods: {
    bake_cookie(name, value) {
      const cookie = [name, '=', JSON.stringify(value), '; expires=', this.getDate, '; path=/; SameSite=Strict;'].join('');
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
  },
  mounted() {
    this.getTreats()
    this.cart = this.cartStore.items       
  },
  computed: {
    getDate() {
      // expire in 7 days
      return (new Date(Date.now()+ 604800*1000)).toUTCString();
    },
    previewDomain() {
      return window.location.host.split('.')[0] === 'preview'
    },
    treats() {
      const published = []
      const preview = []
      for (var i = 0; i !== this.airtableResponse.length; i++) {
        const project = {
          name: this.airtableResponse[i].fields.Name,
          thumb: this.airtableResponse[i].fields.Thumbnail,
          alt: this.airtableResponse[i].fields['Thumbnail Description'],
          price: this.airtableResponse[i].fields.Price,
          stock: this.airtableResponse[i].fields.Stock,
          notes: this.airtableResponse[i].fields.Notes,
          show: this.airtableResponse[i].fields['Show on Page']
        }
        if (this.airtableResponse[i].fields['Show on Page']) published.push(project)
        else preview.push(project)
      }
      if (this.previewDomain) return preview
      else return published
    },
    ...mapStores(useCartStore)
  }
}
</script>

<style lang="scss" scoped>
    .date {
      font-family: Georgia, 'Times New Roman', Times, serif;
      text-align: left;

      strong {
        font-weight: 700;
      }
    }

    .closed {
      font-family: Georgia, 'Times New Roman', Times, serif;

      strong {
        font-weight: 700;
      }
    }

    .grid {
      --grid-layout-gap: 3vw;
      --grid-column-count: 4;
      --grid-item--min-width: 120px;

      --gap-count: calc(var(--grid-column-count) - 1);
      --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
      --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));
      margin: auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
      grid-gap: var(--grid-layout-gap);
      margin-bottom: 2em;
    }
</style>
