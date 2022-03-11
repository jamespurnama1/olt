<template>
  <h1>Hi Joey</h1>
  <div class="grid">
    <Cards v-for="treat in treats.published" :key="treat.name" :treat="treat"/>
    <Cards v-show="preview" v-for="treat in treats.preview" :key="treat.name" :treat="treat"/>
  </div>
</template>

<script>
import Cards from './components/Cards.vue'
import Airtable from '@/services/Airtable'

export default {
  name: 'App',
  components: {
    Cards
  },
  data() {
    return {
      airtableResponse: [],
      preview: false,
    }
  },
  mounted() {
    const self= this
    async function getTreats() {
      try {
        const response = await Airtable.getTreats()
        console.log(response)
        self.airtableResponse = response.data.records
      } catch(err) {
        console.log(err)
      }
    }

    getTreats()         
  },
  computed: {
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
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .grid {
    margin: auto;
    display: grid;
    grid-template-columns: 300px 300px 300px;
    grid-gap: 50px;
    width: fit-content;
  }
}
</style>
