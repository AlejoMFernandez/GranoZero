<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useAuthStore }   from '../stores/auth'
import { fetchAllPosts, createPost } from '../services/posts'
import { fetchAllProfiles }          from '../services/profile'
import RatingPicker   from '../components/RatingPicker.vue'
import IntensityScale from '../components/IntensityScale.vue'
import SiteFooter     from '../components/SiteFooter.vue'

const auth     = useAuthStore()
const posts    = ref([])
const perfiles = ref({})

// Formulario
const titulo    = ref('')
const cuerpo    = ref('')
const enviando  = ref(false)
const postError = ref('')
const showForm  = ref(false)

// Rating y tipo de café
const rating   = ref(0)
const cafeType = ref('')
const tiposCafe = ['Espresso', 'Ristretto', 'Americano', 'Macchiato', 'Cortado',
                   'Cappuccino', 'Flat White', 'Latte', 'Mocha']

// Ubicación
const placesContainer = ref(null)
const locationName    = ref('')
const locationDisplay = ref('')
const locationLat     = ref(null)
const locationLng     = ref(null)

function quitarUbicacion() {
  locationName.value    = ''
  locationDisplay.value = ''
  locationLat.value     = null
  locationLng.value     = null
  if (placesContainer.value) {
    placesContainer.value.innerHTML = ''
    initGooglePlaces()
  }
}

function initGooglePlaces() {
  if (!placesContainer.value || !window.google?.maps?.places) return
  const pac = new window.google.maps.places.PlaceAutocompleteElement()
  placesContainer.value.appendChild(pac)
  pac.addEventListener('gmp-placeselect', async ({ place }) => {
    await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] })
    locationName.value    = place.displayName
    locationDisplay.value = place.formattedAddress
    locationLat.value     = place.location.lat()
    locationLng.value     = place.location.lng()
  })
}

async function abrirForm() {
  showForm.value = true
  await nextTick()
  initGooglePlaces()
}

function cerrarForm() {
  showForm.value = false
}

onMounted(async () => {
  posts.value = await fetchAllPosts()
  const ps = await fetchAllProfiles()
  ps.forEach(p => { perfiles.value[p.user_id] = p.username })
})

async function publicar() {
  if (!titulo.value.trim() || !cuerpo.value.trim()) return
  enviando.value  = true
  postError.value = ''
  try {
    await createPost({
      userId:          auth.user.id,
      title:           titulo.value,
      body:            cuerpo.value,
      rating:          rating.value   || null,
      cafeType:        cafeType.value || null,
      locationName:    locationName.value.trim() || null,
      locationDisplay: locationDisplay.value     || null,
      lat:             locationLat.value,
      lng:             locationLng.value,
    })
    titulo.value   = ''
    cuerpo.value   = ''
    rating.value   = 0
    cafeType.value = ''
    quitarUbicacion()
    cerrarForm()
    posts.value = await fetchAllPosts()
  } catch (e) {
    postError.value = 'No se pudo publicar. Intentá de nuevo.'
  }
  enviando.value = false
}

function formatFecha(ts) {
  return new Date(ts).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}
function mapaEmbedUrl(post) {
  return `https://maps.google.com/maps?q=${post.lat},${post.lng}&z=16&output=embed`
}
function mapaLink(post) {
  return `https://maps.google.com/?q=${post.lat},${post.lng}`
}
</script>

