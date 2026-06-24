<script>
import BaseH1 from '../components/BaseH1.vue';
import { subscribeToAuthStateChanges } from "../services/auth.js";
import { fetchAllPosts, createPost } from '../services/posts.js';
import { fetchAllProfiles } from '../services/profile.js';

export default {
    name: 'Posts',
    components: { BaseH1 },
    data() {
        return {
            posts: [],

            newPost: {
                title: '',
                body: '',
            },

            authUser: {
                id: null,
                email: null,
            },

            profilesMap: {},
            postError: null,
        }
    },
    methods: {
        async handleCreatePost() {
            this.postError = null;
            try {
                await createPost({
                    userId: this.authUser.id,
                    title: this.newPost.title,
                    body: this.newPost.body,
                });
                this.newPost.title = '';
                this.newPost.body = '';
                this.posts = await fetchAllPosts();
            } catch (error) {
                this.postError = 'No se pudo publicar. Intentá de nuevo.';
            }
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
        this.posts = await fetchAllPosts();
        const profiles = await fetchAllProfiles();
        profiles.forEach(p => this.profilesMap[p.user_id] = p.username);
    },
    unmounted() {
    },
}
</script>

<template>
    <div>
        <BaseH1>Publicaciones</BaseH1>

        <div class="flex gap-6">
            <section class="w-3/4">
                <ol class="flex flex-col gap-4" aria-label="Lista de publicaciones">
                    <article
                        v-for="post in posts"
                        :key="post.id"
                        class="card"
                    >
                        <h2 class="font-serif font-bold text-lg mb-1 text-dorado">{{ post.title }}</h2>
                        <p class="mb-3">{{ post.body }}</p>
                        <div class="flex justify-between text-xs text-crema-muted font-mono">
                            <span>{{ formatDate(post.created_at) }}</span>
                            <RouterLink :to="'/perfil/' + post.user_id" class="text-dorado hover:underline">{{ profilesMap[post.user_id] || 'Ver perfil' }}</RouterLink>
                        </div>
                    </article>
                </ol>
            </section>

            <section v-if="authUser.id" class="w-1/4">
                <h2 class="text-lg font-serif mb-4 text-dorado">Nueva publicación</h2>
                <form action="#" @submit.prevent="handleCreatePost" aria-label="Formulario de nueva publicación">
                    <p v-if="postError" role="alert" class="mb-3 text-sm text-red-400 font-mono">{{ postError }}</p>
                    <div class="mb-4">
                        <label for="title" class="form-label">Título</label>
                        <input
                            type="text"
                            id="title"
                            class="input-field"
                            v-model="newPost.title"
                        >
                    </div>
                    <div class="mb-4">
                        <label for="body" class="form-label">Contenido</label>
                        <textarea
                            id="body"
                            class="input-field"
                            rows="4"
                            v-model="newPost.body"
                        ></textarea>
                    </div>
                    <button type="submit" class="btn-primary w-full">Publicar</button>
                </form>
            </section>
        </div>
    </div>
</template>
