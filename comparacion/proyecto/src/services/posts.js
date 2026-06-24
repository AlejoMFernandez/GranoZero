import supabase from "./supabase";

/**
 * Trae todas las publicaciones de todos los usuarios.
 * 
 * @returns {Promise<{id: number, user_id: string, title: string, body: string, created_at: string}[]>}
 */
export async function fetchAllPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select();
    
    if(error) {
        console.error("[posts.js fetchAllPosts] Error al traer los posts: ", error);
        throw new Error("Error al traer los posts: " + error.message);
    }

    return data;
}

/**
 * Trae todas las publicaciones de un usuario específico.
 * 
 * @param {string} userId - UUID del usuario.
 * @returns {Promise<{id: number, user_id: string, title: string, body: string, created_at: string}[]>}
 */
export async function fetchUserPosts(userId) {
    const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('user_id', userId);
    
    if(error) {
        console.error("[posts.js fetchUserPosts] Error al traer los posts del usuario: ", error);
        throw new Error("Error al traer los posts del usuario: " + error.message);
    }

    return data;
}

/**
 * Crea una nueva publicación.
 * 
 * @param {{userId: string, title: string, body: string}} params
 * @returns {Promise<void>}
 */
export async function createPost({ userId, title, body }) {
    const { error } = await supabase
        .from('posts')
        .insert({
            user_id: userId,
            title,
            body
        });

    if(error) {
        console.error("[posts.js createPost] Error al insertar el nuevo post: ", error);
        
        throw new Error("Error al crear el post: " + error.message);
    }
}