<template>
  <div class="resenas-page section">
    <div class="resenas-inner">

      <!-- Header -->
      <div class="resenas-header">
        <span v-reveal class="eyebrow">Comunidad</span>
        <h1 v-reveal class="sec-title">Las reseñas.</h1>
        <p v-reveal class="sec-sub">
          Lo que los cafeteros opinan. Leé las experiencias de otros y dejá la tuya.
        </p>

        <div class="resenas-acciones">
          <RouterLink to="/recomendaciones" class="link-reco">
            Ver recomendaciones por lugar →
          </RouterLink>
          <button v-if="auth.user.id" class="btn-nueva" @click="abrirForm">
            + Nueva reseña
          </button>
          <button v-else class="btn-nueva btn-nueva--sec" @click="$emit('open-auth', 'login')">
            Accedé para reseñar
          </button>
        </div>
      </div>

      <!-- Lista completa -->
      <section class="resenas-lista">
        <p v-if="posts.length === 0" class="empty">
          Todavía no hay reseñas. ¡Sé el primero en dejar una!
        </p>

        <article
          v-for="post in posts"
          :key="post.id"
          v-reveal
          class="resena-item"
        >
          <div class="resena-meta">
            <span class="resena-fecha">{{ formatFecha(post.created_at) }}</span>
            <span v-if="perfiles[post.user_id]" class="resena-autor">
              {{ perfiles[post.user_id] }}
            </span>
            <span v-if="post.cafe_type" class="resena-cafe-badge">
              {{ post.cafe_type }}
            </span>
            <span v-if="post.location_name" class="resena-lugar-badge">
              {{ post.location_name }}
            </span>
          </div>

          <h2 class="resena-titulo">{{ post.title }}</h2>
          <p class="resena-body">{{ post.body }}</p>

          <div v-if="post.rating" class="resena-rating">
            <IntensityScale :value="post.rating" />
            <span class="resena-rating-num">{{ post.rating }}/10</span>
          </div>

          <details v-if="post.lat && post.lng" class="resena-mapa">
            <summary class="resena-mapa-sum">Ver mapa</summary>
            <div class="resena-mapa-body">
              <p v-if="post.location_display" class="resena-mapa-dir">
                {{ post.location_display }}
              </p>
              <iframe
                :src="mapaEmbedUrl(post)"
                class="mapa-iframe"
                loading="lazy"
                frameborder="0"
                allowfullscreen
              />
              <a :href="mapaLink(post)" target="_blank" rel="noopener" class="btn-maps">
                Ir a la cafetería →
              </a>
            </div>
          </details>
        </article>
      </section>

    </div>
  </div>

  <!-- Modal formulario -->
  <Transition name="modal">
    <div v-if="showForm" class="form-overlay" @click.self="cerrarForm">
      <div class="form-modal">

        <div class="form-modal-top">
          <h2 class="form-titulo">Escribí una reseña</h2>
          <button class="form-cerrar" @click="cerrarForm">✕</button>
        </div>

        <div class="form-campos">
          <p v-if="postError" class="form-error">{{ postError }}</p>

          <label class="campo">
            <span>Título</span>
            <input v-model="titulo" type="text" placeholder="¿De qué querés hablar?" />
          </label>

          <label class="campo">
            <span>Tu reseña</span>
            <textarea v-model="cuerpo" rows="4" placeholder="Contá tu experiencia…"></textarea>
          </label>

          <div class="campo">
            <span>Puntaje <em class="opcional">(opcional)</em></span>
            <RatingPicker v-model="rating" />
          </div>

          <label class="campo">
            <span>¿Qué café tomaste? <em class="opcional">(opcional)</em></span>
            <select v-model="cafeType">
              <option value="">— Elegir —</option>
              <option v-for="t in tiposCafe" :key="t" :value="t">{{ t }}</option>
            </select>
          </label>

          <div class="campo">
            <span>¿Dónde lo tomaste? <em class="opcional">(opcional)</em></span>
            <div ref="placesContainer" class="places-container"></div>
            <div v-if="locationDisplay" class="ubicacion-ok">
              <span class="ubicacion-texto">{{ locationDisplay }}</span>
              <button class="btn-quitar" @click="quitarUbicacion">✕</button>
            </div>
          </div>

          <button class="btn-publicar" @click="publicar" :disabled="enviando">
            {{ enviando ? 'Publicando…' : 'Publicar reseña' }}
          </button>
        </div>

      </div>
    </div>
  </Transition>

  <SiteFooter />
</template>

<style scoped>
.resenas-page  { min-height: 100vh; }
.resenas-inner { max-width: 860px; margin: 0 auto; }

/* ── Header ─────────────────────────────────────────── */
.resenas-header  { margin-bottom: 48px; }

.resenas-acciones {
  display: flex; align-items: center; gap: 16px;
  margin-top: 24px; flex-wrap: wrap;
}

.link-reco {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold);
  border: 1px solid rgba(184,130,10,.45);
  padding: 10px 18px;
  transition: background .2s, border-color .2s;
}
.link-reco:hover {
  background: rgba(184,130,10,.1);
  border-color: var(--gold);
}

.btn-nueva {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  background: var(--gold); color: var(--brown);
  border: none; padding: 10px 20px;
  transition: opacity .2s;
}
.btn-nueva:hover { opacity: .85; }
.btn-nueva--sec {
  background: transparent;
  border: 1px solid rgba(250,247,240,.15);
  color: var(--dim);
}
.btn-nueva--sec:hover { color: var(--cream); border-color: rgba(250,247,240,.3); opacity: 1; }

/* ── Lista ──────────────────────────────────────────── */
.resenas-lista { display: flex; flex-direction: column; gap: 1px; }

.empty {
  font-size: 14px; font-weight: 300; color: var(--dim);
  font-style: italic; padding: 24px 0;
}

.resena-item {
  border: 1px solid var(--line);
  padding: 28px 26px;
  transition: background .2s;
}
.resena-item:hover { background: rgba(184,130,10,.03); }

.resena-meta {
  display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
  margin-bottom: 12px;
}
.resena-fecha, .resena-autor {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}
.resena-autor { color: var(--gold); }

