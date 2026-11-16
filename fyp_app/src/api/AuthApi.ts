import { supabase } from "@/lib/supbase";

export async function login(email: string, password: string): Promise<any> {

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        alert("Email or password is incorrect")
    }

    return data.session

}   