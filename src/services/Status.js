import axios from 'axios'

const Axios = axios.create({
  baseURL: "https://api.airtable.com/v0/app6MGAqCRbklbDAu/Web%20Status"
});

Axios.defaults.headers.common = {'Authorization': 'Bearer '  + import.meta.env.VITE_AIRTABLEKEY}

export default{
  getStatus() {
    return Axios.get()
  }
}
