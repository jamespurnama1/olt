<template>
  <div class="card" @mouseover="showDetails=true" @mouseleave="showDetails=false">
    <h3 :class="{hover: showDetails}">{{ treat.name }}</h3>
    <transition name="fade">
      <div v-show="showDetails" class="details">
        <p>{{ treat.notes }}</p>
        <p>Rp. {{ treat.price }}</p>
      </div>
    </transition>
    <transition name="slideUp">
        <button v-show="showDetails" @click="addToCart()">
          <p>Add to Cart</p>
        </button>
    </transition>
    <img :src="treat.thumb[0].url" />
  </div>
</template>

<script>
export default {
  name: 'CardTreat',
  data() {
    return {
      showDetails: false,
    }
  },
  props: {
    treat: Object,
  },
  methods: {
    addToCart() {
      this.$emit('cart', this.treat)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  background-color: #806657;
  border-radius: 10px/10px;
  aspect-ratio: 2 / 3;
  text-align: left;
  color: white;
  font-family: MADE Coachella;

  .details {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 102, 87, 0.7);
    z-index: 2;
    padding: 1em;
    padding-bottom: 3em;
    display: flex;
    flex-direction: column-reverse;
    box-sizing: border-box;

    p {
      margin: 0;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
  }

  h3 {
    margin: 0;
    padding: 0.5em 0.3em 0.5em 1em;
    position: relative;
    z-index: 3;
    background-color: rgb(128, 102, 87);
    transition: background 0.5s ease;

    @include max-media(mobile) {
      font-size: 1rem;
    }

      &.hover {
        background-color: rgba(128, 102, 87, 0);
      }
    // color: #DCD4D1;
  }

  button {
    position: absolute;
    z-index: 3;
    background-color: white;
    bottom: -1px;
    left: 0;
    width: 100%;
    border: none;
    font-family: MADE Canvas;
    font-weight: 700;
    color: #806657;
    margin: 0;
    cursor: pointer;
  }

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
