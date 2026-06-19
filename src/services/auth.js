/**
 * Servicio de autenticación — adaptado del TP1 para Vue 3 + Pinia.
 * Usa el mismo proyecto Supabase y las mismas tablas (profiles).
 */
import { supabase } from '../lib/supabase'

// ── Estado compartido con el patrón observer del TP1 ─────────────────
let userData = { id: null, email: null, username: null }
let observers = []

// Promesa con timeout para evitar que Supabase se cuelgue indefinidamente
function conTimeout(promesa, ms = 10000) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Tiempo de espera agotado. Revisá tu conexión.')), ms)
    )
    return Promise.race([promesa, timeout])
}

supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('[auth] onAuthStateChange:', event)
    if (session?.user) {
        userData = {
            id:       session.user.id,
            email:    session.user.email,
            username: null,
        }
        // Cargar username desde la tabla profiles
        try {
            const { data } = await conTimeout(
                supabase.from('profiles').select('username').eq('user_id', session.user.id).single()
            )
            if (data) userData.username = data.username
        } catch (e) {
            console.warn('[auth] onAuthStateChange: no se pudo cargar el perfil:', e.message)
        }
    } else {
        userData = { id: null, email: null, username: null }
    }
    notifyAll()
})

// ── Registrar nuevo usuario + crear perfil ─────────────────────────────
export async function register({ username, email, password, favorite_preparation }) {
    console.log('[auth] register: iniciando...')
    const { data, error } = await conTimeout(
        supabase.auth.signUp({ email, password })
    )
    if (error) throw new Error(error.message)
    console.log('[auth] register: signUp OK, insertando perfil...')

    await conTimeout(
        supabase.from('profiles').insert({ user_id: data.user.id, username, favorite_preparation })
    )

    userData = { id: data.user.id, email: data.user.email, username }
    notifyAll()
    console.log('[auth] register: listo!')
    return data.user
}

// ── Login ────────────────────────────────────────────────────────────────
export async function login({ email, password }) {
    console.log('[auth] login: iniciando...')
    const { data, error } = await conTimeout(
        supabase.auth.signInWithPassword({ email, password })
    )
    if (error) throw new Error(error.message)
    console.log('[auth] login: signIn OK, cargando perfil...')

    let username = null
    try {
        const { data: profile } = await conTimeout(
            supabase.from('profiles').select('username').eq('user_id', data.user.id).single()
        )
        username = profile?.username ?? null
    } catch (e) {
        console.warn('[auth] login: no se pudo cargar el perfil:', e.message)
    }

    userData = { id: data.user.id, email: data.user.email, username }
    notifyAll()
    console.log('[auth] login: listo!')
    return data.user
}

// ── Logout ────────────────────────────────────────────────────────────────
export async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    userData = { id: null, email: null, username: null }
    notifyAll()
}

// ── Observer pattern (igual que el TP1) ──────────────────────────────────
export function subscribeToAuthStateChanges(observer) {
    observers.push(observer)
    observer({ ...userData })                   // notifica el estado actual inmediatamente
    return () => {
        observers = observers.filter(o => o !== observer)
    }
}

function notifyAll() {
    observers.forEach(obs => obs({ ...userData }))
}
