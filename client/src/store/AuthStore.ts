import type { User } from '@/schema/user.schema';
import { create } from 'zustand'

interface AuthState {
    user: User | null,
    setUser: (user: User) => void,
    clearUser: () => void
}
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: ()  => set({user: null})
}))