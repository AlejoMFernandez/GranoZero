<script setup>
import { ref } from 'vue'
import BeanIcon from './BeanIcon.vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const mostrarProximamente = ref(false)

const planes = [
  {
    id: 'explorador',
    nombre: 'Explorador',
    precio: 'Gratis',
    sub: 'Para siempre',
    destacado: false,
    items: [
      { texto: 'Carta completa de cafés',       incluido: true  },
      { texto: 'Quiz sensorial',                incluido: true  },
      { texto: 'Glosario de términos',          incluido: true  },
      { texto: 'Reseñas y chat',                incluido: false },
      { texto: 'Favoritos guardados',           incluido: false },
      { texto: 'Herramientas de barista',       incluido: false },
      { texto: 'Guías de preparación',          incluido: false },
    ],
    cta: 'Empezar gratis',
    gratis: true,
  },
  {
    id: 'entendido',
    nombre: 'Entendido',
    precio: '$4.99',
    sub: 'USD / mes',
    destacado: true,
    items: [
      { texto: 'Todo lo del plan Explorador',   incluido: true  },
      { texto: 'Reseñas y chat',                incluido: true  },
      { texto: 'Favoritos guardados',           incluido: true  },
      { texto: 'Timer de extracción',           incluido: true  },
      { texto: 'Calculadora de ratio',          incluido: true  },
      { texto: 'Notas de cata personales',      incluido: true  },
      { texto: 'Badge "Entendido" en el perfil', incluido: true },
      { texto: 'Guías de preparación',          incluido: false },
    ],
    cta: 'Quiero ser Entendido',
    gratis: false,
  },
  {
    id: 'experto',
    nombre: 'Experto',
    precio: '$9.99',
    sub: 'USD / mes',
    destacado: false,
    items: [
      { texto: 'Todo lo del plan Entendido',    incluido: true  },
      { texto: 'Guías avanzadas por método',    incluido: true  },
      { texto: 'Archivo de catas y perfiles',   incluido: true  },
      { texto: 'Badge "Experto" en el perfil',  incluido: true  },
      { texto: 'Acceso anticipado a novedades', incluido: true  },
      { texto: 'Soporte prioritario',           incluido: true  },
      { texto: 'Perfil destacado en comunidad', incluido: true  },
      { texto: 'Eventos exclusivos',            incluido: true, pronto: true },
    ],
    cta: 'Ser Experto',
    gratis: false,
  },
]

const emit = defineEmits(['open-auth'])

function clicarPlan(plan) {
  // Si está logueado y el plan tiene costo → mostrar "próximamente"
  if (auth.user.id && !plan.gratis) {
    mostrarProximamente.value = true
    return
  }
  // Si no está logueado → abrir modal de auth para que se registre
  emit('open-auth', 'register')
}
</script>

<template>
  <section id="precios" class="section precios-section">

    <!-- Header -->
    <div class="precios-header">
      <span class="eyebrow">Planes</span>
      <h2 class="sec-title">Empezá gratis.<br>Profundizá cuando quieras.</h2>
      <p class="sec-sub">
        La información siempre es libre. Las herramientas para ir más lejos son para los que se toman el café en serio.
      </p>
    </div>

    <!-- Cards de planes -->
    <div class="planes-grid">
      <div
        v-for="plan in planes"
        :key="plan.id"
       
        class="plan"
        :class="{ destacado: plan.destacado }"
      >
        <!-- Tag "Recomendado" -->
        <div v-if="plan.destacado" class="plan-tag">Recomendado</div>

        <!-- Nombre y precio -->
        <div class="plan-top">
          <BeanIcon :size="22" :color="plan.destacado ? '#B8820A' : '#FAF7F0'" :stroke="2.5" />
          <span class="plan-nombre">{{ plan.nombre }}</span>
        </div>
        <div class="plan-precio">
          <span class="plan-monto">{{ plan.precio }}</span>
          <span class="plan-sub">{{ plan.sub }}</span>
        </div>

        <div class="plan-linea"></div>

        <!-- Lista de features -->
        <ul class="plan-items">
          <li
            v-for="item in plan.items"
            :key="item.texto"
            :class="{ off: !item.incluido }"
          >
            <span class="item-icon">{{ item.incluido ? '✓' : '—' }}</span>
            <span>
              {{ item.texto }}
              <span v-if="item.pronto" class="pronto">Próximamente</span>
            </span>
          </li>
        </ul>

        <!-- CTA -->
        <button
          class="plan-cta"
          :class="{ 'plan-cta-gold': plan.destacado }"
          @click="clicarPlan(plan)"
        >
          {{ plan.cta }}
        </button>

      </div>
    </div>

  </section>

  <!-- Popup "Próximamente" -->
  <Teleport to="body">
    <div v-if="mostrarProximamente" class="prox-overlay" @click.self="mostrarProximamente = false">
        <div class="prox-modal">
          <img src="/logofinal.png" class="prox-logo" alt="GranoZero" />
          <h3 class="prox-titulo">Próximamente</h3>
          <p class="prox-sub">
            Los pagos están en preparación. Por ahora podés disfrutar de todo el contenido gratuito mientras tanto.
          </p>
          <button class="prox-btn" @click="mostrarProximamente = false">Entendido</button>
        </div>
      </div>
  </Teleport>
