<script setup>
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from './stores/auth'
  import NavBar    from './components/NavBar.vue'
  import AuthModal from './components/AuthModal.vue'
  import QuizModal from './components/QuizModal.vue'

  // authentication
  const auth     = useAuthStore()
  const showAuth = ref(false)
  const authMode = ref('login')

  function openAuth(mode = 'login') {
    authMode.value = mode
    showAuth.value  = true
  }

  // quiz
  const quizAbierto = ref(false)

  onMounted(() => auth.init())
</script>

<template>
  <NavBar
    @open-auth="openAuth"
    @open-quiz="quizAbierto = true"
  />

  <!-- v-slot -->
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
    v-if="quizAbierto"
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
}
.quiz-fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 28px rgba(184,130,10,.45);
}
.fab-logo {
  width: 26px; height: 26px; object-fit: contain;
  position: absolute;
}
.fab-star {
  font-size: 22px; color: var(--brown);
  position: absolute;
  opacity: 0;
}
.quiz-fab:hover .fab-logo { opacity: 0; }
.quiz-fab:hover .fab-star { opacity: 1; }

@media (max-width: 640px) {
  .quiz-fab { bottom: 20px; right: 20px; width: 48px; height: 48px; }
  .fab-logo  { width: 22px; height: 22px; }
}
</style>
