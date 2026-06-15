import { useQuery } from '@tanstack/react-query'
import { getMovieDetail } from '../api/endpoints'

export function useMovieDetail(id) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetail(id).then(r => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}
