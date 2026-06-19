<script setup>
import { ref, computed } from 'vue'
import BeanSeparator from '../components/BeanSeparator.vue'
import SiteFooter    from '../components/SiteFooter.vue'

const terminos = [
  { t: 'Café de especialidad', d: 'Granos que alcanzan 80+ puntos en la escala SCA. El top 5% de la producción mundial, con trazabilidad completa y sin defectos.' },
  { t: 'Extracción',           d: 'El proceso de disolver los compuestos del café molido en agua. Tiempo, temperatura y presión determinan el resultado en taza.' },
  { t: 'Ratio',                d: 'Proporción entre café y agua. Un espresso clásico usa 1:2 — 18 g de café producen 36 ml de bebida.' },
  { t: 'Crema',                d: 'La capa espumosa dorada del espresso. Emulsión de aceites y CO₂ del grano con agua a alta presión.' },
  { t: 'Single Origin',        d: 'Café de una sola finca o región. Permite identificar y valorar las notas únicas de ese terroir.' },
  { t: 'Proceso',              d: 'Método de separar la pulpa del grano tras la cosecha. Natural, lavado y honey son los principales.' },
  { t: 'Molienda',             d: 'El grosor del café molido. Fina para espresso, media para filtro y pour-over, gruesa para prensa francesa.' },
  { t: 'Tampar',               d: 'Compactar el café molido en el portafiltro con presión uniforme antes de la extracción.' },
  { t: 'Vaporizar',            d: 'Texturizar leche con vapor caliente para crear microespuma sedosa — la base del latte art.' },
  { t: 'Tostado',              d: 'Proceso que transforma el grano verde. Claro resalta acidez y dulzor; oscuro, amargor y cuerpo.' },
  { t: 'Acidez',               d: 'Característica deseable — no es acidez agresiva, sino notas brillantes como cítrico o fruta tropical.' },
  { t: 'Cuerpo',               d: 'El peso y la textura del café en boca. Un espresso tiene cuerpo alto; un filtrado, más ligero y limpio.' },
  { t: 'Retrogusto',           d: 'El sabor que permanece en el paladar después de tragar. En el café de especialidad es dulce y prolongado.' },
  { t: 'Terroir',              d: 'El conjunto de suelo, altitud, clima y entorno que imprime su carácter en el grano. Igual que en el vino.' },
  { t: 'Blend',                d: 'Mezcla de granos de distintos orígenes para crear un perfil de sabor consistente y equilibrado.' },
  { t: 'Honey Process',        d: 'Proceso intermedio donde se deja parte de la pulpa al secar. Da al café dulzor y cuerpo extra.' },
  { t: 'Lote',                 d: 'Un grupo de granos del mismo origen, proceso y tostado. La trazabilidad por lote es clave en el especialidad.' },
  { t: 'Puntaje SCA',          d: 'Escala de 0 a 100 de la Specialty Coffee Association. 80+ es especialidad; 90+ es excepcional.' },
  { t: 'Curva de tostado',     d: 'El perfil de temperatura-tiempo durante el tostado. Define el sabor final del café de manera precisa.' },
  { t: 'Pour Over',            d: 'Método de filtrado manual. El agua se vierte lentamente sobre el café, produciendo una taza limpia y aromática.' },
  { t: 'Aeropress',            d: 'Método de inmersión con presión manual. Produce un café concentrado y limpio en menos de dos minutos.' },
  { t: 'Chemex',               d: 'Cafetera de vidrio con filtros de papel grueso que retienen aceites y producen una taza muy clara.' },
  { t: 'V60',                  d: 'Dripper cónico japonés con acanalado en espiral. Permite un control total del tiempo y la extracción.' },
  { t: 'Cold Brew',            d: 'Método de extracción en frío durante 12–24 horas. Resulta en un concentrado suave, bajo en acidez.' },
  { t: 'Ristretto',            d: 'Espresso más corto y concentrado: misma dosis, la mitad de agua. Intenso, dulce y sin amargura.' },
  { t: 'Long Black',           d: 'Agua caliente con espresso extraído encima. Más intenso que el americano; conserva la crema.' },
  { t: 'Flat White',           d: 'Espresso doble con poca leche texturizada. Entre el cappuccino y el latte, pero más fuerte y cremoso.' },
  { t: 'Latte Art',            d: 'Diseños creados al verter leche vaporizada sobre el espresso. El corazón y la rosetta son los clásicos.' },
  { t: 'Cascara',              d: 'Bebida hecha con las cáscaras secas del grano. Sabor afrutado, baja cafeína. Muy popular en Yemen.' },
  { t: 'Wet-Hulled',           d: 'Proceso de Indonesia (Giling Basah) donde el grano se descascara húmedo. Genera un perfil terroso y de cuerpo alto.' },
  { t: 'Degasificación',       d: 'El CO₂ liberado por los granos recién tostados. Esperá 5–10 días post-tostado para obtener la mejor extracción.' },
  { t: 'Bloom',                d: 'Pre-infusión inicial al verter un poco de agua sobre el café molido. Libera CO₂ y prepara una extracción pareja.' },
  { t: 'TDS',                  d: 'Total Dissolved Solids. Medida de la concentración del café en taza. Un espresso tiene TDS muy alto; un filtrado, bajo.' },
  { t: 'Varietal',             d: 'La variedad genética del cafeto. Typica, Bourbon, Gesha y SL-28 son algunas de las más valoradas.' },
]

