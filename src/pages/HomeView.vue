<script setup>
import HeroSection     from '../components/HeroSection.vue'
import CafeSection     from '../components/CafeSection.vue'
import GlosarioSection from '../components/GlosarioSection.vue'
import MarcaSection    from '../components/MarcaSection.vue'
import EventoSection   from '../components/EventoSection.vue'
import QuizCTA         from '../components/QuizCTA.vue'
import PreciosCTA      from '../components/PreciosCTA.vue'
import SiteFooter      from '../components/SiteFooter.vue'

// El QuizModal vive en App.vue — acá solo emitimos el evento hacia arriba
defineEmits(['open-auth', 'open-quiz'])
</script>

<template>
  <HeroSection />

  <!-- Contenido educativo primero -->
  <CafeSection />
  <!-- Identidad y comunidad -->
  <MarcaSection />
  <GlosarioSection />
  <EventoSection />

  <!-- Llamados a la acción -->
  <QuizCTA   @open-quiz="$emit('open-quiz')"          />
  <PreciosCTA @open-auth="$emit('open-auth', $event)" />

  <SiteFooter />
</template>
