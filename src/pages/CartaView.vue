<script setup>
import { ref, computed } from 'vue'
import { cafes }     from '../data/cafes.js'
import CafeCard      from '../components/CafeCard.vue'
import CafeModal     from '../components/CafeModal.vue'
import SiteFooter    from '../components/SiteFooter.vue'
import { useFavoritos } from '../composables/useFavoritos'

const selectedCafe = ref(null)
const { favoritos, toggle, esFavorito } = useFavoritos()

// Filtro: todos o solo favoritos
const soloFavoritos = ref(false)

const cafesVisibles = computed(() =>
  soloFavoritos.value ? cafes.filter(c => esFavorito(c.id)) : cafes
)
</script>

<template>
  <div class="carta-page">

    <header class="carta-header section">
      <span v-reveal class="eyebrow">La carta completa</span>
      <h1 v-reveal class="sec-title">Cada café, una historia.</h1>
      <p v-reveal class="sec-sub">
        Los diez tipos de café — tocá cualquiera para ver todos los detalles.<br>
        Guardá los que te gustan con ♥ para encontrarlos rápido.
      </p>

      <!-- Filtros -->
      <div v-reveal class="carta-filtros">
        <button
          class="filtro-btn"
          :class="{ activo: !soloFavoritos }"
          @click="soloFavoritos = false"
        >
          Todos ({{ cafes.length }})
        </button>
        <button
          class="filtro-btn"
          :class="{ activo: soloFavoritos }"
          @click="soloFavoritos = true"
        >
          ♥ Favoritos ({{ favoritos.length }})
        </button>
      </div>
    </header>

    <!-- Grid de cafés -->
    <Transition name="fade" mode="out-in">
      <div v-if="cafesVisibles.length > 0" :key="soloFavoritos ? 'fav' : 'all'" class="carta-grid">
        <CafeCard
          v-for="cafe in cafesVisibles"
          :key="cafe.id"
          :cafe="cafe"
          :mostrar-favorito="true"
          :es-favorito="esFavorito(cafe.id)"
          v-reveal
          @select="selectedCafe = $event"
          @toggle-favorito="toggle"
        />
      </div>

      <!-- Sin favoritos -->
      <div v-else key="vacio" class="carta-vacia">
        <p>Todavía no tenés favoritos.<br>Tocá ♡ en cualquier café para agregarlo.</p>
      </div>
    </Transition>

  </div>

  <SiteFooter />

  <CafeModal :cafe="selectedCafe" @close="selectedCafe = null" />
</template>

<style scoped>
.carta-page {
  background: rgba(0,0,0,.14);
  padding-bottom: 80px;
}

.carta-header { padding-bottom: 48px; }

/* ── Filtros ─────────────────────────────────────────── */
.carta-filtros {
  display: flex; gap: 10px;
  margin-top: 28px;
}
.filtro-btn {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid var(--line); color: var(--dim);
  background: transparent; padding: 8px 16px;
  transition: border-color .2s, color .2s, background .2s;
}
.filtro-btn:hover     { border-color: rgba(250,247,240,.3); color: var(--cream); }
.filtro-btn.activo    { border-color: var(--gold); color: var(--gold); background: rgba(184,130,10,.07); }

/* ── Grid ───────────────────────────────────────────── */
.carta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(252px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  margin: 0 9vw;
}

/* ── Estado vacío ───────────────────────────────────── */
.carta-vacia {
  margin: 0 9vw 80px;
  padding: 56px 36px;
  border: 1px solid var(--line);
  text-align: center;
}
.carta-vacia p {
  font-size: 15px; font-weight: 300;
  color: var(--dim); line-height: 1.7;
  font-style: italic;
}

/* ── Transición ─────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

@media (max-width: 640px) {
  .carta-grid    { grid-template-columns: 1fr; margin: 0; }
  .carta-vacia   { margin: 0 0 60px; }
  .carta-filtros { flex-wrap: wrap; }
}
</style>
