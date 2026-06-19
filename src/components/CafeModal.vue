<script setup>
import { onMounted, onUnmounted } from 'vue'
import BeanIcon from './BeanIcon.vue'
import IntensityScale from './IntensityScale.vue'

const props = defineProps({
  cafe: { type: Object, default: null },
})
const emit = defineEmits(['close'])

// Cerrar con Escape
function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}
onMounted(()  => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// Bloquear scroll del body cuando el modal está abierto
import { watch } from 'vue'
watch(() => props.cafe, val => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="cafe" class="overlay" @click.self="emit('close')">
        <div class="modal" role="dialog" :aria-label="cafe.name">

          <!-- Header -->
          <div class="modal-header">
            <div class="modal-meta">
              <span class="modal-tag">{{ cafe.tag }}</span>
              <span class="modal-origin">{{ cafe.origin }}</span>
            </div>
            <button class="close-btn" @click="emit('close')" aria-label="Cerrar">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- Hero del modal -->
          <div class="modal-hero">
            <div class="modal-bean" aria-hidden="true">
              <BeanIcon :size="80" color="#B8820A" :stroke="2.5" />
            </div>
            <h2 class="modal-name">{{ cafe.name }}</h2>
          </div>

          <div class="modal-divider"></div>

          <!-- Descripción completa -->
          <p class="modal-desc">{{ cafe.fullDesc }}</p>

          <!-- Specs -->
          <div class="specs-grid">
            <div v-for="(val, key) in cafe.specs" :key="key" class="spec-item">
              <span class="spec-label">{{ key }}</span>
              <span class="spec-val">{{ val }}</span>
            </div>
          </div>

          <!-- Intensidad -->
          <div class="intensidad-block">
            <span class="block-eyebrow">Intensidad</span>
            <IntensityScale :value="cafe.intensity" />
          </div>

          <!-- Perfil de sabor -->
          <div class="profile-block">
            <span class="block-eyebrow">Perfil de sabor</span>
            <div class="flavor-bars">
              <div v-for="(val, key) in cafe.flavorProfile" :key="key" class="flavor-row">
                <span class="flavor-label">{{ key }}</span>
                <div class="bar-track">
                  <div class="bar-fill" :style="{ width: (val / 5 * 100) + '%' }"></div>
                </div>
                <span class="flavor-val">{{ val }}/5</span>
              </div>
            </div>
          </div>

          <!-- Notas -->
          <div class="notes-block">
            <span class="block-eyebrow">Notas</span>
            <div class="notes-pills">
              <span v-for="note in cafe.notes" :key="note" class="note-pill">{{ note }}</span>
            </div>
          </div>

          <!-- Preparación -->
          <div class="steps-block">
            <span class="block-eyebrow">Preparación</span>
            <ol class="steps-list">
              <li v-for="(step, i) in cafe.steps" :key="i" class="step-item">
                <span class="step-num">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="step-text">{{ step }}</span>
              </li>
            </ol>
          </div>

          <!-- Maridaje -->
          <div class="pairing-block">
            <span class="block-eyebrow">Maridaje</span>
            <p class="pairing-text">"{{ cafe.pairing }}"</p>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── OVERLAY ──────────────────────────────────────────── */
.overlay {
  position: fixed; inset: 0; z-index: 500;
  background: rgba(20, 8, 0, .82);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  overflow-y: auto;
}

/* ── MODAL CARD ───────────────────────────────────────── */
.modal {
  background: #2a1200;
  border: 1px solid rgba(184,130,10,.22);
  width: 100%; max-width: 680px;
  padding: 44px 48px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--caramel) transparent;
}

/* ── HEADER ───────────────────────────────────────────── */
.modal-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 32px;
}
.modal-meta {
  display: flex; flex-direction: column; gap: 4px;
}
.modal-tag {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--gold);
}
.modal-origin {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1px;
  color: var(--dim);
}
.close-btn {
  background: transparent; border: none;
  color: var(--dim); padding: 4px;
  transition: color .2s;
}
.close-btn:hover { color: var(--cream); }

