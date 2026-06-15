import { useQuery } from '@tanstack/react-query'
import { searchMulti } from '../api/endpoints'

export function useSearchSuggestions(query) {
  return useQuery({
    queryKey: ['suggestions', query],
    queryFn: () => searchMulti(query, 1).then(r => r.data.results.slice(0, 7)),
    enabled: query.length > 1,
    staleTime: 1000 * 30,
  })
}
