<script setup>
import { ref } from 'vue'
import { origenes } from '../data/origenes.js'
import SiteFooter from '../components/SiteFooter.vue'

// Las formas geográficas del mundo (mismas que MapaMundi.vue)
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

const activo = ref(null)
function togglePopup(origen) {
  activo.value = activo.value?.id === origen.id ? null : origen
}
function cerrar() { activo.value = null }
</script>

<template>
  <div class="mapa-page">

    <!-- Header -->
    <header class="section mapa-header">
      <span v-reveal class="eyebrow">Orígenes cafeteros</span>
      <h1 v-reveal class="sec-title">De dónde viene<br>el grano.</h1>
      <p v-reveal class="sec-sub">
        Cada punto es una región productora. Tocá cualquiera para ver el perfil de sabor,
        la altitud y el proceso de ese origen.
      </p>
    </header>

    <!-- Mapa interactivo -->
    <div class="section" style="padding-top:0">
      <div class="mapa-wrap">
        <svg viewBox="0 0 1000 500" class="mapa-svg" aria-label="Mapa de orígenes cafeteros">

          <polygon
            v-for="t in tierras"
            :key="t.id"
            :points="t.puntos"
            class="tierra"
          />

          <g
            v-for="o in origenes"
            :key="o.id"
            class="origen-grupo"
            @click="togglePopup(o)"
          >
            <circle :cx="o.x" :cy="o.y" r="12" class="origen-ring" :class="{ activo: activo?.id === o.id }" />
            <circle :cx="o.x" :cy="o.y" r="4"  class="origen-dot"  :class="{ activo: activo?.id === o.id }" />
          </g>

        </svg>

        <!-- Popup de detalle -->
        <Transition name="popup">
          <div v-if="activo" class="popup">
            <button class="popup-close" @click="cerrar" aria-label="Cerrar">✕</button>
            <div class="popup-header">
              <span class="popup-region">{{ activo.region }}</span>
              <p class="popup-pais">{{ activo.pais }}</p>
            </div>
            <p class="popup-desc">{{ activo.desc }}</p>
            <div class="popup-datos">
              <div class="dato">
                <span class="dato-label">Altitud</span>
                <span class="dato-val">{{ activo.altitud }}</span>
              </div>
              <div class="dato">
                <span class="dato-label">Proceso</span>
                <span class="dato-val">{{ activo.proceso }}</span>
              </div>
            </div>
            <div class="popup-notas">
              <span v-for="n in activo.notas" :key="n" class="nota-pill">{{ n }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Cards de todos los orígenes -->
    <div class="section origenes-lista" style="padding-top:0">
      <h2 v-reveal class="lista-titulo">Los {{ origenes.length }} orígenes</h2>

      <div class="origenes-grid">
        <article
          v-for="o in origenes"
          :key="o.id"
          v-reveal
          class="origen-card"
          @click="togglePopup(o)"
          :class="{ activo: activo?.id === o.id }"
        >
          <div class="origen-card-header">
            <span class="origen-region">{{ o.region }}</span>
            <h3 class="origen-pais">{{ o.pais }}</h3>
          </div>
          <p class="origen-desc">{{ o.desc }}</p>
          <div class="origen-datos">
            <span class="origen-dato">{{ o.altitud }}</span>
            <span class="origen-dato">{{ o.proceso }}</span>
          </div>
          <div class="origen-notas">
            <span v-for="n in o.notas" :key="n" class="nota-pill">{{ n }}</span>
          </div>
        </article>
      </div>
    </div>

  </div>
  <SiteFooter />
</template>

<style scoped>
.mapa-page { min-height: 100vh; }

/* ── Mapa ────────────────────────────────────────────── */
.mapa-wrap { position: relative; margin-bottom: 0; }

.mapa-svg {
  width: 100%; height: auto; display: block;
  background: rgba(184,130,10,.03);
  border: 1px solid var(--line);
}

.tierra {
  fill: rgba(184,130,10,.16);
  stroke: rgba(184,130,10,.28);
  stroke-width: 0.8; stroke-linejoin: round;
}

.origen-grupo { cursor: pointer; }

.origen-ring {
  fill: rgba(184,130,10,.1);
  stroke: rgba(184,130,10,.35); stroke-width: 1;
  transform-box: fill-box; transform-origin: center;
  animation: pulso 2.4s ease-in-out infinite;
  transition: fill .2s, stroke .2s;
}
.origen-ring.activo {
  fill: rgba(184,130,10,.22); stroke: var(--gold); animation: none;
}
.origen-dot {
  fill: var(--gold); opacity: .8; transition: opacity .2s;
}
.origen-dot.activo { opacity: 1; }

@keyframes pulso {
  0%, 100% { transform: scale(1);    opacity: .6; }
  50%       { transform: scale(1.4); opacity: .2; }
}

/* ── Popup ───────────────────────────────────────────── */
.popup {
  position: absolute; top: 20px; right: 20px;
  width: 280px; background: #2a1200;
  border: 1px solid rgba(184,130,10,.25);
  padding: 22px 22px 20px; z-index: 10;
}
.popup-close {
  position: absolute; top: 10px; right: 12px;
  background: none; border: none;
  color: var(--dim); font-size: 12px; transition: color .2s;
}
.popup-close:hover { color: var(--cream); }
.popup-header { margin-bottom: 12px; }
.popup-region {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold); display: block; margin-bottom: 4px;
}
.popup-pais {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 24px; color: var(--cream);
}
.popup-desc {
  font-size: 12.5px; font-weight: 300; line-height: 1.6;
  color: var(--mid); margin-bottom: 16px;
}
.popup-datos {
  display: flex; gap: 16px; margin-bottom: 14px;
  border-top: 1px solid var(--line); padding-top: 14px;
}
.dato { display: flex; flex-direction: column; gap: 3px; }
.dato-label {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}
.dato-val { font-size: 12px; color: var(--mid); }
.popup-notas { display: flex; gap: 6px; flex-wrap: wrap; }

.popup-enter-active, .popup-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}
.popup-enter-from { opacity: 0; transform: translateY(-6px); }
.popup-leave-to   { opacity: 0; transform: translateY(-6px); }

/* ── Lista de orígenes ───────────────────────────────── */
.lista-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 28px; color: var(--cream); margin-bottom: 32px;
}

.origenes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.origen-card {
  background: var(--brown);
  padding: 26px 24px;
  cursor: pointer;
  transition: background .2s;
  display: flex; flex-direction: column; gap: 12px;
}
.origen-card:hover,
.origen-card.activo { background: rgba(184,130,10,.06); }

.origen-region {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold); display: block; margin-bottom: 4px;
}
.origen-pais {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--cream);
}
.origen-desc {
  font-size: 13px; font-weight: 300; line-height: 1.65; color: var(--mid);
}
.origen-datos {
  display: flex; gap: 12px; flex-wrap: wrap;
}
.origen-dato {
  font-size: 11px; color: var(--dim);
  border: 1px solid var(--line); padding: 3px 10px;
}
.origen-notas { display: flex; gap: 6px; flex-wrap: wrap; }
.nota-pill {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 1px; text-transform: uppercase;
  color: var(--dim); border: 1px solid var(--line); padding: 3px 8px;
}

@media (max-width: 640px) {
  .popup {
    position: fixed; top: auto; right: 0; bottom: 0; left: 0;
    width: 100%; border-left: none; border-right: none; border-bottom: none;
  }
  .origenes-grid { grid-template-columns: 1fr; }
}
</style>
