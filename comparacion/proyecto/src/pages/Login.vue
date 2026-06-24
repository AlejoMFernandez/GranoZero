<script>
import LoginForm from '../components/auth/LoginForm.vue';
import BaseH1 from '../components/BaseH1.vue';
import { login } from '../services/auth';

export default {
    name: 'Login',
    components: { BaseH1, LoginForm },
}
</script>

<template>
    <BaseH1>Ingresar a mi cuenta</BaseH1>

    <LoginForm
    />
</template>
