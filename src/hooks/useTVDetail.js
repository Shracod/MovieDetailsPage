import { useQuery } from '@tanstack/react-query'
import { getTVDetail } from '../api/endpoints'

export function useTVDetail(id) {
  return useQuery({
    queryKey: ['tv', id],
    queryFn: () => getTVDetail(id).then(r => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}
