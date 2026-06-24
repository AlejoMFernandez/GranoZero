<script setup>
import PreciosSection from '../components/PreciosSection.vue'
import SiteFooter     from '../components/SiteFooter.vue'

const emit = defineEmits(['open-auth'])
</script>

<template>
  <div class="precios-page">

    <!-- Header de la página -->
    <div class="precios-page-header section">
      <span class="eyebrow">Planes</span>
      <h1 class="sec-title">
        Empezá gratis.<br>
        <em>Profundizá</em> cuando quieras.
      </h1>
      <p class="sec-sub">
        Todo el contenido es libre. Los que eligen ir más lejos tienen herramientas para hacerlo.
      </p>
    </div>

    <!-- Sección de precios (componente reutilizado) -->
    <PreciosSection @open-auth="$emit('open-auth', $event)" />

    <!-- FAQ mínimo -->
    <div class="faq section">
      <div class="faq-inner">
        <span class="eyebrow">Preguntas</span>
        <h2 class="faq-titulo">Frecuentes</h2>

        <div class="faq-lista">
          <div class="faq-item">
            <p class="faq-q">¿Puedo cancelar en cualquier momento?</p>
            <p class="faq-a">Sí. No hay contratos ni compromisos. Cancelás cuando quieras desde tu perfil.</p>
          </div>
          <div class="faq-item">
            <p class="faq-q">¿Qué incluye el plan gratuito?</p>
            <p class="faq-a">La carta completa de 10 cafés, el glosario y el quiz. Todo lo educativo siempre es libre.</p>
          </div>
          <div class="faq-item">
            <p class="faq-q">¿Cómo pago el plan Entendido?</p>
            <p class="faq-a">Por ahora el pago está en desarrollo. Podés anotarte en la lista de espera y te avisamos cuando esté disponible.</p>
          </div>
          <div class="faq-item">
            <p class="faq-q">¿Mis datos están seguros?</p>
            <p class="faq-a">Usamos Supabase, que cumple con los estándares más altos de seguridad. Tu información no se comparte con terceros.</p>
          </div>
        </div>
      </div>
    </div>

    <SiteFooter />
  </div>
</template>

<style scoped>
.precios-page { min-height: 100vh; }

/* ── Header ─────────────────────────────────────────── */
.precios-page-header {
  padding-top: 88px; /* navbar fijo (~68px) + respiración */
}
.precios-page-header .sec-title em {
  font-style: italic; color: var(--gold);
}

/* ── FAQ ────────────────────────────────────────────── */
.faq {
  background: rgba(0,0,0,.1);
  border-top: 1px solid var(--line);
}
.faq-inner { max-width: 680px; }
.faq-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 32px; color: var(--cream);
  margin-bottom: 40px;
}
.faq-lista { display: flex; flex-direction: column; gap: 0; }
.faq-item {
  padding: 24px 0;
  border-top: 1px solid var(--line);
}
.faq-q {
  font-size: 15px; font-weight: 500;
  color: var(--cream); margin-bottom: 10px;
}
.faq-a {
  font-size: 14px; font-weight: 300; line-height: 1.7;
  color: var(--mid);
}
</style>
