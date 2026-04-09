import type { SnippetInput, Snippet, FilterSnippet } from '@/schema/snippet.schema'
import api from '@/utils/api'
import { queryBuilder } from '@/store/filterUtils'

export const getSnippet = async (filter: any): Promise<FilterSnippet> => {
    const params = queryBuilder(filter)
    console.log(params);
    
    const res = await api.get(`snippets?${params}`)
    return res.data
}

export const getDrafts = async () => {
    const res = await api.get("snippets/drafts")
    return res.data
}

export const getTags = async () => {
    const res = await api.get("snippets/tags")
    return res.data
}

export const getLangs = async () => {
    const res = await api.get("snippets/langs")
    return res.data
}

export const getSingleSnippets = async (id: string) : Promise<Snippet> => {
    const res = await api.get(`/snippets/${id}`)
    return res.data
}

export const getSnippetDetails = async (slug: string) : Promise<Snippet> => {
    const res = await api.get(`/snippets/${slug}/preview`)
    return res.data
}

export const createSnippet = async (data: SnippetInput): Promise<Snippet> => {
    const res = await api.post("/snippets", data)
    return res.data
}

export const deleteSnippet = async (id: string) => {
    const res = await api.delete(`/snippets/${id}`)
    return res.data
}

export const editSnippet = async (id: string, data: SnippetInput): Promise<Snippet> => {
    const res = await api.put(`/snippets/${id}`, data)
    return res.data
}
