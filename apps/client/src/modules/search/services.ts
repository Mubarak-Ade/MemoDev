import type { SearchResponse } from '@/schema/search.schema'
import api from '@/utils/api'

export const searchVault = async (query: string): Promise<SearchResponse> => {
    const res = await api.get(`search?q=${encodeURIComponent(query)}`)
    return res.data
}
