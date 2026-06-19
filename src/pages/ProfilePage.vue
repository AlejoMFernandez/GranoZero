<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute }     from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { fetchUserProfile, updateUserProfile } from '../services/profile'
import { fetchUserPosts } from '../services/posts'
import { cafes }         from '../data/cafes.js'
import BeanSeparator     from '../components/BeanSeparator.vue'
import BeanBadge         from '../components/BeanBadge.vue'

const route   = useRoute()
const auth    = useAuthStore()

const profile   = ref(null)
const posts     = ref([])
const loading   = ref(true)
const editing   = ref(false)
const guardando = ref(false)

// Formulario de edición
const form = ref({ username: '', bio: '', favorite_preparation: '' })

// ¿Es el propio perfil?
const esPropio = computed(() => auth.user.id === route.params.id)

// Nombre del café favorito (si está guardado como ID)
const nombreFavorito = computed(() => {
  const id = profile.value?.favorite_preparation
  if (!id) return null
  return cafes.find(c => c.id === id)?.name ?? id
})

onMounted(async () => {
  try {
    const [p, ps] = await Promise.all([
      fetchUserProfile(route.params.id),
      fetchUserPosts(route.params.id),
    ])
    profile.value = p
    posts.value   = ps
    if (p) {
      form.value = {
        username:             p.username ?? '',
        bio:                  p.bio ?? '',
        favorite_preparation: p.favorite_preparation ?? '',
      }
    }
  } catch (e) {
    console.error(e)
  }
  loading.value = false
})

async function guardar() {
  guardando.value = true
  try {
    await updateUserProfile({ userId: route.params.id, profileData: form.value })
    profile.value = { ...profile.value, ...form.value }
    editing.value = false
  } catch (e) {
    console.error(e)
  }
  guardando.value = false
}

function formatFecha(ts) {
  return new Date(ts).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="perfil-page">

    <div v-if="loading" class="estado-loading">
      <p>Cargando perfil…</p>
    </div>

    <div v-else-if="!profile" class="estado-vacio">
      <p>Perfil no encontrado.</p>
    </div>

    <template v-else>

      <!-- Header del perfil -->
      <div class="perfil-header">
        <div class="perfil-header-inner">

          <!-- Avatar -->
          <div class="avatar">
            {{ (profile.username ?? profile.email ?? '?')[0].toUpperCase() }}
          </div>

          <!-- Info -->
          <div class="perfil-info">
            <h1 class="perfil-nombre">{{ profile.username ?? 'Sin nombre' }}</h1>

            <BeanBadge
              v-if="nombreFavorito"
              :label="nombreFavorito"
              variant="outline"
              :size="62"
              class="perfil-sello"
            />

            <p v-if="profile.bio" class="perfil-bio">{{ profile.bio }}</p>
          </div>

          <button v-if="esPropio && !editing" class="btn-editar" @click="editing = true">
            Editar perfil
          </button>
        </div>
      </div>

      <!-- Formulario de edición -->
      <Transition name="slide-down">
        <div v-if="editing" class="perfil-edit">
          <div class="perfil-edit-inner">
            <h2 class="edit-titulo">Editar perfil</h2>

            <label class="campo">
              <span>Nombre de usuario</span>
              <input v-model="form.username" type="text" placeholder="tu nombre" />
            </label>

            <!-- Preparación favorita: selector con los cafés de la carta -->
            <label class="campo">
              <span>Café favorito</span>
              <select v-model="form.favorite_preparation">
                <option value="">— Elegir —</option>
                <option v-for="cafe in cafes" :key="cafe.id" :value="cafe.id">
                  {{ cafe.name }}
                </option>
              </select>
            </label>

            <label class="campo">
              <span>Bio</span>
              <textarea v-model="form.bio" rows="3" placeholder="Contá algo sobre vos y el café…"></textarea>
            </label>

            <div class="edit-acciones">
              <button class="btn-guardar" @click="guardar" :disabled="guardando">
                {{ guardando ? 'Guardando…' : 'Guardar cambios' }}
              </button>
              <button class="btn-cancelar" @click="editing = false">Cancelar</button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Reseñas del usuario -->
      <div class="perfil-posts">
        <div class="perfil-posts-inner">
          <BeanSeparator />
          <h2 class="posts-titulo">
            <span class="eyebrow">Reseñas</span>
          </h2>

          <p v-if="posts.length === 0" class="posts-vacio">
            {{ esPropio ? 'Todavía no escribiste ninguna reseña.' : 'Este usuario todavía no tiene reseñas.' }}
          </p>

          <div v-else class="posts-lista">
            <article v-for="post in posts" :key="post.id" class="post-item">
              <div class="post-meta">
                <span class="post-fecha">{{ formatFecha(post.created_at) }}</span>
              </div>
              <h3 class="post-titulo">{{ post.title }}</h3>
              <p class="post-body">{{ post.body }}</p>
            </article>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<style scoped>
.perfil-page { min-height: 100vh; padding-top: 72px; }

/* ── Estados ────────────────────────────────────────── */
.estado-loading, .estado-vacio {
  display: flex; align-items: center; justify-content: center;
  height: calc(100vh - 72px);
  font-size: 14px; color: var(--dim); font-style: italic;
}

/* ── Header del perfil ──────────────────────────────── */
.perfil-header {
  border-bottom: 1px solid var(--line);
  padding: 40px 9vw;
}
.perfil-header-inner {
  max-width: 860px; margin: 0 auto;
  display: flex; align-items: flex-start; gap: 28px;
}

.avatar {
  width: 72px; height: 72px;
  background: rgba(184,130,10,.15);
  border: 1px solid rgba(184,130,10,.3);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 28px; font-style: italic; color: var(--gold);
  flex-shrink: 0;
}

.perfil-info { flex: 1; }
.perfil-nombre {
  font-family: 'Playfair Display', serif;
  font-size: 36px; color: var(--cream); margin-bottom: 10px;
}
.perfil-sello { margin: 8px 0 14px; }
.perfil-bio {
  font-size: 15px; font-weight: 300; line-height: 1.65;
  color: var(--mid); max-width: 480px;
}

.btn-editar {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid var(--line); color: var(--dim);
  background: transparent; padding: 9px 18px;
  transition: border-color .2s, color .2s; flex-shrink: 0;
}
.btn-editar:hover { border-color: rgba(250,247,240,.3); color: var(--cream); }

/* ── Formulario de edición ──────────────────────────── */
.perfil-edit {
  border-bottom: 1px solid var(--line);
  background: rgba(0,0,0,.15);
  padding: 36px 9vw;
}
.perfil-edit-inner {
  max-width: 500px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 18px;
}
.edit-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--cream);
}

