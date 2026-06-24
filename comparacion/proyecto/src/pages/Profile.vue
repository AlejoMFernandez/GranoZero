<script>
import BaseH1 from '../components/BaseH1.vue';
import { subscribeToAuthStateChanges } from "../services/auth.js";
import { fetchUserProfile, updateUserProfile } from '../services/profile.js';
import { fetchUserPosts } from '../services/posts.js';

export default {
    name: 'Profile',
    components: { BaseH1 },
    data() {
        return {
            profile: null,
            loading: true,

            posts: [],

            authUser: {
                id: null,
                email: null,
            },

            showEditModal: false,

            editForm: {
                username: '',
                bio: '',
                favorite_preparation: '',
            },
        }
    },
    methods: {
        openEditModal() {
            this.editForm = { ...this.profile };
            this.showEditModal = true;
        },
        async handleSaveProfile() {
            await updateUserProfile({
                userId: this.authUser.id,
                profileData: this.editForm,
            });
            this.profile = { ...this.editForm };
            this.showEditModal = false;
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleString('es-AR', {
                day: '2-digit', month: 'short',
                hour: '2-digit', minute: '2-digit',
            });
        },
    },
    async mounted() {
        subscribeToAuthStateChanges(newUserData => this.authUser = newUserData);
        const [profile, posts] = await Promise.all([
            fetchUserProfile(this.$route.params.id),
            fetchUserPosts(this.$route.params.id),
        ]);
        this.profile = profile;
        this.posts = posts;
        this.loading = false;
    },
    unmounted() {

    },
}
</script>

<template>
    <div v-if="loading" class="flex items-center gap-3 text-crema-muted py-8">
        <span class="loading-spinner"></span>
        <span class="font-mono text-xs tracking-widest uppercase">Cargando perfil...</span>
    </div>

    <div v-else-if="profile">
        <!-- Header del perfil -->
        <section class="card mb-8">
            <div class="flex items-start gap-6">
                <!-- Avatar con inicial -->
                <div class="w-20 h-20 rounded-full bg-gz-coffee flex items-center justify-center text-3xl font-serif text-gz-paper shrink-0 border-4 border-gz-gold/20 select-none">
                    {{ profile.username ? profile.username[0].toUpperCase() : '?' }}
                </div>
                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <h1 class="font-serif text-3xl font-medium text-gz-ink mb-1 leading-tight">{{ profile.username || 'Sin nombre' }}</h1>
                    <p class="text-[#7B4A1E] mb-3 leading-relaxed">{{ profile.bio || 'Sin bio.' }}</p>
                    <p class="text-sm font-mono text-[#9B6535]">
                        ☕ Preparación favorita: <span class="font-semibold">{{ profile.favorite_preparation || 'Sin.' }}</span>
                    </p>
                    <button
                        v-if="authUser.id === $route.params.id"
                        @click="openEditModal"
                        class="mt-4 btn-primary !py-2 !px-5 !text-xs"
                        aria-label="Editar mi perfil"
                    >
                        Editar perfil
                    </button>
                </div>
            </div>
        </section>

        <!-- Lista de reseñas -->
        <section>
            <h2 class="font-serif text-xl mb-4 text-dorado">Reseñas</h2>
            <ol v-if="posts.length" class="flex flex-col gap-4 w-[640px]" aria-label="Publicaciones del usuario">
                <article
                    v-for="post in posts"
                    :key="post.id"
                    class="card"
                >
                    <p class="font-serif font-semibold text-gz-ink mb-1">{{ post.title }}</p>
                    <p class="mb-2 text-[#5C2A0E]">{{ post.body }}</p>
                    <span class="text-xs font-mono text-[#9B6535]">{{ formatDate(post.created_at) }}</span>
                </article>
            </ol>
            <p v-else class="font-mono text-sm text-crema-muted">Todavía no hay reseñas.</p>
        </section>

        <!-- Modal de edición -->
        <div
            v-if="showEditModal"
            class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
            <div class="bg-cafe-medio border border-cafe-borde rounded-lg p-6 w-full max-w-md">
                <h2 class="text-xl font-serif mb-5 text-dorado">Editar perfil</h2>
                <form action="#" @submit.prevent="handleSaveProfile">
                    <div class="mb-4">
                        <label for="username" class="form-label">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            class="input-field"
                            v-model="editForm.username"
                        >
                    </div>
                    <div class="mb-4">
                        <label for="bio" class="form-label">Bio</label>
                        <textarea
                            id="bio"
                            class="input-field"
                            rows="3"
                            v-model="editForm.bio"
                        ></textarea>
                    </div>
                    <div class="mb-5">
                        <label for="favorite_preparation" class="form-label">Preparación favorita</label>
                        <select
                            id="favorite_preparation"
                            class="input-field"
                            v-model="editForm.favorite_preparation"
                        >
                            <option value="espresso">Espresso</option>
                            <option value="ristretto">Ristretto</option>
                            <option value="americano">Americano</option>
                            <option value="cortado">Cortado</option>
                            <option value="cappuccino">Cappuccino</option>
                            <option value="flat white">Flat White</option>
                            <option value="latte">Latte</option>
                            <option value="mocha">Mocha</option>
                        </select>
                    </div>
                    <div class="flex gap-3 justify-end">
                        <button
                            type="button"
                            @click="showEditModal = false"
                            class="btn-secondary"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            class="btn-primary"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="font-mono text-sm text-crema-muted">No se encontró el perfil.</p>
    </div>
</template>
