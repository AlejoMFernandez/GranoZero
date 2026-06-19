<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchAllPosts }    from '../services/posts'
import { fetchAllProfiles } from '../services/profile'
import IntensityScale from '../components/IntensityScale.vue'
import SiteFooter     from '../components/SiteFooter.vue'

const posts    = ref([])
const perfiles = ref({})

onMounted(async () => {
  posts.value = await fetchAllPosts()
  const ps = await fetchAllProfiles()
  ps.forEach(p => { perfiles.value[p.user_id] = p.username })
})

// Agrupar reseñas por lugar → café → promedio
const recomendaciones = computed(() => {
  // Solo las reseñas que tienen ubicación Y puntaje
  const conDatos = posts.value.filter(p => p.location_name && p.rating)

  const mapa = {}

  conDatos.forEach(post => {
    const lugar = post.location_name
    if (!mapa[lugar]) {
      mapa[lugar] = { nombre: lugar, lat: post.lat, lng: post.lng, cafes: {} }
    }
    const tipo = post.cafe_type || 'General'
    if (!mapa[lugar].cafes[tipo]) {
      mapa[lugar].cafes[tipo] = { ratings: [], posts: [] }
    }
    mapa[lugar].cafes[tipo].ratings.push(post.rating)
    mapa[lugar].cafes[tipo].posts.push(post)
  })

  // Convertir a array y calcular promedios
  return Object.values(mapa).map(loc => ({
    nombre: loc.nombre,
    lat:    loc.lat,
    lng:    loc.lng,
    cafes: Object.entries(loc.cafes)
      .map(([tipo, data]) => ({
        tipo,
        promedio: Math.round(data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length),
        cantidad: data.ratings.length,
        posts:    data.posts,
      }))
      .sort((a, b) => b.promedio - a.promedio), // mejores primero
  }))
})

// Qué elemento está expandido (string "nombre-tipo" o null)
const expandido = ref(null)

function toggleExpandir(key) {
  expandido.value = expandido.value === key ? null : key
}

function mapaLink(loc) {
  if (loc.lat && loc.lng) return `https://maps.google.com/?q=${loc.lat},${loc.lng}`
  return `https://maps.google.com/?q=${encodeURIComponent(loc.nombre)}`
}

