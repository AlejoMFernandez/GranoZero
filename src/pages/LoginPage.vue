<script>
import { login } from '../services/auth'

export default {
  name: 'LoginPage',
  data() {
    return {
      email:    '',
      password: '',
      loading:  false,
      error:    null,
    }
  },
  methods: {
    async handleSubmit() {
      this.error   = null
      this.loading = true
      try {
        await login({ email: this.email, password: this.password })
        this.$router.push('/')
      } catch (error) {
        this.error = 'Email o contraseña incorrectos.'
      }
      this.loading = false
    },
  },
}
</script>

<template>
  <div class="auth-page section">
    <div class="auth-inner">

      <h1 class="auth-titulo">Ingresar</h1>

      <form action="#" @submit.prevent="handleSubmit" class="auth-form">

        <p v-if="error" class="auth-error">{{ error }}</p>

        <label class="campo">
          <span>Email</span>
          <input v-model="email" type="email" required placeholder="tu@email.com" autocomplete="email" />
        </label>

        <label class="campo">
          <span>Contraseña</span>
          <input v-model="password" type="password" required placeholder="••••••••" autocomplete="current-password" />
        </label>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Ingresando…' : 'Ingresar' }}
        </button>

        <p class="auth-switch">
          ¿No tenés cuenta?
          <RouterLink to="/crear-cuenta">Registrate</RouterLink>
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
.campo input:focus { border-color: rgba(184,130,10,.5); }
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