.campo {
  display: flex; flex-direction: column; gap: 6px;
}
.campo span {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}
.campo input, .campo textarea, .campo select {
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
.campo input:focus, .campo textarea:focus, .campo select:focus { border-color: rgba(184,130,10,.4); }
.campo input::placeholder, .campo textarea::placeholder { color: var(--dim); }

.edit-acciones { display: flex; gap: 12px; }
.btn-guardar {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  background: var(--gold); color: var(--brown);
  border: none; padding: 12px 22px;
  transition: opacity .2s;
}
.btn-guardar:disabled { opacity: .5; }
.btn-cancelar {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid var(--line); color: var(--dim);
  background: transparent; padding: 12px 22px;
  transition: border-color .2s, color .2s;
}
.btn-cancelar:hover { border-color: rgba(250,247,240,.25); color: var(--cream); }

/* ── Transición edición ─────────────────────────────── */
.slide-down-enter-active, .slide-down-leave-active {
  transition: opacity .25s ease, max-height .3s ease;
  overflow: hidden; max-height: 500px;
}
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; max-height: 0; }

/* ── Posts ──────────────────────────────────────────── */
.perfil-posts { padding: 52px 9vw; }
.perfil-posts-inner { max-width: 860px; margin: 0 auto; }
.posts-titulo { margin-bottom: 28px; }
.posts-vacio {
  font-size: 14px; font-weight: 300; color: var(--dim);
  font-style: italic; padding: 20px 0;
}
.posts-lista { display: flex; flex-direction: column; gap: 1px; }
.post-item {
  border: 1px solid var(--line); padding: 24px 22px;
  transition: background .2s;
}
.post-item:hover { background: rgba(184,130,10,.04); }
.post-meta { margin-bottom: 8px; }
.post-fecha {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}
.post-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 20px; color: var(--cream); margin-bottom: 10px;
}
.post-body {
  font-size: 14px; font-weight: 300; line-height: 1.65; color: var(--mid);
}

@media (max-width: 640px) {
  .perfil-header-inner { flex-wrap: wrap; gap: 20px; }
  .perfil-nombre { font-size: 28px; }
  .btn-editar { width: 100%; }
}
</style>
