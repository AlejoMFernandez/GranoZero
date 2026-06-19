<script setup>
import BeanSeparator from './BeanSeparator.vue'
// Sección explicativa: qué es el café de especialidad + qué ofrece GranoZero

const pilares = [
  {
    num: '01',
    titulo: 'Del origen a la taza',
    texto: 'El origen geográfico, la altura y el método de proceso determinan los sabores antes de que el café llegue a la máquina. No todos los granos son iguales — el café de especialidad es el top 5% de la producción mundial.',
  },
  {
    num: '02',
    titulo: 'El proceso importa',
    texto: 'La temperatura, el ratio de agua, el tiempo de extracción — cada variable tiene impacto directo en lo que sentís en boca. Entender el proceso es la diferencia entre tomar y realmente disfrutar.',
  },
  {
    num: '03',
    titulo: 'Aprender a tomar',
    texto: 'GranoZero existe para que cualquiera pueda entender qué está tomando. Sin tecnicismos innecesarios, sin elitismo — solo curiosidad, contexto y buen café.',
  },
]

const features = [
  {
    icon: '☕',
    titulo: 'La carta',
    texto: 'Diez tipos de café explicados: origen, preparación, perfil de sabor y maridaje. Todo lo que necesitás saber antes de pedir.',
  },
  {
    icon: '◎',
    titulo: '¿Qué café sos?',
    texto: 'Un quiz breve y sensorial. Cuatro preguntas sobre tus gustos y una respuesta que dice algo sobre vos.',
  },
  {
    icon: '◈',
    titulo: 'Próximamente',
    texto: 'Glosario de términos, guías de preparación por método y más herramientas para profundizar en el mundo del café de especialidad.',
  },
]
</script>

<template>
  <!-- BLOQUE 1: Qué es el café de especialidad -->
  <section id="sobre" class="section info-section">
    <header class="info-header">
      <span v-reveal class="eyebrow">Para entender</span>
      <h2 v-reveal class="sec-title">¿Qué es el café<br>de especialidad?</h2>
      <p v-reveal class="sec-sub">
        No todo café es igual. El café de especialidad alcanza los estándares
        más altos en cada etapa — desde el origen hasta la taza.
      </p>
    </header>

    <div class="pilares-grid">
      <div v-for="p in pilares" :key="p.num" v-reveal class="pilar-card">
        <span class="pilar-num">{{ p.num }}</span>
        <div class="pilar-sep"><BeanSeparator /></div>
        <h3 class="pilar-titulo">{{ p.titulo }}</h3>
        <p class="pilar-texto">{{ p.texto }}</p>
      </div>
    </div>
  </section>

  <!-- BLOQUE 2: Qué encontrás en GranoZero -->
  <section class="section features-section">
    <header class="info-header">
      <span v-reveal class="eyebrow">GranoZero</span>
      <h2 v-reveal class="sec-title">Todo en un lugar.</h2>
    </header>

    <div class="features-grid">
      <div v-for="f in features" :key="f.titulo" v-reveal class="feature-card">
        <span class="feature-icon">{{ f.icon }}</span>
        <h3 class="feature-titulo">{{ f.titulo }}</h3>
        <p class="feature-texto">{{ f.texto }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── SECCIÓN 1 ─────────────────────────────────────── */
.info-section   { background: var(--brown); }
.info-header    { margin-bottom: 56px; }

.pilares-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: var(--line);
  border: 1px solid var(--line);
}

.pilar-card {
  background: var(--brown);
  padding: 40px 32px;
}

.pilar-num {
  font-family: 'Space Mono', monospace;
  font-size: 11px; letter-spacing: 2px;
  color: var(--gold); display: block; margin-bottom: 16px;
}

.pilar-sep {
  margin-bottom: 20px;
}

.pilar-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--cream); margin-bottom: 14px;
}

.pilar-texto {
  font-size: 14px; font-weight: 300;
  color: var(--mid); line-height: 1.7;
}

/* ── SECCIÓN 2 ─────────────────────────────────────── */
.features-section { background: rgba(0,0,0,.12); }

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  border: 1px solid var(--line);
  padding: 36px 28px;
  transition: border-color .22s, background .22s;
}
.feature-card:hover {
  border-color: rgba(184,130,10,.25);
  background: rgba(184,130,10,.04);
}

.feature-icon {
  font-size: 24px; display: block; margin-bottom: 18px;
  opacity: .6;
}

.feature-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--cream); margin-bottom: 12px;
}

.feature-texto {
  font-size: 14px; font-weight: 300;
  color: var(--mid); line-height: 1.7;
}

/* ── MOBILE ─────────────────────────────────────────── */
@media (max-width: 900px) {
  .pilares-grid,
  .features-grid { grid-template-columns: 1fr; }
}
</style>
