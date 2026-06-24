<template>
  <section class="evento-sec">

    <!-- Foto grande con overlay -->
    <div class="evento-foto-wrap">
      <img src="/evento/espacio.png" alt="Primera Cata GranoZero" class="evento-foto" />
      <div class="evento-overlay"></div>

      <!-- Texto encima de la foto -->
      <div class="evento-texto-overlay">
        <span class="eyebrow" style="color: rgba(184,130,10,.8)">Próximo evento</span>
        <h2 class="sec-title" style="color: var(--cream); margin: 8px 0 12px">Primera Cata.</h2>
        <p class="evento-fecha">5 de Julio &nbsp;·&nbsp; 18 hs &nbsp;·&nbsp; Lattente, San Telmo</p>
        <RouterLink to="/evento" class="btn" style="margin-top: 20px; display: inline-block">
          Ver detalles →
        </RouterLink>
      </div>

    </div>

  </section>
</template>

<style scoped>
.evento-sec { border-top: 1px solid var(--line); }

.evento-foto-wrap {
  position: relative;
  height: 520px;
  overflow: hidden;
}
.evento-foto {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  object-position: center 30%;
}
.evento-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(62,28,0,.85) 40%, transparent 100%);
}

/* Texto sobre la imagen */
.evento-texto-overlay {
  position: absolute;
  top: 50%; left: 9vw;
  transform: translateY(-50%);
  max-width: 460px;
}

.evento-fecha {
  font-family: 'Space Mono', monospace;
  font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold);
}

@media (max-width: 640px) {
  .evento-foto-wrap { height: 400px; }
  .evento-overlay {
    background: rgba(62,28,0,.75);
  }
  .evento-texto-overlay {
    left: 6vw; right: 6vw;
    max-width: 100%;
  }
}
</style>
