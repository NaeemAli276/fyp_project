import type { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '../constants/types';

// Define the shape of the profile table (adjust based on your actual columns)
interface Profile {
    display_name?: string | null;
    avatar_url?: string | null;
    // other custom fields...
}

export function mapSupabaseUser(su: SupabaseUser, profile?: Profile | null): User {
    return {
        id: su.id,
        email: su.email!,
        // Prefer profile table data, fall back to metadata, then to email prefix
        avatar_url: profile?.avatar_url ?? su.user_metadata?.avatar_url ?? null,
        display_name:
            profile?.display_name
            ?? su.user_metadata?.display_name
            ?? su.email!.split('@')[0],
    };
}