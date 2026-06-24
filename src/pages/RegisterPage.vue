<script>
import { register } from '../services/auth'
import { cafes }    from '../data/cafes.js'

export default {
  name: 'RegisterPage',
  data() {
    return {
      username:             '',
      email:                '',
      password:             '',
      favorite_preparation: '',
      loading:              false,
      error:                null,
      cafes,
    }
  },
  methods: {
    async handleSubmit() {
      this.error   = null
      this.loading = true
      try {
        await register({
          username:             this.username,
          email:                this.email,
          password:             this.password,
          favorite_preparation: this.favorite_preparation,
        })
        this.$router.push('/')
      } catch (error) {
        this.error = error.message || 'Error al crear la cuenta. Revisá los datos.'
      }
      this.loading = false
    },
  },
}
</script>

<template>
  <div class="auth-page section">
    <div class="auth-inner">

      <h1 class="auth-titulo">Crear cuenta</h1>

      <form action="#" @submit.prevent="handleSubmit" class="auth-form">

        <p v-if="error" class="auth-error">{{ error }}</p>

        <label class="campo">
          <span>Nombre de usuario</span>
          <input v-model="username" type="text" required placeholder="como te vas a llamar" />
        </label>

        <label class="campo">
          <span>Tu café favorito</span>
          <select v-model="favorite_preparation" required>
            <option value="" disabled>— Elegí uno —</option>
            <option v-for="cafe in cafes" :key="cafe.id" :value="cafe.id">
              {{ cafe.name }}
            </option>
          </select>
        </label>

        <label class="campo">
          <span>Email</span>
          <input v-model="email" type="email" required placeholder="tu@email.com" autocomplete="email" />
        </label>

        <label class="campo">
          <span>Contraseña</span>
          <input v-model="password" type="password" required placeholder="Mínimo 6 caracteres" minlength="6" autocomplete="new-password" />
        </label>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Creando cuenta…' : 'Crear cuenta' }}
        </button>

        <p class="auth-switch">
          ¿Ya tenés cuenta?
          <RouterLink to="/ingresar">Ingresá</RouterLink>
        </p>

      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-page  { min-height: 100vh; display: flex; align-items: center; }
.auth-inner { max-width: 400px; width: 100%; margin: 0 auto; }

.auth-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 36px; font-style: italic;
  color: var(--cream); margin-bottom: 32px;
}

.auth-form { display: flex; flex-direction: column; gap: 18px; }

.auth-error {
  font-size: 12px; color: #e06060;
  border: 1px solid rgba(224,96,96,.3);
  padding: 10px 14px;
}

.campo { display: flex; flex-direction: column; gap: 6px; }
.campo span {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--dim);
}
.campo input, .campo select {
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

.btn-submit {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
  background: var(--gold); color: var(--brown);
  border: none; padding: 14px;
}
.btn-submit:disabled { opacity: .5; }

.auth-switch {
  text-align: center;
  font-size: 13px; color: var(--dim);
}
.auth-switch a { color: var(--gold); text-decoration: underline; }
</style>
