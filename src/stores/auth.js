import { defineStore } from 'pinia'
import { ref }         from 'vue'
import {
    register   as svcRegister,
    login      as svcLogin,
    logout     as svcLogout,
    subscribeToAuthStateChanges,
} from '../services/auth'

export const useAuthStore = defineStore('auth', () => {
    const user    = ref({ id: null, email: null, username: null })
    const loading = ref(false)
    const error   = ref('')

    // Conectar el observer del servicio con el estado reactivo de Pinia
    function init() {
        subscribeToAuthStateChanges(newData => {
            user.value = newData
        })
    }

    async function register({ username, email, password, favorite_preparation }) {
        loading.value = true
        error.value   = ''
        try {
            await svcRegister({ username, email, password, favorite_preparation })
        } catch (e) {
            error.value = e?.message ?? 'Error al registrarse'
        } finally {
            loading.value = false
        }
    }

    async function login({ email, password }) {
        loading.value = true
        error.value   = ''
        try {
            await svcLogin({ email, password })
        } catch (e) {
            error.value = e?.message ?? 'Error al ingresar'
        } finally {
            loading.value = false
        }
    }

    async function logout() {
        await svcLogout()
    }

    return { user, loading, error, init, register, login, logout }
})
