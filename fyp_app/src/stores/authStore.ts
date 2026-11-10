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
    isAuthenticated: false,
    login: async (username, password) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        set({
            user: { id: '1', display_name: username, avatar_url: null }
        })
    },
    logout: () => set({ user: null, isAuthenticated: false })
}))