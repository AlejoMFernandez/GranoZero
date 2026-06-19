/** Posts/reseñas — portado del TP1 */
import { supabase } from '../lib/supabase'

export async function fetchAllPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select()
        .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data
}

export async function fetchUserPosts(userId) {
    const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data
}

export async function createPost({ userId, title, body, locationName, locationDisplay, lat, lng, rating, cafeType }) {
    const { error } = await supabase
        .from('posts')
        .insert({
            user_id:          userId,
            title,
            body,
            location_name:    locationName    || null,
            location_display: locationDisplay || null,
            lat:              lat             || null,
            lng:              lng             || null,
            rating:           rating          || null,
            cafe_type:        cafeType        || null,
        })
    if (error) throw new Error(error.message)
}
