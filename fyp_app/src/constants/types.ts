import { Database } from "./supabase_types";

export type RootStackParamList = {
    index: undefined
    loginScreen: undefined; 
    registerScreen: undefined,
    splashScreen: undefined,
    contactScreen: { id: string }
};

export interface User {
    id: string
    display_name: string
    avatar_url: string | null
    email: string
}

export interface Contact extends User {
    recent_message: string
    time: string
}

export type Profile = Database['public']['Tables']['profiles']['Row']

export interface public_profile {
    id: string
    display_name: string
    avatar_url: string | null
}