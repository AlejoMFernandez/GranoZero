<script>
import BaseH1 from '../components/BaseH1.vue';
import { subscribeToAuthStateChanges } from '../services/auth.js';
import { fetchPublicChatMessages, sendPublicChatMessage, subscribeToPublicChatNewMessages } from '../services/public-chat';

let unsubscribeFromChat = () => {};

export default {
    name: 'PublicChat',
    components: { BaseH1 },
    data() {
        return {
            messages: [],
            loading: true,
            newMessage: {
                body: '',
            },
            authUser: {
                id: null,
                email: null,
            },
        }
    },
    methods: {
        async sendMessage() { 
            await sendPublicChatMessage({
                email: this.authUser.email,
                body: this.newMessage.body,
            });
            this.newMessage.body = '';
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleString('es-AR', {
                day: '2-digit', month: 'short',
                hour: '2-digit', minute: '2-digit',
            });
        },
    },
    async mounted() {
        subscribeToAuthStateChanges(newUserData => this.authUser = newUserData);
        unsubscribeFromChat = subscribeToPublicChatNewMessages(newMessage => this.messages.push(newMessage));
        this.messages = await fetchPublicChatMessages();
        this.loading = false;
    },
    unmounted() {
        unsubscribeFromChat();
    },
}
</script>

<template>
    <BaseH1>Chat público</BaseH1>

    <div v-if="loading" class="flex items-center gap-3 text-crema-muted py-8">
        <span class="loading-spinner"></span>
        <span class="font-mono text-xs tracking-widest uppercase">Cargando mensajes...</span>
    </div>

    <div v-else class="flex flex-col gap-4 max-w-2xl">
        <section>
            <h2 class="sr-only">Lista de mensajes</h2>
                <ol class="flex flex-col gap-2 h-[500px] overflow-y-auto border border-cafe-borde rounded-xl bg-cafe-medio p-4" aria-label="Mensajes del chat">
                <article
                    v-for="message in messages"
                    :key="message.id"
                    class="p-3 rounded-lg bg-cafe-oscuro border border-cafe-borde"
                >
                    <div class="mb-1"><b class="text-dorado font-mono text-sm">{{ message.email }}</b></div>
                    <div class="mb-1 text-crema">{{ message.body }}</div>
                    <div class="text-xs text-crema-muted font-mono">{{ formatDate(message.created_at) }}</div>
                </article>
            </ol>
        </section>

        <section>
            <div v-if="!authUser.id" class="text-sm text-crema-muted">
                Tenés que <RouterLink to="/ingresar" class="text-dorado underline">ingresar</RouterLink> para enviar mensajes.
            </div>
            <form v-else action="#" @submit.prevent="sendMessage" class="flex gap-3 items-end" aria-label="Enviar mensaje">
                <label for="body" class="sr-only">Mensaje</label>
                <textarea
                    id="body"
                    class="input-field flex-1 resize-none"
                    rows="2"
                    v-model="newMessage.body"
                    placeholder="Escribí tu mensaje..."
                    aria-label="Escribí tu mensaje"
                ></textarea>
                <button type="submit" class="btn-primary shrink-0" aria-label="Enviar mensaje">Enviar</button>
            </form>
        </section>
    </div>

</template>
