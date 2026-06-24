<script>
import BaseH1 from '../components/BaseH1.vue';
import { register } from '../services/auth';

export default {
    name: 'Register',
    components: { BaseH1 },
    data() {
        return {
            user: {
                username: '',
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
                await register({
                    username: this.user.username,
                    email: this.user.email,
                    password: this.user.password,
                });
            } catch (error) {
                this.error = error.message || 'Error al crear la cuenta. Revisá los datos.';
            }
            this.loading = false;
        }
    }
}
</script>

<template>
    <BaseH1>Crear una nueva cuenta</BaseH1>

    <form 
        action="#"
        @submit.prevent="handleSubmit"
        class="max-w-md"
        aria-label="Formulario de registro"
    >
        <p v-if="error" role="alert" class="mb-4 text-sm text-red-400 font-mono">{{ error }}</p>
        <div class="mb-4">
            <label for="username" class="form-label">Nombre de usuario</label>
            <input
                type="text"
                id="username"
                class="input-field"
                v-model="user.username"
                required
            >
        </div>
        <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input
                type="email"
                id="email"
                class="input-field"
                v-model="user.email"
            >
        </div>
        <div class="mb-4">
            <label for="password" class="form-label">Contraseña</label>
            <input
                type="password"
                id="password"
                class="input-field"
                v-model="user.password"
            >
        </div>
        <button type="submit" class="btn-primary" :disabled="loading">{{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}</button>
    </form>
</template>
