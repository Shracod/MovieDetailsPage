import axios from 'axios'

const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
})

tmdb.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  }
  return config
})

export default tmdb
