import tmdb from './tmdb'

export const getTrending = (type = 'all', window = 'day') =>
  tmdb.get(`/trending/${type}/${window}`)

export const searchMulti = (query, page = 1) =>
  tmdb.get('/search/multi', { params: { query, page } })

export const searchMovies = (query, params = {}) =>
  tmdb.get('/search/movie', { params: { query, ...params } })

export const searchTV = (query, params = {}) =>
  tmdb.get('/search/tv', { params: { query, ...params } })

export const searchPeople = (query, page = 1) =>
  tmdb.get('/search/person', { params: { query, page } })

export const getMovieDetail = (id) =>
  tmdb.get(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,similar,reviews' },
  })

export const getTVDetail = (id) =>
  tmdb.get(`/tv/${id}`, {
    params: { append_to_response: 'credits,videos,similar,reviews' },
  })

export const getPerson = (id) =>
  tmdb.get(`/person/${id}`, {
    params: { append_to_response: 'combined_credits' },
  })

export const getMovieGenres = () => tmdb.get('/genre/movie/list')
export const getTVGenres = () => tmdb.get('/genre/tv/list')
