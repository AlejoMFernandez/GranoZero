<template>
  <div class="evento-page">

    <!-- Foto hero -->
    <div class="evento-hero">
      <img src="/evento/espacio.png" alt="Primera Cata GranoZero" class="hero-img" />
      <div class="hero-overlay"></div>
    </div>

    <!-- Contenido -->
    <div class="section evento-contenido">
      <div class="evento-inner">

        <!-- Info del evento -->
        <div class="evento-info">
          <span class="eyebrow">Próximo evento</span>
          <h1 class="sec-title">Primera Cata.</h1>

          <div class="evento-detalles">
            <div class="detalle">
              <span class="detalle-label">Fecha</span>
              <span class="detalle-val">5 de Julio de 2026</span>
            </div>
            <div class="detalle">
              <span class="detalle-label">Horario</span>
              <span class="detalle-val">18 hs</span>
            </div>
            <div class="detalle">
              <span class="detalle-label">Lugar</span>
              <span class="detalle-val">Lattente, San Telmo</span>
            </div>
          </div>

          <p class="sec-sub" style="margin-top: 28px">
            Una noche para aprender a distinguir orígenes, procesos y perfiles de sabor.
          </p>

          <ul class="bean-bullets" style="margin-top: 18px; max-width: 480px">
            <li>Tres cafés de distintos orígenes, catados en conjunto</li>
            <li>Un barista guía cada cata y explica el proceso</li>
            <li>Para todos los niveles — curiosos y entendidos son bienvenidos</li>
          </ul>
        </div>

        <!-- Imágenes del evento -->
        <div class="evento-fotos">
          <img src="/evento/rollup.png"     alt="Rollup Primera Cata"    class="evento-foto" />
          <img src="/evento/invitacion.png" alt="Invitación Primera Cata" class="evento-foto" />
        </div>

      </div>
    </div>

  </div>
  <SiteFooter />
</template>

<script>
import SiteFooter from '../components/SiteFooter.vue'

export default {
  name: 'EventoPage',
  components: { SiteFooter },
}
</script>

<style scoped>
.evento-page { min-height: 100vh; }

/* ── Hero ────────────────────────────────────────────── */
.evento-hero {
  position: relative; height: 560px; overflow: hidden;
}
.hero-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  object-position: center 30%;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 50%, var(--brown) 100%);
}

/* ── Contenido ───────────────────────────────────────── */
.evento-contenido { padding-top: 0; }
.evento-inner {
  max-width: 1080px; margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: flex-start;
}

/* ── Detalles del evento ─────────────────────────────── */
.evento-detalles {
  display: flex; flex-direction: column; gap: 0;
  border: 1px solid var(--line);
  margin-top: 28px;
}
.detalle {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
}
.detalle:last-child { border-bottom: none; }

.detalle-label {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}
.detalle-val {
  font-size: 14px; color: var(--cream); font-weight: 300;
}

/* ── Fotos ───────────────────────────────────────────── */
.evento-fotos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.evento-foto {
  width: 100%; display: block;
  border: 1px solid var(--line);
  object-fit: cover;
}

@media (max-width: 760px) {
  .evento-inner  { grid-template-columns: 1fr; gap: 36px; }
  .evento-hero   { height: 340px; }
  .evento-fotos  { grid-template-columns: 1fr 1fr; }
}
</style>
