<template>
  <h1>Hi Joey</h1>
  <h3 v-if="status.published.open">PO on {{ status.published.date }}</h3>
  <h3 v-else>PO closed</h3>
  <div v-if="status.published.open" class="grid">
    <Cards v-for="treat in treats.published" :key="treat.name" :treat="treat"/>
    <Cards v-show="preview" v-for="treat in treats.preview" :key="treat.name" :treat="treat"/>
  </div>
  <div v-else>
    <p>thank you for your enthusiasm!<br>please be patient for next open PO 😁</p>
  </div>
</template>

<script>
import Cards from './components/Cards.vue'
import Airtable from '@/services/Airtable'
import Status from '@/services/Status'

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

    async function getStatus() {
      try {
        const response = await Status.getStatus()
        console.log(response)
        self.open = response.data.records
      } catch(err) {
        console.log(err)
      }
    }

    getStatus() 
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
    },
    status() {
      let published = {}
      let preview = {}
      for (var i = 0; i !== this.open.length; i++) {
          const stat = {
            open: this.open[i].fields['PO'],
            date: this.open[i].fields['PO Date'],
          }
          if (this.open[i].fields.Name === 'Live') published = stat
          else if (this.open[i].fields.Name === 'Preview') preview = stat
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
