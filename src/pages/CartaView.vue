<script>
import { cafes }  from '../data/cafes.js'
import CafeCard   from '../components/CafeCard.vue'
import CafeModal  from '../components/CafeModal.vue'
import SiteFooter from '../components/SiteFooter.vue'

export default {
  name: 'CartaView',
  components: { CafeCard, CafeModal, SiteFooter },
  data() {
    return {
      cafes,
      selectedCafe: null,
    }
  },
}
</script>

<template>
  <div class="carta-page">

    <header class="carta-header section">
      <span class="eyebrow">La carta completa</span>
      <h1 class="sec-title">Cada café, una historia.</h1>
      <p class="sec-sub">
        Los diez tipos de café — tocá cualquiera para ver todos los detalles.
      </p>
    </header>

    <div class="carta-grid">
      <CafeCard
        v-for="cafe in cafes"
        :key="cafe.id"
        :cafe="cafe"
        @select="selectedCafe = $event"
      />
    </div>

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

/* ── Grid ───────────────────────────────────────────── */
.carta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(252px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  margin: 0 9vw;
}

@media (max-width: 640px) {
  .carta-grid { grid-template-columns: 1fr; margin: 0; }
}
</style>
