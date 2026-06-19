/** Chat público — portado del TP1, sin modificaciones */
import { supabase } from '../lib/supabase'

export async function sendPublicChatMessage({ email, body }) {
    const { error } = await supabase
        .from('public_chat_messages')
        .insert({ email, body })
    if (error) throw new Error(error.message)
}

export async function fetchPublicChatMessages() {
    const { data, error } = await supabase
        .from('public_chat_messages')
        .select()
        .order('created_at', { ascending: true })
    if (error) throw new Error(error.message)
    return data
}

export function subscribeToPublicChatNewMessages(callback) {
    const channel = supabase.channel('public_chat')
    channel.on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'public_chat_messages' },
        payload => callback(payload.new)
    )
    channel.subscribe()
    return () => channel.unsubscribe()
}
