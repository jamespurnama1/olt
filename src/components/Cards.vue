<template>
  <div class="card">
    <img :src="treat.thumb[0].url" />
    <h3>{{ treat.name }}</h3>
    <div v-if="showDetails">
      <p>{{ treat.notes }}</p>
      <p><strong>Rp. {{ treat.price }}</strong></p>
      <button @click="addToCart()">
        <p>Add to Cart</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTreat',
  props: {
    treat: Object,
    showDetails: Boolean,
  },
  methods: {
    addToCart() {
      console.log('add to cart')
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  background-color: #806657;
  border-radius: 10px/10px;

  h3 {
    color: #DCD4D1;
    margin: 40px 0 0;
  }
  img {
    max-width: 300px;
  }
}
</style>
