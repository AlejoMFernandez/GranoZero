import supabase from "./supabase";

let userData = {
    id: null,
    email: null,
};

let observers = [];

// Restaura la sesión guardada en localStorage al recargar la página.
// Supabase guarda el token automáticamente; onAuthStateChange lo lee
// y dispara INITIAL_SESSION si hay una sesión activa.
supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
        userData = { id: session.user.id, email: session.user.email };
    } else {
        userData = { id: null, email: null };
    }
    notifyAll();
});

/**
 * Registra un nuevo usuario con email, password y username.
 * Crea el usuario en Supabase Auth y una fila en la tabla profiles.
 * 
 * @param {{username: string, email: string, password: string}} credentials
 * @returns {Promise<import('@supabase/supabase-js').User>}
 */
export async function register({ username, email, password }) {
    const { data, error } = await supabase
        .auth
        .signUp({
            email,
            password,
        });

    if(error) {
        console.error('[auth.js register] Error al crear una cuenta de usuario: ', error);
        throw new Error(error.message);
    }

    const { error: profileError } = await supabase
        .from("profiles")
        .insert({ user_id: data.user.id, username });
    
    if(profileError) {
        console.error('[auth.js register] Error al crear el perfil: ', profileError);
    }

    userData = {
        ...userData,
        id: data.user.id,
        email: data.user.email,
    }
    notifyAll();

    return data.user;
}

/**
 * Inicia sesión con email y password.
 * 
 * @param {{email: string, password: string}} credentials
 * @returns {Promise<import('@supabase/supabase-js').User>}
 */
export async function login({ email, password }) {
    const { data, error } = await supabase
        .auth
        .signInWithPassword({
            email,
            password,
        });

    if(error) {
        console.error('[auth.js login] Error al iniciar sesión: ', error);
        throw new Error(error.message);
    }

    userData = {
        ...userData,
        id: data.user.id,
        email: data.user.email,
    }
    notifyAll();

    return data.user;
}

/**
 * Cierra la sesión del usuario autenticado.
 * 
 * @returns {Promise<void>}
 */
export async function logout() {
    const { error } = await supabase
        .auth
        .signOut();

    if(error) {
        console.error('[auth.js logout] Error al cerrar sesión: ', error);
        throw new Error(error.message);
    }

    userData = {
        ...userData,
        id: null,
        email: null,
    }
    notifyAll();
}

/**
 * Registra un observer que recibe los datos del usuario autenticado cada vez que cambian.
 * Notifica inmediatamente con el estado actual al suscribirse.
 * 
 * @param {(userData: {id: null|string, email: null|string}) => void} observer
 */
export function subscribeToAuthStateChanges(observer) {
    observers.push(observer);

    notify(observer);
}

function notify(observer) {
    observer({...userData});
}

function notifyAll() {
    observers.forEach(observer => notify(observer));
}
