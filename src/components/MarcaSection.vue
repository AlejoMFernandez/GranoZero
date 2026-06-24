<template>
  <section class="marca-sec section">
    <div class="marca-inner">
      <span class="eyebrow">Identidad</span>
      <h2 class="sec-title">La marca<br>en el mundo real.</h2>
      <p class="sec-sub">
        Del grano a la identidad. GranoZero está pensada para estar en
        cada rincón de la experiencia del café.
      </p>
      <div class="marca-cta">
        <RouterLink to="/marca" class="btn">Ver identidad completa →</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marca-sec {
  background: url('/marca/hero.png') center/cover no-repeat;
  border-top: 1px solid var(--line);
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: center;
}
.marca-sec::before {
  content: '';
  position: absolute; inset: 0;
  background: rgba(62,28,0,.72);
}

.marca-inner {
  position: relative; z-index: 1;
  max-width: 640px;
}

.marca-cta { margin-top: 28px; }
</style>
