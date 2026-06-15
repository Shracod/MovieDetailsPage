import { useQuery } from '@tanstack/react-query'
import { getTrending } from '../api/endpoints'

export function useTrending(type = 'movie', timeWindow = 'day') {
  return useQuery({
    queryKey: ['trending', type, timeWindow],
    queryFn: () => getTrending(type, timeWindow).then(r => r.data.results),
    staleTime: 1000 * 60 * 10,
  })
}
