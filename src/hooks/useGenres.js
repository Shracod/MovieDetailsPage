import { useQuery } from '@tanstack/react-query'
import { getMovieGenres, getTVGenres } from '../api/endpoints'

export function useGenres(type = 'movie') {
  return useQuery({
    queryKey: ['genres', type],
    queryFn: () => {
      const fn = type === 'tv' ? getTVGenres : getMovieGenres
      return fn().then(r => r.data.genres)
    },
    staleTime: Infinity,
  })
}
