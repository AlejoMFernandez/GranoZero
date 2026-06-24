<script setup>
import { ref, watch } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { cafes } from '../data/cafes.js'
import BeanIcon from './BeanIcon.vue'

const props  = defineProps({ mode: { type: String, default: 'login' } })
const emit   = defineEmits(['close'])
const auth   = useAuthStore()
const router = useRouter()

// Estado local del formulario
const vista    = ref(props.mode)   // 'login' | 'register'
const username = ref('')
const email    = ref('')
const pass     = ref('')
const favorito = ref('')           // café favorito (obligatorio en registro)
const done     = ref(false)        // registro exitoso (muestra pantalla de email)

watch(() => props.mode, v => { vista.value = v })

// Cerrar con Escape
function onKey(e) { if (e.key === 'Escape') emit('close') }
onMounted(()  => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))

// Limpiar al cambiar de pestaña
function cambiarVista(v) {
  vista.value    = v
  auth.error     = ''
  username.value = ''
  email.value    = ''
  pass.value     = ''
  favorito.value = ''
}

function irAlPerfil() {
  emit('close')
  router.push(`/perfil/${auth.user.id}`)
}

async function submit() {
  if (vista.value === 'login') {
    await auth.login({ email: email.value, password: pass.value })
    if (!auth.error) irAlPerfil()
  } else {
    await auth.register({ username: username.value, email: email.value, password: pass.value, favorite_preparation: favorito.value })
    if (!auth.error) done.value = true   // muestra pantalla "revisá tu email"
  }
}
</script>

<template>
  <Teleport to="body">
      <div class="overlay" @click.self="$emit('close')">
        <div class="modal" role="dialog" aria-modal="true">

          <!-- Header -->
          <div class="modal-header">
            <BeanIcon :size="28" color="#B8820A" :stroke="2.5" />
            <span class="modal-brand">Grano<em>Zero</em></span>
            <button class="modal-close" @click="$emit('close')" aria-label="Cerrar">✕</button>
          </div>

          <!-- Tabs: Login / Register -->
          <div class="tabs">
            <button :class="{ active: vista === 'login' }" @click="cambiarVista('login')">
              Ingresar
            </button>
            <button :class="{ active: vista === 'register' }" @click="cambiarVista('register')">
              Registrarse
            </button>
          </div>

          <!-- Formulario -->

            <!-- Confirmación registro -->
            <div v-if="done" key="done" class="done">
              <p class="done-icon">✓</p>
              <p class="done-titulo">¡Listo! Revisá tu email.</p>
              <p class="done-sub">Te mandamos un link de confirmación a <strong>{{ email }}</strong>.</p>
              <button class="btn-submit" @click="irAlPerfil">Ver mi perfil →</button>
            </div>

            <!-- Login -->
            <form v-else-if="vista === 'login'" key="login" @submit.prevent="submit">
              <label class="campo">
                <span>Email</span>
                <input v-model="email" type="email" required placeholder="tu@email.com" />
              </label>
              <label class="campo">
                <span>Contraseña</span>
                <input v-model="pass" type="password" required placeholder="••••••••" />
              </label>

              <p v-if="auth.error" class="error">{{ auth.error }}</p>

              <button class="btn-submit" type="submit" :disabled="auth.loading">
                {{ auth.loading ? 'Ingresando…' : 'Ingresar' }}
              </button>

              <p class="switch">
                ¿No tenés cuenta?
                <button type="button" @click="cambiarVista('register')">Registrate</button>
              </p>
            </form>

            <!-- Register -->
            <form v-else key="register" @submit.prevent="submit">
              <label class="campo">
                <span>Nombre de usuario</span>
                <input v-model="username" type="text" required placeholder="como te vas a llamar" />
              </label>
              <label class="campo">
                <span>Tu café favorito</span>
                <select v-model="favorito" required>
                  <option value="" disabled>— Elegí uno —</option>
                  <option v-for="cafe in cafes" :key="cafe.id" :value="cafe.id">
                    {{ cafe.name }}
                  </option>
                </select>
              </label>
              <label class="campo">
                <span>Email</span>
                <input v-model="email" type="email" required placeholder="tu@email.com" />
              </label>
              <label class="campo">
                <span>Contraseña</span>
                <input v-model="pass" type="password" required placeholder="Mínimo 6 caracteres" minlength="6" />
              </label>

              <p v-if="auth.error" class="error">{{ auth.error }}</p>

              <button class="btn-submit" type="submit" :disabled="auth.loading">
                {{ auth.loading ? 'Creando cuenta…' : 'Crear cuenta' }}
              </button>

              <p class="switch">
                ¿Ya tenés cuenta?
                <button type="button" @click="cambiarVista('login')">Ingresá</button>
              </p>
            </form>

        </div>
      </div>
  </Teleport>
</template>

<style scoped>
/* ── Overlay ───────────────────────────────────────── */
.overlay {
  position: fixed; inset: 0; z-index: 800;
  background: rgba(0,0,0,.72);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

.modal {
  background: #2a1200;
  border: 1px solid rgba(184,130,10,.2);
  width: 100%; max-width: 400px;
  padding: 36px 32px 32px;
}

/* ── Header ────────────────────────────────────────── */
.modal-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 28px;
}
.modal-brand {
  flex: 1;
  font-family: 'Playfair Display', serif;
  font-size: 17px; color: var(--cream);
}
.modal-brand em { font-style: italic; color: var(--gold); }
.modal-close {
  background: none; border: none;
  color: var(--dim); font-size: 14px;
  padding: 4px;
}
.modal-close:hover { color: var(--cream); }

/* ── Tabs ──────────────────────────────────────────── */
.tabs {
  display: flex; gap: 0;
  border-bottom: 1px solid var(--line);
  margin-bottom: 28px;
}
.tabs button {
  flex: 1; background: none; border: none;
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim); padding: 10px;
  border-bottom: 2px solid transparent;
}
.tabs button.active {
  color: var(--gold);
  border-bottom-color: var(--gold);
}

/* ── Campos ────────────────────────────────────────── */
.campo {
  display: flex; flex-direction: column; gap: 6px;
  margin-bottom: 18px;
}
.campo span {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}
.campo input,
.campo select {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(250,247,240,.12);
  color: var(--cream);
  font-family: 'DM Sans', sans-serif; font-size: 14px;
  padding: 12px 14px; outline: none;
}
.campo select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23B8820A' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
.campo select option { background: #2a1200; }
.campo input:focus, .campo select:focus { border-color: rgba(184,130,10,.5); }
.campo input::placeholder { color: var(--dim); }

/* ── Error ─────────────────────────────────────────── */
.error {
  font-size: 12px; color: #e06060;
  margin: -6px 0 14px;
  line-height: 1.4;
}

/* ── Botón submit ──────────────────────────────────── */
.btn-submit {
  width: 100%;
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
  background: var(--gold); color: var(--brown);
  border: none; padding: 14px;
}
.btn-submit:disabled { opacity: .5; }
.btn-submit:not(:disabled):hover { opacity: .85; }

/* ── Switch ────────────────────────────────────────── */
.switch {
  text-align: center; margin-top: 18px;
  font-size: 12px; color: var(--dim);
}
.switch button {
  background: none; border: none;
  color: var(--gold); font-size: 12px;
  text-decoration: underline;
}

/* ── Confirmación ──────────────────────────────────── */
.done {
  text-align: center; display: flex;
  flex-direction: column; align-items: center; gap: 12px;
}
.done-icon { font-size: 32px; color: var(--gold); }
.done-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--cream);
}
.done-sub { font-size: 13px; color: var(--mid); line-height: 1.5; }


</style>
