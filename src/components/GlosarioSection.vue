<script>
import BeanSeparator from './BeanSeparator.vue'

export default {
  name: 'GlosarioSection',
  components: { BeanSeparator },
  data() {
    return {
      preview: [
        {
          t: 'Café de especialidad',
          d: 'Granos que alcanzan 80+ puntos en la escala SCA. El top 5% de la producción mundial, con trazabilidad completa y sin defectos.',
        },
        {
          t: 'Extracción',
          d: 'El proceso de disolver los compuestos del café molido en agua. Tiempo, temperatura y presión determinan el resultado en taza.',
        },
        {
          t: 'Terroir',
          d: 'El conjunto de suelo, altitud, clima y entorno que imprime su carácter en el grano. Igual que en el vino.',
        },
      ],
    }
  },
}
</script>

<template>
  <section id="glosario" class="section glosario-section">

    <div class="glosario-header">
      <span class="eyebrow">Glosario</span>
      <h2 class="sec-title">Las palabras<br>del café.</h2>
      <p class="sec-sub">
        Todo lo que necesitás saber para entender qué tenés en la taza — sin vueltas.
      </p>
    </div>

    <div class="glosario-sep">
      <BeanSeparator />
    </div>

    <!-- 3 palabras preview -->
    <div class="glosario-grid">
      <div
        v-for="item in preview"
        :key="item.t"
       
        class="termino"
      >
        <img src="/logofinal.png" class="viñeta-logo" aria-hidden="true" alt="" />
        <div class="termino-body">
          <span class="termino-nombre">{{ item.t }}</span>
          <p class="termino-def">{{ item.d }}</p>
        </div>
      </div>
    </div>

    <!-- Link al glosario completo -->
    <div class="glosario-cta">
      <RouterLink to="/glosario" class="btn">
        Ver glosario completo →
      </RouterLink>
      <span class="glosario-cta-sub">20 términos · Sin tecnicismos</span>
    </div>

  </section>
</template>

<style scoped>
.glosario-section { background: var(--brown); }
.glosario-header  { margin-bottom: 40px; }
.glosario-sep     { margin-bottom: 48px; }

.glosario-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--line);
  margin-bottom: 36px;
}

.termino {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 26px 24px;
  border-right: 1px solid var(--line);
}
.termino:last-child { border-right: none; }
.termino:hover { background: rgba(184,130,10,.03); }

/* Logo GranoZero pintado en dorado */
.viñeta-logo {
  width: 14px; height: 14px;
  object-fit: contain; flex-shrink: 0;
  margin-top: 2px;
  filter: sepia(1) saturate(8) brightness(0.85);
  opacity: .9;
}

.termino-body { display: flex; flex-direction: column; gap: 7px; }
.termino-nombre {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold);
}
.termino-def {
  font-size: 13.5px; font-weight: 300;
  color: var(--mid); line-height: 1.65;
}

/* cta */
.glosario-cta {
  display: flex; align-items: center; gap: 24px;
}
.glosario-cta-sub {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim);
}

@media (max-width: 900px) {
  .glosario-grid { grid-template-columns: 1fr; }
  .termino { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .glosario-cta { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>