/* ── HERO ─────────────────────────────────────────────── */
.modal-hero {
  display: flex; align-items: center; gap: 24px;
  margin-bottom: 28px;
}
.modal-bean { opacity: .7; flex-shrink: 0; }
.modal-name {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 52px; line-height: 1;
  color: var(--cream);
}

/* ── DIVIDER ──────────────────────────────────────────── */
.modal-divider {
  width: 48px; height: 1px;
  background: rgba(184,130,10,.4);
  margin-bottom: 24px;
}

/* ── DESCRIPCIÓN ─────────────────────────────────────── */
.modal-desc {
  font-size: 16px; font-weight: 300; line-height: 1.75;
  color: var(--mid); margin-bottom: 36px;
}

/* ── SPECS GRID ───────────────────────────────────────── */
.specs-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1px; background: var(--line);
  border: 1px solid var(--line);
  margin-bottom: 36px;
}
.spec-item {
  background: rgba(62,28,0,.6);
  padding: 16px 18px;
  display: flex; flex-direction: column; gap: 6px;
}
.spec-label {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold);
}
.spec-val {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 500;
  color: var(--cream);
}

/* ── BLOQUES COMUNES ──────────────────────────────────── */
.block-eyebrow {
  display: block;
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--gold); margin-bottom: 16px;
}

/* ── FLAVOR BARS ──────────────────────────────────────── */
.intensidad-block, .profile-block, .notes-block, .steps-block, .pairing-block {
  margin-bottom: 32px;
}
.flavor-bars { display: flex; flex-direction: column; gap: 12px; }
.flavor-row  { display: flex; align-items: center; gap: 14px; }
.flavor-label {
  font-size: 12px; font-weight: 400;
  color: var(--mid); width: 60px; flex-shrink: 0;
}
.bar-track {
  flex: 1; height: 2px;
  background: rgba(250,247,240,.1);
  border-radius: 1px; overflow: hidden;
}
.bar-fill {
  height: 100%; background: var(--gold);
  border-radius: 1px;
  transition: width .6s cubic-bezier(.25,.46,.45,.94);
}
.flavor-val {
  font-family: 'Space Mono', monospace;
  font-size: 9px; color: var(--dim); width: 28px; text-align: right;
}

/* ── NOTAS ────────────────────────────────────────────── */
.notes-pills { display: flex; gap: 8px; flex-wrap: wrap; }
.note-pill {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim); border: 1px solid var(--line);
  padding: 5px 13px;
}

/* ── STEPS ────────────────────────────────────────────── */
.steps-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.step-item  { display: flex; gap: 16px; align-items: flex-start; }
.step-num {
  font-family: 'Space Mono', monospace;
  font-size: 11px; color: var(--gold);
  flex-shrink: 0; padding-top: 2px;
}
.step-text {
  font-size: 14.5px; font-weight: 300;
  color: var(--mid); line-height: 1.6;
}

/* ── MARIDAJE ─────────────────────────────────────────── */
.pairing-text {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 17px;
  color: rgba(250,247,240,.5); line-height: 1.65;
}

/* ── TRANSICIÓN ───────────────────────────────────────── */
.modal-enter-active { transition: opacity .3s ease; }
.modal-leave-active { transition: opacity .25s ease; }
.modal-enter-active .modal { transition: transform .35s cubic-bezier(.25,.46,.45,.94), opacity .35s ease; }
.modal-leave-active .modal  { transition: transform .25s ease, opacity .25s ease; }
.modal-enter-from            { opacity: 0; }
.modal-leave-to              { opacity: 0; }
.modal-enter-from .modal    { transform: translateY(28px); opacity: 0; }
.modal-leave-to   .modal    { transform: translateY(12px); opacity: 0; }

/* ── MOBILE ───────────────────────────────────────────── */
@media (max-width: 640px) {
  .overlay  { padding: 0; align-items: flex-end; }
  .modal    { max-height: 92vh; padding: 32px 24px; max-width: 100%; border-bottom: none; }
  .modal-name { font-size: 38px; }
  .specs-grid { grid-template-columns: repeat(2, 1fr); }
  .modal-enter-from .modal { transform: translateY(100%); }
  .modal-leave-to   .modal { transform: translateY(100%); }
}
</style>
