<script>
import { login } from '../../services/auth';

export default {
    name: 'LoginForm',
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
            error: null,
        }
    },
    methods: {
        async handleSubmit() {
            this.error = null;
            try {
                this.loading = true;
                await login({
                    email: this.user.email,
                    password: this.user.password,
                });
            } catch (error) {
                this.error = 'Email o contraseña incorrectos.';
            }
            this.loading = false;
        }
    }
}
</script>

<template>
    <form 
        action="#"
        @submit.prevent="handleSubmit"
        aria-label="Formulario de inicio de sesión"
    >
        <p v-if="error" role="alert" class="mb-4 text-sm text-red-400 font-mono">{{ error }}</p>
        <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input
                type="email"
                id="email"
                class="input-field"
                v-model="user.email"
                autocomplete="email"
                required
            >
        </div>
        <div class="mb-4">
            <label for="password" class="form-label">Contraseña</label>
            <input
                type="password"
                id="password"
                class="input-field"
                v-model="user.password"
                autocomplete="current-password"
                required
            >
        </div>
        <button type="submit" class="btn-primary" :disabled="loading">{{ loading ? 'Ingresando...' : 'Ingresar' }}</button>
    </form>
</template>
