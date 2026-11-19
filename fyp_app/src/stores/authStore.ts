// authstore.ts
import { create } from 'zustand'
import { User } from '../constants/types'
import { supabase } from '@/lib/supbase'
import { mapSupabaseUser } from '@/lib/mapSupabaseUser'


interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>,
    register: (email: string, password: string, displayName: string) => Promise<void>
    logout: () => Promise<void>
    initialise: () => void
}

// Add an async function to fetch the profile
const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')  // Or explicitly list the fields you want: 'display_name, avatar_url, ...'
        .eq('id', userId)
        .single();

    if (error) {
        console.warn('Failed to fetch profile:', error.message);
        return null;
    }
    return data;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (email, password) => {
                
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password: password
        })       

        console.log("data from login: ", data)
        
        if (error) {
            console.log("error from login: ", error.message)
            throw new Error(error.message)
        }

        const profile = await fetchProfile(data.user.id)
        console.log("profile from login: ", profile)

        if (data.user !== null) {
            set({
                user: mapSupabaseUser(data.user, profile),
                isAuthenticated: true,
                isLoading: false
            })
        }

    },

    logout: async () => {
        await supabase.auth.signOut()
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false
        })
    },

    register: async (email, password, displayName) => {

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { display_name: displayName }
            }
        })

        if (error) {
            throw new Error(error.message)
        }

        if (!data.session) {
            throw new Error(
                'Check your email to confirm your account before logging in.'
            )
        }

        // user is logged in immediately because email confirmation is off
        const profile = await fetchProfile(data.user!.id)
        set({
            user: mapSupabaseUser(data.user!, profile),
            isAuthenticated: true,
            isLoading: false
        })

    },

    initialise: async () => {

        supabase.auth.getSession().then( async ({ data: { session } }) => {

            if (session?.user) {

                const profile = await fetchProfile(session?.user.id)

                set({
                    user: mapSupabaseUser(session.user, profile),
                    isAuthenticated: true,
                    isLoading: false
                })
            }
            else {
                set({
                    isLoading: false
                })
            }

        })

        supabase.auth.onAuthStateChange( async (_event, session) => {
            if (session?.user) {

                const profile = await fetchProfile(session.user.id);

                set({
                    user: mapSupabaseUser(session.user, profile),
                    isAuthenticated: true,
                    isLoading: false
                })
            }
            else {
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false
                })
            }
        }) 

    }

}))
