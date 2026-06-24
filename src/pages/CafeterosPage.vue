<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchAllProfiles } from '../services/profile'
import BeanSeparator from '../components/BeanSeparator.vue'

const profiles = ref([])
const loading  = ref(true)
const busqueda = ref('')

onMounted(async () => {
  try {
    profiles.value = await fetchAllProfiles()
  } catch (e) {
    console.error(e)
  }
  loading.value = false
})

// Filtrar por nombre o preferencia
const perfilesFiltrados = computed(() => {
  const q = busqueda.value.toLowerCase().trim()
  if (!q) return profiles.value
  return profiles.value.filter(p =>
    p.username?.toLowerCase().includes(q) ||
    p.favorite_preparation?.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="cafeteros-page section">
    <div class="cafeteros-inner">

      <!-- Header -->
      <div class="cafeteros-header">
        <span class="eyebrow">Comunidad</span>
        <h1 class="sec-title">Los cafeteros.</h1>
        <p class="sec-sub">
          Las personas que forman parte de GranoZero. Cada uno con su preparación favorita y su forma de entender el café.
        </p>
      </div>

      <BeanSeparator />

      <!-- Buscador -->
      <div class="buscador-wrap">
        <input
          v-model="busqueda"
          class="buscador"
          type="text"
          placeholder="Buscar por nombre o preparación…"
        />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="estado">
        <p>Cargando cafeteros…</p>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="perfilesFiltrados.length === 0" class="estado">
        <p>No se encontraron cafeteros{{ busqueda ? ' con esa búsqueda' : '' }}.</p>
      </div>

      <!-- Grid de perfiles -->
      <div v-else class="perfiles-grid">
        <RouterLink
          v-for="p in perfilesFiltrados"
          :key="p.user_id"
          :to="`/perfil/${p.user_id}`"
         
          class="perfil-card"
        >
          <!-- Avatar -->
          <div class="perfil-avatar">
            {{ (p.username ?? 'A')[0].toUpperCase() }}
          </div>

          <!-- Info -->
          <div class="perfil-datos">
            <p class="perfil-nombre">{{ p.username ?? 'Sin nombre' }}</p>
            <p v-if="p.favorite_preparation" class="perfil-prep">
              <span class="prep-label">Prefiere</span>
              {{ p.favorite_preparation }}
            </p>
          </div>
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
.cafeteros-page { min-height: 100vh; }
.cafeteros-inner { max-width: 1080px; margin: 0 auto; }

/* ── Header ─────────────────────────────────────────── */
.cafeteros-header { margin-bottom: 48px; }

/* ── Buscador ───────────────────────────────────────── */
.buscador-wrap { margin: 36px 0; }
.buscador {
  width: 100%; max-width: 400px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(250,247,240,.12);
  color: var(--cream);
  font-family: 'DM Sans', sans-serif; font-size: 14px;
  padding: 12px 16px; outline: none;
  transition: border-color .2s;
}
.buscador:focus { border-color: rgba(184,130,10,.4); }
.buscador::placeholder { color: var(--dim); }

/* ── Estado ─────────────────────────────────────────── */
.estado {
  padding: 48px 0;
  font-size: 14px; font-weight: 300;
  color: var(--dim); font-style: italic;
}

/* ── Grid de perfiles ───────────────────────────────── */
.perfiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  margin-top: 12px;
}

.perfil-card {
  background: var(--brown);
  padding: 28px 24px;
  display: flex; gap: 18px; align-items: flex-start;
  transition: background .2s;
}
.perfil-card:hover { background: rgba(184,130,10,.05); }

.perfil-avatar {
  width: 48px; height: 48px; flex-shrink: 0;
  background: rgba(184,130,10,.12);
  border: 1px solid rgba(184,130,10,.25);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 20px; font-style: italic; color: var(--gold);
}

.perfil-datos { flex: 1; min-width: 0; }

.perfil-nombre {
  font-family: 'Playfair Display', serif;
  font-size: 18px; color: var(--cream);
  margin-bottom: 6px;
}

.perfil-prep {
  font-size: 12px; color: var(--dim);
  margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.prep-label {
  font-family: 'Space Mono', monospace;
  font-size: 7px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--gold); margin-right: 6px;
}

.perfil-bio {
  font-size: 12.5px; font-weight: 300; line-height: 1.55;
  color: var(--dim);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 640px) {
  .perfiles-grid { grid-template-columns: 1fr; }
}
</style>
