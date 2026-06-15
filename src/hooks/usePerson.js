import { useQuery } from '@tanstack/react-query'
import { getPerson } from '../api/endpoints'

export function usePerson(id) {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => getPerson(id).then(r => r.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}