</template>

<style scoped>
.precios-section { background: rgba(0,0,0,.14); }
.precios-header  { margin-bottom: 52px; }

/* ── Grid de planes ─────────────────────────────────── */
.planes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  max-width: 1060px;
  background: var(--line);
  border: 1px solid var(--line);
}

/* ── Card de plan ───────────────────────────────────── */
.plan {
  background: var(--brown);
  padding: 36px 32px 32px;
  position: relative;
  transition: background .22s;
}
.plan:hover { background: rgba(184,130,10,.04); }

.plan.destacado {
  background: rgba(184,130,10,.07);
}
.plan.destacado:hover {
  background: rgba(184,130,10,.11);
}

.plan-tag {
  position: absolute; top: 0; right: 0;
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--brown); background: var(--gold);
  padding: 4px 10px;
}

/* ── Nombre ─────────────────────────────────────────── */
.plan-top {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px;
}
.plan-nombre {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--cream);
}

/* ── Precio ─────────────────────────────────────────── */
.plan-precio {
  display: flex; align-items: baseline; gap: 6px;
  margin-bottom: 24px;
}
.plan-monto {
  font-family: 'Playfair Display', serif;
  font-size: 40px; font-style: italic; color: var(--cream);
}
.plan-sub {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}

.plan-linea {
  height: 1px; background: var(--line);
  margin-bottom: 22px;
}

/* ── Items ──────────────────────────────────────────── */
.plan-items {
  list-style: none;
  display: flex; flex-direction: column; gap: 11px;
  margin-bottom: 28px;
}
.plan-items li {
  display: flex; gap: 10px; align-items: flex-start;
  font-size: 13.5px; font-weight: 300;
  color: var(--mid); line-height: 1.4;
}
.plan-items li.off { color: rgba(250,247,240,.2); }

.item-icon {
  font-family: 'Space Mono', monospace;
  font-size: 10px; color: var(--gold);
  min-width: 12px; margin-top: 2px;
}
.plan-items li.off .item-icon { color: rgba(250,247,240,.2); }

.pronto {
  display: inline-block; margin-left: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 7px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--gold); border: 1px solid rgba(184,130,10,.3);
  padding: 1px 5px; vertical-align: middle;
}

/* ── CTA ────────────────────────────────────────────── */
.plan-cta {
  width: 100%;
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid rgba(250,247,240,.18);
  color: var(--dim); background: transparent;
  padding: 13px; transition: border-color .2s, color .2s;
}
.plan-cta:hover {
  border-color: rgba(250,247,240,.45);
  color: var(--cream);
}
.plan-cta-gold {
  border-color: var(--gold);
  color: var(--gold);
}
.plan-cta-gold:hover {
  background: var(--gold);
  color: var(--brown);
}

/* ── Mobile ─────────────────────────────────────────── */
@media (max-width: 860px) {
  .planes-grid { grid-template-columns: 1fr; max-width: 100%; }
}

/* ── Popup Próximamente ─────────────────────────────── */
.prox-overlay {
  position: fixed; inset: 0; z-index: 900;
  background: rgba(0,0,0,.7);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

.prox-modal {
  background: #2a1200;
  border: 1px solid rgba(184,130,10,.25);
  max-width: 360px; width: 100%;
  padding: 40px 32px;
  text-align: center;
}

.prox-logo {
  display: block;
  width: 44px; height: 44px;
  object-fit: contain;
  margin: 0 auto 16px;
  opacity: .9;
}

.prox-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 26px; font-style: italic;
  color: var(--cream); margin-bottom: 14px;
}

.prox-sub {
  font-size: 14px; font-weight: 300; line-height: 1.6;
  color: var(--mid); margin-bottom: 28px;
}

.prox-btn {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  background: var(--gold); color: var(--brown);
  border: none; padding: 13px 32px;
  transition: opacity .2s;
}
.prox-btn:hover { opacity: .85; }

</style>