const busqueda = ref('')

const terminosFiltrados = computed(() => {
  const q = busqueda.value.toLowerCase().trim()
  if (!q) return terminos
  return terminos.filter(item =>
    item.t.toLowerCase().includes(q) || item.d.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="glosario-page">

    <header class="section glosario-header">
      <span v-reveal class="eyebrow">Glosario completo</span>
      <h1 v-reveal class="sec-title">Las palabras<br>del café.</h1>
      <p v-reveal class="sec-sub">
        Todo lo que necesitás saber para entender qué tenés en la taza — sin vueltas.
      </p>
      <div v-reveal class="sep-wrap"><BeanSeparator /></div>

      <!-- Buscador -->
      <div v-reveal class="buscador-wrap">
        <input
          v-model="busqueda"
          class="buscador"
          type="text"
          placeholder="Buscar término…"
        />
        <span v-if="busqueda" class="buscador-count">
          {{ terminosFiltrados.length }} resultado{{ terminosFiltrados.length !== 1 ? 's' : '' }}
        </span>
      </div>
    </header>

    <div class="glosario-grid section" style="padding-top:0">

      <p v-if="terminosFiltrados.length === 0" class="sin-resultados">
        No se encontró "{{ busqueda }}".
      </p>

      <div
        v-for="item in terminosFiltrados"
        :key="item.t"
        v-reveal
        class="termino"
      >
        <span class="termino-nombre">{{ item.t }}</span>
        <p class="termino-def">{{ item.d }}</p>
      </div>

    </div>

  </div>

  <SiteFooter />
</template>

<style scoped>
.glosario-page { background: var(--brown); }

.glosario-header { padding-bottom: 0; }
.sep-wrap { margin-top: 32px; margin-bottom: 32px; }

/* ── Buscador ────────────────────────────────────────── */
.buscador-wrap {
  display: flex; align-items: center; gap: 16px;
  margin-top: 8px; margin-bottom: 32px;
}
.buscador {
  width: 100%; max-width: 360px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(250,247,240,.12);
  color: var(--cream);
  font-family: 'DM Sans', sans-serif; font-size: 14px;
  padding: 11px 16px; outline: none;
  transition: border-color .2s;
}
.buscador:focus { border-color: rgba(184,130,10,.4); }
.buscador::placeholder { color: var(--dim); }

.buscador-count {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim);
}

/* ── Grid — sin border-top ───────────────────────────── */
.glosario-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-left:   1px solid var(--line);
  border-right:  1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.termino {
  padding: 28px 26px;
  border-right:  1px solid var(--line);
  border-bottom: 1px solid var(--line);
  transition: background .22s;
}
.termino:hover { background: rgba(184,130,10,.03); }
/* Quitar borde derecho del último de cada fila */
.termino:nth-child(3n) { border-right: none; }

/* ── Nombre — protagonista con Playfair ──────────────── */
.termino-nombre {
  font-family: 'Playfair Display', serif;
  font-size: 19px; font-style: italic;
  color: var(--cream);
  display: block; margin-bottom: 10px;
}

.termino-def {
  font-size: 13px; font-weight: 300;
  color: var(--mid); line-height: 1.65;
}

/* ── Sin resultados ──────────────────────────────────── */
.sin-resultados {
  grid-column: 1 / -1;
  padding: 48px 26px;
  font-size: 14px; font-weight: 300;
  color: var(--dim); font-style: italic;
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 900px) {
  .glosario-grid { grid-template-columns: repeat(2, 1fr); }
  .termino:nth-child(3n) { border-right: 1px solid var(--line); }
  .termino:nth-child(2n) { border-right: none; }
}
@media (max-width: 560px) {
  .glosario-grid { grid-template-columns: 1fr; }
  .termino       { border-right: 1px solid var(--line); }
}
</style>
