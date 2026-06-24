<script setup>
import { ref } from 'vue'
import { cafes } from '../data/cafes.js'
import CafeCard  from './CafeCard.vue'
import CafeModal from './CafeModal.vue'

const selectedCafe = ref(null)

// Selección manual para la landing — variedad de intensidades
const preview = cafes.filter(c => ['espresso', 'ristretto', 'latte'].includes(c.id))
</script>

<template>
  <section id="carta" class="section cafe-section">
    <div class="section-header">
      <span class="eyebrow">La carta</span>
      <h2 class="sec-title">Cada café, una historia.</h2>
      <p class="sec-sub">
        Desde el ristretto más intenso hasta el latte más suave — tocá cualquier café para ver todos los detalles.
      </p>
    </div>

    <!-- 3 cafés de preview -->
    <div class="cafe-grid">
      <CafeCard
        v-for="cafe in preview"
        :key="cafe.id"
        :cafe="cafe"
       
        @select="selectedCafe = $event"
      />
    </div>

    <!-- Link a la carta completa -->
    <div class="carta-cta">
      <RouterLink to="/carta" class="btn">
        Ver los {{ cafes.length }} cafés →
      </RouterLink>
      <span class="carta-cta-sub">Espresso · Cappuccino · Latte · Americano y más</span>
    </div>
  </section>

  <CafeModal :cafe="selectedCafe" @close="selectedCafe = null" />
</template>

<style scoped>
.cafe-section { background: rgba(0,0,0,.14); }

.section-header { margin-bottom: 56px; }

.cafe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  margin-bottom: 36px;
}

/* ── CTA ────────────────────────────────────────────── */
.carta-cta {
  display: flex; align-items: center; gap: 24px;
}
.carta-cta-sub {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim);
}

@media (max-width: 900px) {
  .cafe-grid { grid-template-columns: 1fr; }
  .carta-cta { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>
