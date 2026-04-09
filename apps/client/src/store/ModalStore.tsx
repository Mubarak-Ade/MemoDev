import { create } from 'zustand'

type ModalType = 'null' | "create-project" | 'edit-project' | 'search' | 'select-project'


interface Modal {
    type: ModalType,
    props?: Record<string, unknown>
}

interface ModalState {
    type: ModalType
    current: null | Modal,
    showModal: (type: ModalType, props?: Record<string, unknown>) => void
    closeModal: (type: ModalType) => void
}

export const useModal = create<ModalState>((set) => ({
    type: 'null',
    current: null,
    showModal: (type, props) => {
        set({current: {type, props}})
    },
    closeModal: (_type) => {
        set({current: null})
    },
}))
