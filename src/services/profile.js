// perfiles
import { supabase } from '../lib/supabase'

export async function fetchAllProfiles() {
    const { data, error } = await supabase.from('profiles').select()
    if (error) throw new Error(error.message)
    return data
}

export async function fetchUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('user_id', userId)
    if (error) throw new Error(error.message)
    return data[0]
}

export async function updateUserProfile({ userId, profileData }) {
    const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', userId)
    if (error) throw new Error(error.message)
}
