<script setup>
const emit = defineEmits(['open-quiz'])
</script>

<template>
  <section class="section quiz-cta-section">
    <!-- Logo decorativo de fondo — como en las presentaciones -->
    <img src="/logofinal.png" class="quiz-bg-logo" aria-hidden="true" alt="" />
    <div class="quiz-cta-inner">
      <div class="quiz-cta-texto">
        <span class="eyebrow">El quiz</span>
        <h2 class="sec-title">¿Qué café sos?</h2>
        <p class="sec-sub">
          Cuatro preguntas. Una respuesta sobre vos.<br>
          Descubrí el café que refleja tu forma de tomar.
        </p>
      </div>

      <div class="quiz-cta-accion">
        <button class="btn btn-quiz" @click="$emit('open-quiz')">
          Descubrir mi café
        </button>
        <span class="quiz-cta-nota">Solo 4 preguntas</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quiz-cta-section {
  background: rgba(184,130,10,.06);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  position: relative;
  overflow: hidden;
}

/* Logo grande decorativo de fondo — idéntico al uso en presentaciones HTML */
.quiz-bg-logo {
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  width: 280px;
  opacity: .05;
  filter: sepia(1) saturate(6) brightness(1.1);
  pointer-events: none;
  user-select: none;
}

.quiz-cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.quiz-cta-accion {
  display: flex; flex-direction: column;
  align-items: flex-start; gap: 12px;
  flex-shrink: 0;
}

.btn-quiz {
  font-size: 11px; letter-spacing: 2.5px;
  white-space: nowrap;
}

.quiz-cta-nota {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 720px) {
  .quiz-cta-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }
}
</style>
