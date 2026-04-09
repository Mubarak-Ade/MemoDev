import { create } from 'zustand'

interface FilterState {
    page: number
    limit: number
    tags: string[]
    languages: string[]
    dateRange: string
    startTime: string
    endTime: string
    project: string
    setLanguages: (value: string) => void
    setProject: (value: string) => void
    setTags: (value: string) => void
    setDateRange: (value: string) => void
    setStartTime: (value: string) => void
    setEndTime: (value: string) => void
    setPage: (page: number) => void
    clearFilter: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
    page: 1,
    limit: 5,
    tags: [],
    languages: [],
    dateRange: '',
    startTime: '',
    endTime: '',
    project: '',
    setProject: (value) => set({ project: value, page: 1 }),
    setTags: (value) =>
        set((state) => {
            const newTags = state.tags.includes(value)
                ? state.tags.filter((tag) => tag !== value)
                : [...state.tags, value]
            return {
                tags: newTags,
                page: 1,
            }
        }),
    setLanguages: (value) =>
        set((state) => {
            const newLang = state.languages.includes(value)
                ? state.languages.filter((lang) => lang !== value)
                : [...state.languages, value]
            return {
                languages: newLang,
                page: 1,
            }
        }),
    setDateRange: (value) =>
        set({
            dateRange: value,
            startTime: '',
            endTime: '',
            page: 1,
        }),
    setStartTime: (value) => set({ startTime: value, dateRange: 'custom', page: 1 }),
    setEndTime: (value) => set({ endTime: value, dateRange: 'custom', page: 1 }),
    setPage: (page) => set({ page }),
    clearFilter: () =>
        set({
            page: 1,
            tags: [],
            languages: [],
            dateRange: '',
            startTime: '',
            endTime: '',
            project: '',
        }),
}))
