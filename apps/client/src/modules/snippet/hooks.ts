import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    createSnippet,
    deleteSnippet,
    editSnippet,
    getSnippet,
    getSingleSnippets,
    getSnippetDetails,
    getTags,
    getLangs,
    getDrafts,
} from './services'
import type { SnippetInput, Snippet, FilterSnippet } from '@/schema/snippet.schema'
import { useFilterStore } from '@/store/FilteStore'

export const useSnippet = () => {
    const {dateRange, languages, limit, page, project, tags} = useFilterStore()
    const param = {dateRange, languages, limit, page, project, tags}
    console.log(param);
    
    return useQuery<FilterSnippet>({
        queryKey: ['snippets', param],
        queryFn: () => getSnippet(param),
    })
}

export const useDrafts = () => {
    return useQuery<Snippet[]>({
        queryKey: ['drafts'],
        queryFn: () => getDrafts(),
    })
}

export const useGetSnippet = (id?: string) => {
    return useQuery<Snippet>({
        queryKey: ['snippets', id],
        queryFn: () => getSingleSnippets(id as string),
        enabled: !!id,
    })
}

export const useTags = () => {
    return useQuery<string[]>({
        queryKey: ['tags'],
        queryFn: getTags,
    })
}
export const useLangs = () => {
    return useQuery<string[]>({
        queryKey: ['langs'],
        queryFn: getLangs,
    })
}

export const useSnippetDetails = (slug?: string) => {
    return useQuery<Snippet>({
        queryKey: ['snippets', slug],
        queryFn: () => getSnippetDetails(slug as string),
        enabled: !!slug,
    })
}

export const useCreateSnippet = () => {
    const queryClient = useQueryClient()
    return useMutation<Snippet, Error, SnippetInput>({
        mutationFn: (snippet: SnippetInput) => createSnippet(snippet),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['snippets'] })
        },
    })
}

export const useEditSnippet = (id?: string) => {
    const queryClient = useQueryClient()
    return useMutation<Snippet, Error, SnippetInput>({
        mutationFn: (edit: SnippetInput) => {
            if (!id) {
                throw new Error('Missing snippet id')
            }
            return editSnippet(id, edit)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['snippets'] })
            queryClient.invalidateQueries({ queryKey: ['snippets', id] })
        },
    })
}

export const useDeleteSnippet = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => {
            if (!id) {
                throw new Error('Missing snippet id')
            }
            return deleteSnippet(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['snippets'] })
        },
    })
}
