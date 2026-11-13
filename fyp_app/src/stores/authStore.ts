// authstore.ts
import { create } from 'zustand'
import { User } from '../constants/types'


interface AuthState {
    user: User | null
    isAuthenticated: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: true,
    login: async (username, password) => {
        
    },
    logout: () => set({ user: null, isAuthenticated: false })
}))