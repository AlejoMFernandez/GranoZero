<script setup>
// SiteFooter — logo + links + redes sociales + copyright
</script>

<template>
  <footer class="footer bean-pattern">

    <!-- Línea separadora top -->
    <div class="footer-sep"></div>

    <div class="footer-inner">

      <!-- Columna izquierda: logo + tagline -->
      <div class="footer-brand">
        <RouterLink to="/" class="footer-logo">
          <img src="/logofinal.png" alt="" class="footer-logo-img" />
          <span>Grano<em>Zero</em></span>
        </RouterLink>
        <p class="footer-tagline">Café de especialidad.<br>Todo parte del grano.</p>
      </div>

      <!-- Columna centro: navegación -->
      <nav class="footer-nav" aria-label="Footer navigation">
        <span class="footer-nav-titulo">Navegación</span>
        <ul>
          <li><RouterLink to="/">Inicio</RouterLink></li>
          <li><RouterLink to="/carta">La carta</RouterLink></li>
          <li><RouterLink to="/#quiz">¿Qué café sos?</RouterLink></li>
          <li><RouterLink to="/glosario">Glosario</RouterLink></li>
          <li><RouterLink to="/#precios">Planes</RouterLink></li>
        </ul>
      </nav>

    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <span class="footer-copy">© 2026 GranoZero · Café de especialidad</span>
      <span class="footer-copy">Hecho con pasión y mucho espresso</span>
    </div>

  </footer>
</template>

<style scoped>
.footer {
  background-color: #1e0e00;
  border-top: 1px solid var(--line);
}

.footer-sep { display: none; } /* reservado por si se quiere separador con bean */

.footer-inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 48px;
  padding: 64px 9vw 48px;
}

/* ── Brand ──────────────────────────────────────────── */
.footer-brand { display: flex; flex-direction: column; gap: 18px; }

.footer-logo {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Playfair Display', serif; font-size: 18px;
  color: var(--cream);
}
.footer-logo-img { height: 22px; width: auto; opacity: .85; }
.footer-logo em { font-style: italic; color: var(--gold); }

.footer-tagline {
  font-size: 13px; font-weight: 300; line-height: 1.6;
  color: var(--dim);
}

/* ── Nav ────────────────────────────────────────────── */
.footer-nav-titulo {
  display: block; margin-bottom: 16px;
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--gold);
}
.footer-nav ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-nav a {
  font-size: 13px; font-weight: 300; color: var(--dim);
}
.footer-nav a:hover { color: var(--cream); }

/* ── Social ─────────────────────────────────────────── */
.footer-social-col { display: flex; flex-direction: column; }

.redes { display: flex; flex-direction: column; gap: 12px; }
.red {
  display: flex; align-items: center; gap: 10px;
  color: var(--dim); font-size: 13px; font-weight: 300;
}
.red:hover { color: var(--cream); }

/* ── Bottom ─────────────────────────────────────────── */
.footer-bottom {
  border-top: 1px solid var(--line);
  padding: 18px 9vw;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-copy {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1px; color: rgba(250,247,240,.2);
}

/* ── Mobile ─────────────────────────────────────────── */
@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 36px; padding: 48px 6vw 36px;
  }
  .footer-bottom {
    flex-direction: column; gap: 8px;
    text-align: center; padding: 16px 6vw;
  }
}
</style>
