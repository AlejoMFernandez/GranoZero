<script>
import BaseH1 from '../components/BaseH1.vue';

export default {
    name: 'Home',
    components: { BaseH1 },
}
</script>

<template>
    <div class="py-8">
        <BaseH1>Bienvenidos</BaseH1>
        <h2 class="font-serif text-xl font-medium text-crema-muted mb-3">Red social del buen café</h2>
        <p class="text-crema-muted text-base max-w-xl leading-relaxed mb-10">
            Compartí preparaciones, opiniones y el ritual de cada taza.
        </p>
        <div class="flex gap-4">
            <RouterLink to="/posts" class="btn-primary">Ver reseñas</RouterLink>
            <RouterLink to="/chat" class="btn-secondary">Ir al chat</RouterLink>
        </div>
    </div>
</template>
