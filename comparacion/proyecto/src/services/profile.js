import supabase from "./supabase";

/**
 * Trae todos los perfiles de usuario.
 * 
 * @returns {Promise<{user_id: string, username: string, bio: string, favorite_preparation: string}[]>}
 */
export async function fetchAllProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select();

    if(error) {
        console.error("[profile.js fetchAllProfiles] Error al traer los perfiles: ", error);
        throw new Error("Error al traer los perfiles: " + error.message);
    }

    return data;
}

/**
 * Trae el perfil de un usuario por su user_id.
 * 
 * @param {string} userId - UUID del usuario en auth.users.
 * @returns {Promise<{user_id: string, username: string, bio: string, favorite_preparation: string}>}
 */
export async function fetchUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('user_id', userId);
    
    if(error) {
        console.error("[profile.js fetchUserProfile] Error al traer los perfiles de usuario: ", error);
        throw new Error("Error al traer los perfiles de usuario: " + error.message);
    }

    return data[0];
}

/**
 * Actualiza los datos del perfil de un usuario.
 * 
 * @param {{userId: string, profileData: {username?: string, bio?: string, favorite_preparation?: string}}} params
 * @returns {Promise<void>}
 */
export async function updateUserProfile({ userId, profileData }) {
    const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', userId);

    if(error) {
        console.error("[profile.js updateUserProfile] Error al actualizar el perfil de usuario: ", error);
        throw new Error("Error al actualizar el perfil de usuario: " + error.message);
    }
}


