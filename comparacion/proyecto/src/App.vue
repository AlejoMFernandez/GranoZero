<script>
import { logout, subscribeToAuthStateChanges } from './services/auth';

export default {
    name: 'App',
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
        }
    },
    methods: {
        async handleLogout() {
            logout();
        },
    },
    mounted() {
        subscribeToAuthStateChanges(newUserData => this.user = newUserData);
    }
}
</script>

<template>
    <nav class="flex items-center gap-6 px-8 py-4 bg-cafe-medio/95 border-b border-cafe-borde sticky top-0 z-40 shadow-lg shadow-black/40">
        <RouterLink class="flex items-center gap-2 shrink-0" to="/">
            <img src="/logo.png" alt="GranoZero" class="h-8 w-8">
            <span class="text-xl font-serif text-dorado font-bold tracking-wide">GranoZero</span>
        </RouterLink>
        <ul class="flex gap-6 items-center flex-1">
            <li>
                <RouterLink to="/" class="text-sm hover:text-dorado transition-colors">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/chat" class="text-sm hover:text-dorado transition-colors">Chat</RouterLink>
            </li>
            <li>
                <RouterLink to="/posts" class="text-sm hover:text-dorado transition-colors">Posteos</RouterLink>
            </li>
            <li>
                <RouterLink to="/cafeteros" class="text-sm hover:text-dorado transition-colors">Cafeteros</RouterLink>
            </li>
            <li v-if="user.id">
                <RouterLink :to="'/perfil/' + user.id" class="text-sm hover:text-dorado transition-colors">Mi perfil</RouterLink>
            </li>
        </ul>
        <div class="flex items-center gap-4">
            <template v-if="!user.id">
                <RouterLink to="/ingresar" class="text-sm hover:text-dorado transition-colors">Ingresar</RouterLink>
                <RouterLink to="/crear-cuenta" class="btn-primary text-sm">Crear cuenta</RouterLink>
            </template>
            <template v-if="user.id">
                <span class="text-xs text-crema-muted font-mono hidden sm:block">{{ user.email }}</span>
                <form action="#" @submit.prevent="handleLogout">
                    <button type="submit" class="btn-secondary text-sm">Salir</button>
                </form>
            </template>
        </div>
    </nav>
    <main class="container px-6 py-8 mx-auto max-w-5xl">
        <RouterView></RouterView>
    </main>
    <footer class="flex flex-col justify-center items-center h-20 bg-cafe-oscuro border-t border-cafe-borde gap-1">
        <img src="/logo.png" alt="" class="h-6 w-6 opacity-50 mb-1">
        <p class="text-xs text-crema-muted font-mono tracking-widest">GRANO ZERO &copy; 2026</p>
        <p class="text-xs text-cafe-borde font-mono">Red social del buen café</p>
    </footer>
</template>
