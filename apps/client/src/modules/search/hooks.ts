import { useQuery } from '@tanstack/react-query'
import type { SearchResponse } from '@/schema/search.schema'
import { searchVault } from './services'

export const useVaultSearch = (query: string) => {
    const trimmedQuery = query.trim()

    return useQuery<SearchResponse>({
        queryKey: ['vault-search', trimmedQuery],
        queryFn: () => searchVault(trimmedQuery),
        enabled: trimmedQuery.length > 0,
        staleTime: 15_000,
    })
}
