<script setup>
import { origenes } from '../data/origenes.js'

// Las formas geográficas del mundo (proyección equirectangular)
const tierras = [
  { id: 'norteamerica', puntos: '50,78 68,53 125,52 210,62 278,72 355,103 330,128 306,133 289,153 278,183 272,175 253,169 231,178 231,190 258,193 252,208 280,225 244,210 208,194 194,186 175,158 161,147 156,125 128,92 78,89' },
  { id: 'suramerica',   puntos: '280,225 320,215 335,228 403,264 397,278 392,314 355,344 320,394 311,403 292,389 289,330 278,250 286,240' },
  { id: 'groenlandia',  puntos: '356,83 383,83 444,39 389,19 319,39' },
  { id: 'europa',       puntos: '475,147 494,150 508,131 522,128 536,125 561,147 572,139 597,122 617,119 631,114 661,100 667,56 578,53 514,78 522,89 525,94 522,100 511,106 500,108 486,114 475,131' },
  { id: 'reino-unido',  puntos: '486,111 503,108 497,97 489,92 483,94 478,108' },
  { id: 'irlanda',      puntos: '478,103 472,106 472,100 478,97' },
  { id: 'africa',       puntos: '464,150 494,150 528,147 536,158 578,164 597,169 619,217 641,217 619,244 611,261 597,305 597,325 550,347 533,325 533,264 514,242 494,239 458,222 453,208 453,192' },
  { id: 'madagascar',   puntos: '633,283 639,295 633,319 622,322 622,295' },
  { id: 'asia',         puntos: '572,139 617,136 653,144 661,181 664,189 641,211 619,217 603,206 603,189 597,164 586,150 597,164 664,189 680,183 689,189 722,228 747,189 778,214 789,244 803,222 833,189 839,161 858,153 861,133 889,111 953,106 972,72 944,56 889,50 722,50 667,50 661,100 631,114 614,131' },
  { id: 'sumatra',      puntos: '764,238 792,236 811,272 789,272' },
  { id: 'borneo',       puntos: '803,231 828,233 825,261 803,264' },
  { id: 'peninsula-arabiga', puntos: '619,175 641,175 661,211 641,217 619,217' },
  { id: 'australia',    puntos: '817,311 864,283 903,281 917,319 919,344 903,356 819,339 817,328' },
]
</script>

<template>
  <section id="mapa" class="section mapa-section">

    <div class="mapa-header">
      <span v-reveal class="eyebrow">Orígenes</span>
      <h2 v-reveal class="sec-title">De dónde viene<br>el grano.</h2>
      <p v-reveal class="sec-sub">
        Cada punto es un origen cafetero. Hay {{ origenes.length }} regiones en la carta.
      </p>
    </div>

    <!-- SVG Mapa (solo puntos, sin popup) -->
    <div v-reveal class="mapa-wrap">
      <svg viewBox="0 0 1000 500" class="mapa-svg" aria-label="Mapa de orígenes cafeteros">

        <polygon
          v-for="t in tierras"
          :key="t.id"
          :points="t.puntos"
          class="tierra"
        />

        <!-- Logos animados — sin click, solo decorativos -->
        <g v-for="o in origenes" :key="o.id">
          <circle :cx="o.x" :cy="o.y" r="12" class="origen-ring" />
          <image
            href="/logofinal.png"
            :x="o.x - 7" :y="o.y - 7"
            width="14" height="14"
            class="origen-logo"
          />
        </g>

      </svg>
    </div>

    <!-- Botón a la página completa -->
    <div v-reveal class="mapa-cta">
      <RouterLink to="/mapa" class="btn">
        Explorar los {{ origenes.length }} orígenes →
      </RouterLink>
      <span class="mapa-cta-sub">Perfiles de sabor · Altitud · Procesos</span>
    </div>

  </section>
</template>

<style scoped>
.mapa-section { background: var(--brown); }
.mapa-header  { margin-bottom: 48px; }

.mapa-wrap { margin-bottom: 36px; }

.mapa-svg {
  width: 100%; height: auto; display: block;
  background: rgba(184,130,10,.03);
  border: 1px solid var(--line);
}

.tierra {
  fill: rgba(184,130,10,.16);
  stroke: rgba(184,130,10,.28);
  stroke-width: 0.8;
  stroke-linejoin: round;
}

.origen-ring {
  fill: rgba(184,130,10,.1);
  stroke: rgba(184,130,10,.35);
  stroke-width: 1;
  transform-box: fill-box;
  transform-origin: center;
  animation: pulso 2.4s ease-in-out infinite;
}

/* Logo GranoZero pintado en dorado */
.origen-logo {
  filter: sepia(1) saturate(8) brightness(0.85);
  opacity: .9;
}

@keyframes pulso {
  0%, 100% { transform: scale(1);    opacity: .6; }
  50%       { transform: scale(1.4); opacity: .2; }
}

/* ── CTA ────────────────────────────────────────────── */
.mapa-cta {
  display: flex; align-items: center; gap: 24px;
}
.mapa-cta-sub {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim);
}

@media (max-width: 640px) {
  .mapa-cta { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>
