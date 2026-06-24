import supabase from "./supabase";

/**
 * Envía un mensaje al chat público.
 * 
 * @param {{email: string, body: string}} params
 * @returns {Promise<void>}
 */
export async function sendPublicChatMessage({ email, body }) {
    const { error } = await supabase
        .from('public_chat_messages')
        .insert({
            email,
            body,
        });

    if(error) {
        console.error("[public-chat.js sendPublicChatMessage] Error al insertar el nuevo mensaje del chat público: ", error);
        
        throw new Error("Error al enviar el mensaje de chat público: " + error.message);
    }
}

/**
 * Trae todos los mensajes del chat público.
 * 
 * @returns {Promise<{id: number, email: string, body: string, created_at: string}[]>}
 */
export async function fetchPublicChatMessages() {
    const { data, error } = await supabase
        .from('public_chat_messages')
        .select();
    
    if(error) {
        console.error("[public-chat.js fetchPublicChatMessages] Error al traer los mensajes del chat público: ", error);
        throw new Error("Error al enviar el traer los mensajes del chat público: " + error.message);
    }

    return data;
}

/**
 * Suscribe a nuevos mensajes del chat público en tiempo real.
 * 
 * @param {(message: {id: number, email: string, body: string, created_at: string}) => void} callback
 * @returns {() => void} Función para cancelar la suscripción.
 */
export function subscribeToPublicChatNewMessages(callback) {
    const chatChannel = supabase.channel('public_chat');
    chatChannel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'public_chat_messages',
        },
        payload => {
            callback(payload.new);
        }
    );

    chatChannel.subscribe();

    return () => {
        chatChannel.unsubscribe();
    }
}
