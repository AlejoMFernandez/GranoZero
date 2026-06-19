<template>
  <div class="marca-page">

    <!-- Header -->
    <header class="section marca-header">
      <span v-reveal class="eyebrow">Identidad de marca</span>
      <h1 v-reveal class="sec-title">La marca.</h1>
      <p v-reveal class="sec-sub">
        Cómo GranoZero aparece en el mundo — desde los objetos físicos
        hasta los medios digitales.
      </p>
    </header>

    <!-- Universo visual: el sistema detrás de la marca -->
    <section class="section universo-sec" style="padding-top:0">
      <span v-reveal class="eyebrow">Universo visual</span>
      <h2 v-reveal class="bloque-titulo">El sistema detrás de la marca.</h2>
      <p v-reveal class="sec-sub" style="margin-bottom: 44px">
        Antes de los objetos, un lenguaje: el grano se repite, se sella,
        se mide y separa el contenido — en cualquier soporte, con o sin el logo.
      </p>

      <!-- 01 · Patrones -->
      <div v-reveal class="universo-bloque">
        <h3 class="universo-sub">01 · Patrones</h3>
        <div class="patron-swatch bean-pattern"></div>
      </div>

      <!-- 02 · Sistema de sellos -->
      <div v-reveal class="universo-bloque">
        <h3 class="universo-sub">02 · Sistema de sellos</h3>
        <div class="sellos-fila">
          <BeanBadge label="Single Origin"   variant="dark"    />
          <BeanBadge label="Tostado Claro"   variant="gold"    />
          <BeanBadge label="Espresso"        variant="outline" />
          <BeanBadge label="Natural Process" variant="dark"    />
        </div>
      </div>

      <!-- 03 · Ornamentos y separadores -->
      <div v-reveal class="universo-bloque">
        <h3 class="universo-sub">03 · Ornamentos y separadores</h3>
        <div class="ornamento-niveles">
          <div>
            <span class="nivel-label">Línea</span>
            <div class="nivel-linea"></div>
          </div>
          <div>
            <span class="nivel-label">Ornamento</span>
            <BeanSeparator />
          </div>
          <div>
            <span class="nivel-label">Viñeta</span>
            <ul class="bean-bullets">
              <li>Café de especialidad y origen único</li>
              <li>Tostado artesanal en pequeños lotes</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 04 · Escala de intensidad -->
      <div v-reveal class="universo-bloque">
        <h3 class="universo-sub">04 · Escala de intensidad</h3>
        <div class="escala-demo">
          <div class="escala-fila"><span class="escala-fila-label">Espresso</span> <IntensityScale :value="9" /></div>
          <div class="escala-fila"><span class="escala-fila-label">Cortado</span>  <IntensityScale :value="7" /></div>
          <div class="escala-fila"><span class="escala-fila-label">Latte</span>    <IntensityScale :value="3" /></div>
        </div>
      </div>
    </section>

    <!-- Aplicaciones gráficas -->
    <section class="section" style="padding-top:0">
      <span v-reveal class="eyebrow">Aplicaciones gráficas</span>
      <h2 v-reveal class="bloque-titulo">Objetos de la marca</h2>
      <div v-reveal class="grid-4">
        <div class="foto-item">
          <img src="/marca/taza.png"     alt="Taza GranoZero" />
          <span class="foto-label">Taza</span>
        </div>
        <div class="foto-item">
          <img src="/marca/delantal.png" alt="Delantal GranoZero" />
          <span class="foto-label">Delantal</span>
        </div>
        <div class="foto-item">
          <img src="/marca/sticker.png"  alt="Sticker GranoZero" />
          <span class="foto-label">Sticker</span>
        </div>
        <div class="foto-item">
          <img src="/marca/tarjeta.png"  alt="Tarjeta GranoZero" />
          <span class="foto-label">Tarjeta</span>
        </div>
      </div>
    </section>

    <!-- Comunicación digital -->
    <section class="section">
      <span v-reveal class="eyebrow">Comunicación digital</span>
      <h2 v-reveal class="bloque-titulo">Redes sociales</h2>
      <div v-reveal class="grid-3">
        <div class="foto-item">
          <img src="/comunicacion/banner.png" alt="Banner GranoZero" />
          <span class="foto-label">Banner web</span>
        </div>
        <div class="foto-item">
          <img src="/comunicacion/post.png"   alt="Post GranoZero" />
          <span class="foto-label">Post Instagram</span>
        </div>
        <div class="foto-item">
          <img src="/comunicacion/story.png"  alt="Story GranoZero" />
          <span class="foto-label">Story</span>
        </div>
      </div>
    </section>

    <!-- App digital -->
    <section class="section">
      <span v-reveal class="eyebrow">Plataforma</span>
      <h2 v-reveal class="bloque-titulo">Aplicación digital</h2>
      <div v-reveal class="grid-3">
        <div class="foto-item foto-item--full">
          <img src="/digital/desktop.png" alt="App desktop GranoZero" />
          <span class="foto-label">Desktop</span>
        </div>
        <div class="foto-item">
          <img src="/digital/mobile1.png" alt="App mobile GranoZero" />
          <span class="foto-label">Mobile</span>
        </div>
        <div class="foto-item">
          <img src="/digital/mobile2.png" alt="App mobile GranoZero 2" />
          <span class="foto-label">Mobile 2</span>
        </div>
      </div>
    </section>

  </div>
  <SiteFooter />
</template>

<script setup>
import SiteFooter     from '../components/SiteFooter.vue'
import BeanBadge      from '../components/BeanBadge.vue'
import BeanSeparator  from '../components/BeanSeparator.vue'
import IntensityScale from '../components/IntensityScale.vue'
</script>

<style scoped>
.marca-page { min-height: 100vh; }
.marca-header { padding-bottom: 0; }

.bloque-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 28px; color: var(--cream);
  margin: 12px 0 32px;
}

/* ── Universo visual ─────────────────────────────────── */
.universo-sec { border-top: 1px solid var(--line); }

.universo-bloque { margin-bottom: 48px; }
.universo-bloque:last-child { margin-bottom: 0; }

.universo-sub {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold); margin-bottom: 18px;
}

.patron-swatch {
  height: 120px;
  border: 1px solid var(--line);
  background-color: rgba(0,0,0,.15);
}

.sellos-fila { display: flex; gap: 16px; flex-wrap: wrap; }

.ornamento-niveles { display: flex; flex-direction: column; gap: 24px; max-width: 480px; }
.nivel-label {
  display: block; margin-bottom: 10px;
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim);
}
.nivel-linea { height: 1px; background: rgba(184,130,10,.35); }

.escala-demo { display: flex; flex-direction: column; gap: 14px; }
.escala-fila { display: flex; align-items: center; gap: 16px; }
.escala-fila-label {
  font-size: 13px; color: var(--dim); width: 70px; flex-shrink: 0;
}

/* ── Grillas ─────────────────────────────────────────── */
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.foto-item {
  display: flex; flex-direction: column; gap: 10px;
  overflow: hidden;
}
.foto-item img {
  width: 100%; display: block;
  object-fit: cover;
  border: 1px solid var(--line);
  transition: transform .4s ease;
}
.foto-item:hover img { transform: scale(1.02); }

.foto-label {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}

@media (max-width: 900px) {
  .grid-4 { grid-template-columns: 1fr 1fr; }
  .grid-3 { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 520px) {
  .grid-4, .grid-3 { grid-template-columns: 1fr; }
}
</style>