function formatFecha(ts) {
  return new Date(ts).toLocaleDateString('es-AR', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="reco-page section">
    <div class="reco-inner">

      <!-- Header -->
      <div class="reco-header">
        <span v-reveal class="eyebrow">Comunidad</span>
        <h1 v-reveal class="sec-title">Recomendaciones.</h1>
        <p v-reveal class="sec-sub">
          Qué tomar y dónde — generado a partir de las reseñas de los cafeteros.
        </p>
        <RouterLink to="/resenas" class="link-resenas">← Ver todas las reseñas</RouterLink>
      </div>

      <!-- Sin datos -->
      <div v-if="recomendaciones.length === 0" class="sin-datos">
        <p>Todavía no hay suficientes reseñas con ubicación y puntaje.</p>
        <RouterLink to="/resenas" class="btn">Escribir una reseña</RouterLink>
      </div>

      <!-- Tarjetas por lugar -->
      <div v-else class="reco-grid">

        <div
          v-for="lugar in recomendaciones"
          :key="lugar.nombre"
          v-reveal
          class="lugar-card"
        >
          <!-- Nombre del lugar + link a Maps -->
          <div class="lugar-header">
            <h2 class="lugar-nombre">{{ lugar.nombre }}</h2>
            <a
              v-if="lugar.lat"
              :href="mapaLink(lugar)"
              target="_blank"
              rel="noopener"
              class="lugar-maps"
            >
              Ver en Maps →
            </a>
          </div>

          <!-- Un ítem por tipo de café -->
          <div
            v-for="cafe in lugar.cafes"
            :key="cafe.tipo"
            class="cafe-fila"
          >
            <div class="cafe-fila-top">
              <span class="cafe-tipo">{{ cafe.tipo }}</span>
              <IntensityScale :value="cafe.promedio" class="cafe-escala" />
              <span class="cafe-promedio">{{ cafe.promedio }}/10</span>
              <span class="cafe-cantidad">{{ cafe.cantidad }} reseña{{ cafe.cantidad > 1 ? 's' : '' }}</span>
              <!-- Toggle para ver las reseñas fuente -->
              <button
                class="cafe-toggle"
                @click="toggleExpandir(lugar.nombre + cafe.tipo)"
              >
                {{ expandido === lugar.nombre + cafe.tipo ? 'ocultar ▲' : 'ver ▼' }}
              </button>
            </div>

            <!-- Reseñas fuente (expandibles) -->
            <div v-if="expandido === lugar.nombre + cafe.tipo" class="cafe-resenas">
              <div
                v-for="post in cafe.posts"
                :key="post.id"
                class="mini-resena"
              >
                <div class="mini-meta">
                  <span class="mini-autor">{{ perfiles[post.user_id] ?? 'Anónimo' }}</span>
                  <span class="mini-fecha">{{ formatFecha(post.created_at) }}</span>
                  <span class="mini-rating">{{ post.rating }}/10</span>
                </div>
                <p class="mini-titulo">{{ post.title }}</p>
                <p class="mini-body">{{ post.body }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
  <SiteFooter />
</template>

<style scoped>
.reco-page  { min-height: 100vh; }
.reco-inner { max-width: 900px; margin: 0 auto; }

/* ── Header ─────────────────────────────────────────── */
.reco-header { margin-bottom: 56px; }
.link-resenas {
  display: inline-block; margin-top: 16px;
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim); transition: color .2s;
}
.link-resenas:hover { color: var(--gold); }

/* ── Sin datos ──────────────────────────────────────── */
.sin-datos {
  display: flex; flex-direction: column; gap: 20px;
  padding: 48px 0;
  font-size: 15px; font-weight: 300; color: var(--dim); font-style: italic;
}

/* ── Grid de lugares ────────────────────────────────── */
.reco-grid {
  display: flex; flex-direction: column; gap: 2px;
}

/* ── Tarjeta de lugar ───────────────────────────────── */
.lugar-card {
  border: 1px solid var(--line);
  padding: 28px 26px;
}

.lugar-header {
  display: flex; align-items: baseline; gap: 16px;
  margin-bottom: 24px;
}
.lugar-nombre {
  font-family: 'Playfair Display', serif;
  font-size: 24px; color: var(--cream); flex: 1;
}
.lugar-maps {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold); flex-shrink: 0; transition: opacity .2s;
}
.lugar-maps:hover { opacity: .7; }

/* ── Fila por tipo de café ──────────────────────────── */
.cafe-fila {
  border-top: 1px solid var(--line);
  padding: 14px 0;
}
.cafe-fila:last-child { border-bottom: none; }

.cafe-fila-top {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
.cafe-tipo {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--cream); width: 90px; flex-shrink: 0;
}
.cafe-escala { flex-shrink: 0; }

.cafe-promedio {
  font-family: 'Space Mono', monospace;
  font-size: 11px; color: var(--gold); flex-shrink: 0;
}
.cafe-cantidad {
  font-family: 'Space Mono', monospace;
  font-size: 8px; color: var(--dim); text-transform: uppercase; letter-spacing: 1px;
}
.cafe-toggle {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase;
  background: transparent; border: 1px solid var(--line);
  color: var(--dim); padding: 4px 10px;
  cursor: pointer; margin-left: auto;
  transition: border-color .2s, color .2s;
}
.cafe-toggle:hover { border-color: rgba(250,247,240,.25); color: var(--cream); }

/* ── Reseñas fuente ─────────────────────────────────── */
.cafe-resenas {
  display: flex; flex-direction: column; gap: 1px;
  margin-top: 12px;
}
.mini-resena {
  background: rgba(0,0,0,.15);
  border: 1px solid var(--line);
  padding: 14px 16px;
}
.mini-meta {
  display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
  margin-bottom: 6px;
}
.mini-autor {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold);
}
.mini-fecha, .mini-rating {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim);
}
.mini-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 15px; color: var(--cream); margin-bottom: 5px;
}
.mini-body {
  font-size: 13px; font-weight: 300; line-height: 1.65; color: var(--mid);
}

@media (max-width: 640px) {
  .cafe-fila-top  { gap: 8px; }
  .cafe-tipo      { width: 70px; }
  .lugar-header   { flex-wrap: wrap; gap: 8px; }
  .lugar-nombre   { font-size: 20px; }
  .lugar-card     { padding: 20px 16px; }
  .reco-header    { margin-bottom: 36px; }
}
</style>
