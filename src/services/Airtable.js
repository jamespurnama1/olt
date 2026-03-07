import axios from 'axios'

const Axios = axios.create({
  baseURL: "https://api.airtable.com/v0/app6MGAqCRbklbDAu/Main"
});

Axios.defaults.headers.common = {'Authorization': 'Bearer '  + import.meta.env.VITE_AIRTABLEKEY}

export default{
  getTreats() {
    return Axios.get()
  }
}
