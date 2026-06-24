<script>
import BeanIcon from './BeanIcon.vue'

export default {
  name: 'HeroSection',
  components: { BeanIcon },
}
</script>

<template>
  <section class="hero" id="hero">
    <!-- granozero decorativo de fondo -->
    <div class="hero-bg" aria-hidden="true">
      <BeanIcon :size="560" color="#FAF7F0" :stroke="1.6" />
    </div>

    <div class="hero-inner">
      <span class="hero-eyebrow">Café de especialidad</span>
      <img src="/logofinal.png" alt="GranoZero" class="hero-logo" />
      <h1 class="hero-title">Todo parte<br>del grano.</h1>
      <p class="hero-sub">Conocé cada café de la carta y descubrí cuál dice algo sobre vos.</p>
      <div class="hero-btns">
        <a href="#carta" class="btn">Ver la carta</a>
        <a href="#quiz" class="btn btn-sec">¿Qué café sos?</a>
      </div>
    </div>

    <!-- Flecha de scroll -->
    <div class="scroll-arrow" aria-hidden="true">
      <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
        <line x1="10" y1="0" x2="10" y2="28" stroke="#B8820A" stroke-width="1.5"/>
        <polyline points="2,20 10,28 18,20" stroke="#B8820A" stroke-width="1.5" fill="none"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: radial-gradient(ellipse at 50% 38%, rgba(184,130,10,.11) 0%, transparent 62%), var(--brown);
  overflow: hidden; position: relative;
}

.hero-bg {
  position: absolute; bottom: -60px; right: -60px;
  opacity: .04; transform: rotate(-18deg);
  pointer-events: none;
}

.hero-inner {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  padding: 140px 24px 100px; gap: 18px;
}

.hero-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 5px; text-transform: uppercase;
  color: var(--dim);
}

.hero-logo {
  height: 52px; width: auto;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 68px; line-height: 1.1;
  color: var(--cream); margin-top: 4px;
}

.hero-sub {
  font-size: 17px; font-weight: 300; line-height: 1.7;
  color: var(--mid); max-width: 400px;
}

.hero-btns { display: flex; gap: 14px; margin-top: 8px; }

.scroll-arrow {
  position: absolute; bottom: 36px; left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}
@media (max-width: 640px) {
  .hero-title { font-size: 44px; }
  .hero-btns  { flex-direction: column; align-items: center; }
}
</style>
