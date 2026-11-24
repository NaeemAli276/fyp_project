import { Database } from "./supabase_types";

export interface User {
    user_id: string
    display_name: string
    avatar_url: string | null
    // email: string
}

export interface Contact extends User {
    chat_id: string
}

export type Profile = Database['public']['Tables']['profiles']['Row']

export interface public_profile {
    id: string
    display_name: string
    avatar_url: string | null
}

export interface Message {
    id: string
    chat_id: string
    sender_id: string
    content: string
    media_url: string | null
    message_type: string
    created_at: string
}
