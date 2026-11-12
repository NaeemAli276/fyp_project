// authstore.ts
import { create } from 'zustand'

interface User {
    id: string
    display_name: string
    avatar_url: string | null
}

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