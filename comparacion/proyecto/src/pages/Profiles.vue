<script>
import BaseH1 from '../components/BaseH1.vue';
import { fetchAllProfiles } from '../services/profile.js';

export default {
    name: 'Profiles',
    components: { BaseH1 },
    data() {
        return {
            profiles: [],
            loading: true,
        }
    },
    async mounted() {
        this.profiles = await fetchAllProfiles();
        this.loading = false;
    },
}
</script>

<template>
    <div>
    <BaseH1>Cafeteros</BaseH1>

    <div v-if="loading" class="flex items-center gap-3 text-crema-muted py-8">
        <span class="loading-spinner"></span>
        <span class="font-mono text-xs tracking-widest uppercase">Cargando cafeteros...</span>
    </div>

    <ol v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <li
            v-for="profile in profiles"
            :key="profile.user_id"
            class="card flex flex-col gap-2"
        >
            <h2 class="font-serif font-bold text-lg" style="color:#3E1C00;">{{ profile.username || 'Sin nombre' }}</h2>
            <p class="text-sm flex-1" style="color:#7B4A1E;">{{ profile.bio || 'Sin bio.' }}</p>
            <p class="text-xs font-mono text-[#9B6535]">
                ☕ {{ profile.favorite_preparation || 'Sin.' }}
            </p>
            <RouterLink
                :to="'/perfil/' + profile.user_id"
                class="btn-secondary text-sm mt-2"
                style="border-color:rgba(123,74,30,.3); color:#7B4A1E;"
            >
                Ver perfil
            </RouterLink>
        </li>
    </ol>
    </div>
</template>

