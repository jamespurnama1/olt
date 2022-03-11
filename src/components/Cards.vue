<template>
  <div class="card">
    <img :src="treat.thumb[0].url" />
    <h3>{{ treat.name }}</h3>
    <p>{{ treat.notes }}</p>
    <p><strong>Rp. {{ treat.price }}</strong></p>
  </div>
</template>

<script>
export default {
  name: 'CardTreat',
  props: {
    treat: Object
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
img {
  max-width: 300px;
}
</style>
