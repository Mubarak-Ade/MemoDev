import { create } from "zustand";

interface ProjectState {
    isVisible: boolean,
    id: string | null,
    editModal: (id?: string) => void,
    showModal: () => void,
    closeModal: () => void
}

export const useProjectStore = create<ProjectState>((set) => ({
    isVisible: false,
    id: null,
    editModal: (id) => set({isVisible: true, id }),
    showModal: () => set({isVisible: true }),
    closeModal: () => set({isVisible: false, id: undefined})
}))