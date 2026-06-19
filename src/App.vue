<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import NavBar    from './components/NavBar.vue'
import AuthModal from './components/AuthModal.vue'
import QuizModal from './components/QuizModal.vue'

// ── Auth ─────────────────────────────────────────────
const auth     = useAuthStore()
const showAuth = ref(false)
const authMode = ref('login')   // 'login' | 'register'

function openAuth(mode = 'login') {
  authMode.value = mode
  showAuth.value  = true
}

// ── Quiz (modal global, accesible desde NavBar y páginas) ──
const quizAbierto = ref(false)

onMounted(() => auth.init())

// ── Cursor personalizado ─────────────────────────────
const cursor = ref(null)
onMounted(() => {
  document.addEventListener('mousemove', e => {
    if (!cursor.value) return
    cursor.value.style.left = e.clientX + 'px'
    cursor.value.style.top  = e.clientY + 'px'
  })
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button')) document.body.classList.add('hz')
  })
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button')) document.body.classList.remove('hz')
  })
})
</script>

<template>
  <div ref="cursor" id="cursor" aria-hidden="true"></div>

  <NavBar
    @open-auth="openAuth"
    @open-quiz="quizAbierto = true"
  />

  <!-- v-slot permite que las páginas emitan 'open-auth' y 'open-quiz' -->
  <RouterView v-slot="{ Component }">
    <component
      :is="Component"
      @open-auth="openAuth"
      @open-quiz="quizAbierto = true"
    />
  </RouterView>

  <!-- Modales globales -->
  <AuthModal
    v-if="showAuth"
    :mode="authMode"
    @close="showAuth = false"
  />

  <QuizModal
    :show="quizAbierto"
    @close="quizAbierto = false"
  />

  <!-- Botón flotante Quiz -->
  <button class="quiz-fab" @click="quizAbierto = true" aria-label="Abrir quiz">
    <img src="/logofinal.png" class="fab-logo" alt="" />
    <span class="fab-star">✦</span>
  </button>
</template>

<style>
.quiz-fab {
  position: fixed;
  bottom: 28px; right: 28px;
  z-index: 250;
  width: 52px; height: 52px;
  border-radius: 50%;
  background: var(--gold);
  border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,.45);
  transition: transform .2s, box-shadow .2s;
}
.quiz-fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 28px rgba(184,130,10,.45);
}
.fab-logo {
  width: 26px; height: 26px; object-fit: contain;
  position: absolute;
  transition: opacity .2s;
}
.fab-star {
  font-size: 22px; color: var(--brown);
  position: absolute;
  opacity: 0;
  transition: opacity .2s;
}
.quiz-fab:hover .fab-logo { opacity: 0; }
.quiz-fab:hover .fab-star { opacity: 1; }

@media (max-width: 640px) {
  .quiz-fab { bottom: 20px; right: 20px; width: 48px; height: 48px; }
  .fab-logo  { width: 22px; height: 22px; }
}
</style>
