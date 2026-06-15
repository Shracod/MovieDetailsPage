import { useQuery } from '@tanstack/react-query'
import { searchMulti, searchMovies, searchTV, searchPeople } from '../api/endpoints'

export function useSearch({ query, mediaType, page }) {
  return useQuery({
    queryKey: ['search', query, mediaType, page],
    queryFn: async () => {
      if (mediaType === 'movie') return searchMovies(query, { page }).then(r => r.data)
      if (mediaType === 'tv') return searchTV(query, { page }).then(r => r.data)
      if (mediaType === 'person') return searchPeople(query, page).then(r => r.data)
      return searchMulti(query, page).then(r => r.data)
    },
    enabled: !!query && query.length > 2,
    staleTime: 1000 * 60 * 2,
  })
}