.resena-cafe-badge, .resena-lugar-badge {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase;
  border: 1px solid rgba(184,130,10,.3);
  padding: 2px 8px; color: var(--gold);
}
.resena-lugar-badge { color: var(--mid); border-color: var(--line); }

.resena-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--cream); margin-bottom: 10px;
}
.resena-body {
  font-size: 14px; font-weight: 300; line-height: 1.75; color: var(--mid);
}

.resena-rating {
  display: flex; align-items: center; gap: 10px; margin-top: 16px;
}
.resena-rating-num {
  font-family: 'Space Mono', monospace;
  font-size: 9px; color: var(--dim);
}

/* ── Mapa ───────────────────────────────────────────── */
.resena-mapa { margin-top: 16px; }
.resena-mapa-sum {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim); cursor: pointer; list-style: none;
  border: 1px solid var(--line); padding: 7px 14px;
  transition: border-color .2s, color .2s;
}
.resena-mapa-sum:hover { color: var(--cream); border-color: rgba(250,247,240,.25); }
details[open] .resena-mapa-sum { color: var(--gold); border-color: rgba(184,130,10,.4); }
.resena-mapa-sum::-webkit-details-marker { display: none; }
.resena-mapa-body { margin-top: 12px; }
.resena-mapa-dir  { font-size: 11px; color: var(--dim); line-height: 1.5; margin-bottom: 10px; }
.mapa-iframe      { width: 100%; height: 220px; display: block; border: 1px solid var(--line); }
.btn-maps {
  display: inline-block; margin-top: 10px;
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold); transition: opacity .2s;
}
.btn-maps:hover { opacity: .7; }

/* ── Modal overlay ──────────────────────────────────── */
.form-overlay {
  position: fixed; inset: 0; z-index: 400;
  background: rgba(20,8,0,.75);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.form-modal {
  background: #1e0a00;
  border: 1px solid rgba(184,130,10,.25);
  width: 100%; max-width: 520px;
  max-height: 90vh; overflow-y: auto;
  display: flex; flex-direction: column;
}
.form-modal-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 28px 0;
}
.form-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--cream);
}
.form-cerrar {
  background: none; border: none;
  font-size: 16px; color: var(--dim);
  transition: color .2s; line-height: 1;
}
.form-cerrar:hover { color: var(--cream); }

.form-campos {
  padding: 20px 28px 28px;
  display: flex; flex-direction: column; gap: 16px;
}

.form-error { font-size: 12px; color: #e06060; line-height: 1.4; }

/* Campos */
.campo { display: flex; flex-direction: column; gap: 6px; }
.campo > span {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}
.opcional {
  font-style: italic; opacity: .6;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px; text-transform: none; letter-spacing: 0;
}
.campo input, .campo textarea, .campo select {
  box-sizing: border-box; width: 100%; min-width: 0;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(250,247,240,.12);
  color: var(--cream);
  font-family: 'DM Sans', sans-serif; font-size: 14px;
  padding: 11px 13px; outline: none; resize: vertical;
  transition: border-color .2s;
}
.campo select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23B8820A' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
.campo select option { background: #2a1200; }
.campo input:focus, .campo textarea:focus, .campo select:focus {
  border-color: rgba(184,130,10,.4);
}
.campo input::placeholder, .campo textarea::placeholder { color: var(--dim); }

.ubicacion-ok {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 9px 11px;
  background: rgba(184,130,10,.06);
  border: 1px solid rgba(184,130,10,.2);
}
.ubicacion-texto { font-size: 11px; color: var(--mid); flex: 1; line-height: 1.5; }
.btn-quitar {
  background: transparent; border: none;
  color: var(--dim); font-size: 11px; padding: 0 2px;
  flex-shrink: 0; transition: color .2s;
}
.btn-quitar:hover { color: var(--cream); }

.btn-publicar {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  background: var(--gold); color: var(--brown);
  border: none; padding: 13px 20px;
  transition: opacity .2s; align-self: flex-start;
}
.btn-publicar:disabled { opacity: .5; }
.btn-publicar:not(:disabled):hover { opacity: .85; }

/* ── Transición modal ───────────────────────────────── */
.modal-enter-active, .modal-leave-active { transition: opacity .22s ease; }
.modal-enter-from, .modal-leave-to       { opacity: 0; }

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 640px) {
  .resenas-header  { margin-bottom: 32px; }
  .resena-titulo   { font-size: 18px; }
  .resena-item     { padding: 18px 16px; }
  .form-modal-top  { padding: 20px 20px 0; }
  .form-campos     { padding: 16px 20px 24px; }
}
</style>

<style>
.places-container { width: 100%; }
.places-container gmp-placeautocomplete { width: 100%; }
</style>
