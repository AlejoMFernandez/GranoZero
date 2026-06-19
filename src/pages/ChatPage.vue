<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useAuthStore } from '../stores/auth'
import {
  fetchPublicChatMessages,
  sendPublicChatMessage,
  subscribeToPublicChatNewMessages,
} from '../services/public-chat'

const auth     = useAuthStore()
const messages = ref([])
const body     = ref('')
const sending  = ref(false)
const listRef  = ref(null)
let unsubscribe = null

onMounted(async () => {
  messages.value = await fetchPublicChatMessages()
  scrollAbajo()

  unsubscribe = subscribeToPublicChatNewMessages(msg => {
    messages.value.push(msg)
    nextTick(scrollAbajo)
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

function scrollAbajo() {
  nextTick(() => {
    if (listRef.value) listRef.value.scrollTop = listRef.value.scrollHeight
  })
}

async function enviar() {
  if (!body.value.trim() || sending.value) return
  sending.value = true
  try {
    await sendPublicChatMessage({ email: auth.user.email, body: body.value.trim() })
    body.value = ''
  } catch (e) {
    console.error(e)
  }
  sending.value = false
}

function onEnter(e) {
  if (!e.shiftKey) {
    e.preventDefault()
    enviar()
  }
}

function esPropio(msg) {
  return msg.email === auth.user.email
}

function nombre(msg) {
  if (esPropio(msg) && auth.user.username) return auth.user.username
  return msg.email?.split('@')[0] ?? 'anónimo'
}

function inicial(msg) {
  return nombre(msg)[0].toUpperCase()
}

function hora(ts) {
  return new Date(ts).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="chat-page">

    <!-- Header -->
    <div class="chat-header">
      <span class="eyebrow">Comunidad</span>
      <h1 class="chat-titulo">Chat público</h1>
      <p class="chat-sub">Un espacio para hablar de café con quienes también lo entienden.</p>
    </div>

    <!-- Lista de mensajes -->
    <div ref="listRef" class="chat-lista">

      <div v-if="messages.length === 0" class="chat-vacio">
        <p>Todavía no hay mensajes. ¡Empezá la conversación!</p>
      </div>

      <div
        v-for="msg in messages"
        :key="msg.id"
        class="mensaje"
        :class="{ propio: esPropio(msg) }"
      >
        <!-- Avatar solo para mensajes de otros -->
        <div v-if="!esPropio(msg)" class="msg-avatar">{{ inicial(msg) }}</div>

        <!-- Burbuja -->
        <div class="msg-body">
          <div v-if="!esPropio(msg)" class="msg-meta">
            <span class="msg-autor">{{ nombre(msg) }}</span>
            <span class="msg-hora">{{ hora(msg.created_at) }}</span>
          </div>
          <div class="msg-burbuja">
            {{ msg.body }}
            <span v-if="esPropio(msg)" class="msg-hora-propio">{{ hora(msg.created_at) }}</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Input -->
    <div class="chat-input-wrap">
      <div v-if="!auth.user.id" class="chat-login-aviso">
        <p>Ingresá o registrate para participar en el chat.</p>
      </div>
      <form v-else class="chat-form" @submit.prevent="enviar">
        <textarea
          v-model="body"
          class="chat-textarea"
          placeholder="Escribí algo sobre café…"
          rows="2"
          maxlength="400"
          @keydown.enter="onEnter"
        ></textarea>
        <button class="chat-btn-enviar" type="submit" :disabled="!body.trim() || sending">
          {{ sending ? '…' : 'Enviar' }}
        </button>
      </form>
    </div>

  </div>
</template>

<style scoped>
/* ── Layout ─────────────────────────────────────────── */
.chat-page {
  display: flex; flex-direction: column;
  height: 100vh;
  padding-top: 76px;
}

/* ── Header ─────────────────────────────────────────── */
.chat-header {
  border-bottom: 1px solid var(--line);
  padding: 20px 48px;
  flex-shrink: 0;
}
.chat-titulo {
  font-family: 'Playfair Display', serif;
  font-size: 28px; color: var(--cream);
  margin: 4px 0 6px;
}
.chat-sub {
  font-size: 13px; font-weight: 300; color: var(--dim);
}

/* ── Lista ──────────────────────────────────────────── */
.chat-lista {
  flex: 1; overflow-y: auto;
  padding: 24px 32px;
  display: flex; flex-direction: column; gap: 14px;
}

/* ── Mensaje ────────────────────────────────────────── */
.mensaje {
  display: flex; gap: 10px; align-items: flex-end;
  max-width: 70%;
}
.mensaje.propio {
  align-self: flex-end;
  flex-direction: row-reverse;
}

/* ── Avatar ─────────────────────────────────────────── */
.msg-avatar {
  width: 32px; height: 32px; flex-shrink: 0;
  background: rgba(184,130,10,.12);
  border: 1px solid rgba(184,130,10,.2);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 13px; font-style: italic; color: var(--gold);
  border-radius: 50%;
}

/* ── Body del mensaje ───────────────────────────────── */
.msg-body {
  display: flex; flex-direction: column; gap: 4px;
}
.mensaje.propio .msg-body { align-items: flex-end; }

.msg-meta {
  display: flex; gap: 8px; align-items: baseline;
  padding-left: 4px;
}
.msg-autor {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1.5px; text-transform: lowercase;
  color: var(--gold);
}
.msg-hora {
  font-family: 'Space Mono', monospace;
  font-size: 8px; color: var(--dim);
}

/* ── Burbuja ────────────────────────────────────────── */
.msg-burbuja {
  padding: 10px 14px;
  background: rgba(250,247,240,.07);
  border: 1px solid rgba(250,247,240,.09);
  border-radius: 16px 16px 16px 4px;
  font-size: 14px; font-weight: 300; line-height: 1.55;
  color: var(--cream);
}
.mensaje.propio .msg-burbuja {
  background: rgba(184,130,10,.15);
  border-color: rgba(184,130,10,.3);
  border-radius: 16px 16px 4px 16px;
}

.msg-hora-propio {
  display: block;
  font-family: 'Space Mono', monospace;
  font-size: 8px; color: rgba(184,130,10,.5);
  text-align: right; margin-top: 4px;
}

/* ── Estado vacío ───────────────────────────────────── */
.chat-vacio {
  flex: 1; display: flex; align-items: center; justify-content: center;
}
.chat-vacio p {
  font-size: 14px; font-weight: 300; color: var(--dim); font-style: italic;
}

/* ── Input ──────────────────────────────────────────── */
.chat-input-wrap {
  border-top: 1px solid var(--line);
  padding: 14px 32px;
  flex-shrink: 0;
}
.chat-login-aviso {
  text-align: center; padding: 8px 0;
  font-size: 13px; color: var(--dim); font-style: italic;
}
.chat-form {
  display: flex; gap: 10px; align-items: flex-end;
  max-width: 820px; margin: 0 auto;
}
.chat-textarea {
  flex: 1; resize: none;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(250,247,240,.1);
  color: var(--cream);
  font-family: 'DM Sans', sans-serif; font-size: 14px;
  padding: 10px 14px; outline: none;
  border-radius: 8px;
  transition: border-color .2s;
  line-height: 1.5;
}
.chat-textarea:focus { border-color: rgba(184,130,10,.4); }
.chat-textarea::placeholder { color: var(--dim); }

.chat-btn-enviar {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid rgba(184,130,10,.5); color: var(--gold);
  background: transparent; padding: 10px 20px;
  border-radius: 6px;
  transition: background .2s, color .2s;
  flex-shrink: 0;
}
.chat-btn-enviar:hover:not(:disabled) { background: var(--gold); color: var(--brown); }
.chat-btn-enviar:disabled { opacity: .4; }

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 640px) {
  .chat-header     { padding: 16px 20px; }
  .chat-lista      { padding: 16px 20px; }
  .chat-input-wrap { padding: 12px 20px; }
  .mensaje         { max-width: 85%; }
}
</style>
