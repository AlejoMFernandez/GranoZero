<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="section precios-cta-section">
    <div class="precios-cta-inner">

      <!-- Texto izquierda -->
      <div class="precios-cta-texto">
        <span v-reveal class="eyebrow">Planes</span>
        <h2 v-reveal class="precios-cta-titulo">
          ¿Querés tener<br><em>privilegios</em>?
        </h2>
        <p v-reveal class="precios-cta-sub">
          La información siempre es libre.<br>
          Las herramientas para ir más lejos son para los que se toman el café en serio.
        </p>
      </div>

      <!-- Derecha: lista rápida + CTA -->
      <div v-reveal class="precios-cta-derecha">
        <ul class="precios-cta-lista">
          <li><span class="item-check">✓</span> Carta completa de cafés</li>
          <li><span class="item-check">✓</span> Mapa de orígenes</li>
          <li><span class="item-check">✓</span> Glosario de 20 términos</li>
          <li class="gold"><span class="item-check">✦</span> Timer de extracción</li>
          <li class="gold"><span class="item-check">✦</span> Calculadora de ratio</li>
          <li class="gold"><span class="item-check">✦</span> Notas de cata personales</li>
        </ul>

        <RouterLink to="/precios" class="btn-ver-planes">
          Ver los planes →
        </RouterLink>
        <span class="precios-cta-desde">Desde gratis</span>
      </div>

    </div>
  </section>
</template>

<style scoped>
.precios-cta-section {
  background: rgba(20,8,0,.35);
  border-top: 1px solid var(--line);
}

.precios-cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 64px;
}

/* ── Texto ───────────────────────────────────────────── */
.precios-cta-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 44px; line-height: 1.15;
  color: var(--cream); margin-bottom: 16px;
}
.precios-cta-titulo em { font-style: italic; color: var(--gold); }

.precios-cta-sub {
  font-size: 16px; font-weight: 300; line-height: 1.65;
  color: var(--mid); max-width: 380px;
}

/* ── Derecha ─────────────────────────────────────────── */
.precios-cta-derecha {
  display: flex; flex-direction: column;
  align-items: flex-start; gap: 24px;
  flex-shrink: 0; min-width: 260px;
}

.precios-cta-lista {
  list-style: none;
  display: flex; flex-direction: column; gap: 10px;
}
.precios-cta-lista li {
  display: flex; gap: 10px;
  font-size: 13.5px; font-weight: 300;
  color: var(--mid);
}
.precios-cta-lista li.gold { color: var(--gold); }
.item-check {
  font-family: 'Space Mono', monospace;
  font-size: 10px; color: var(--gold);
  min-width: 12px; margin-top: 2px;
}
.precios-cta-lista li.gold .item-check { color: var(--gold); }

.btn-ver-planes {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
  border: 1px solid var(--gold); color: var(--gold);
  background: transparent; padding: 13px 28px;
  transition: background .22s, color .22s;
}
.btn-ver-planes:hover { background: var(--gold); color: var(--brown); }

.precios-cta-desde {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 900px) {
  .precios-cta-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
  }
  .precios-cta-titulo { font-size: 36px; }
}
@media (max-width: 640px) {
  .precios-cta-titulo { font-size: 28px; }
}
</style>
