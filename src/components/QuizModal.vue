<script setup>
import { ref, computed, watch } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { cafes } from '../data/cafes.js'
import BeanIcon from './BeanIcon.vue'
import { useAuthStore } from '../stores/auth'
import { updateUserProfile } from '../services/profile'

const auth = useAuthStore()

const props = defineProps({ show: { type: Boolean, default: false } })
const emit  = defineEmits(['close'])

// Cerrar con Escape
function onKey(e) { if (e.key === 'Escape') emit('close') }
onMounted(()  => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))

// Reiniciar al abrir
watch(() => props.show, (v) => { if (v) reiniciar() })

// ── Preguntas ──────────────────────────────────────────
const PREGUNTAS = [
  {
    texto: '¿Qué buscás en una buena taza?',
    opciones: [
      { letra: 'A', texto: 'Intensidad pura. Que golpee desde el primer sorbo, sin dilución.' },
      { letra: 'B', texto: 'Equilibrio. Que sea complejo pero armonioso, sin que nada se imponga.' },
      { letra: 'C', texto: 'Suavidad. Que acompañe sin protagonismo, que envuelva.' },
      { letra: 'D', texto: 'Una sorpresa. Una nota que no viste venir.' },
    ],
  },
  {
    texto: 'Si maridás el café con algo, ¿qué elegís?',
    opciones: [
      { letra: 'A', texto: 'Nada. Solo el café — que no le robe nada al grano.' },
      { letra: 'B', texto: 'Una medialuna bien hojaldrada. El par clásico, sin falla.' },
      { letra: 'C', texto: 'Algo dulce y esponjoso. Que haya armonía entre los dos.' },
      { letra: 'D', texto: 'Un cuadradito de chocolate amargo. Para el que entiende.' },
    ],
  },
  {
    texto: '¿Cómo describís un café que estuvo muy bien?',
    opciones: [
      { letra: 'A', texto: '"Honesto." Sin artificios, sin nada que esconder.' },
      { letra: 'B', texto: '"Redondo." Todo en su lugar, nada sobrando.' },
      { letra: 'C', texto: '"Reconfortante." Como volver a algo que ya conocés bien.' },
      { letra: 'D', texto: '"Interesante." Que te dejó algo en qué pensar.' },
    ],
  },
  {
    texto: 'En una taza, ¿qué te importa más?',
    opciones: [
      { letra: 'A', texto: 'El aroma. Antes de tomarlo ya te dijo todo lo que iba a pasar.' },
      { letra: 'B', texto: 'La temperatura exacta. Que esté en su punto, ni más ni menos.' },
      { letra: 'C', texto: 'La textura. Que sea cremoso, que recubra, que permanezca.' },
      { letra: 'D', texto: 'El origen. De dónde viene el grano y cómo fue procesado.' },
    ],
  },
]

const MAPA = { A: 'espresso', B: 'cappuccino', C: 'latte', D: 'americano' }
const CAFE_EMPATE = 'cortado'

const FRASES = {
  A: 'Sos la autenticidad. Sin filtros, sin adornos. Todo está ahí desde el primer sorbo.',
  B: 'Sos el equilibrio. La forma hace al fondo. El ritual y el resultado no son cosas distintas.',
  C: 'Sos la calidez. El café como excusa para quedarse un poco más.',
  D: 'Sos la curiosidad. Encontrás profundidad donde otros solo ven un vaso largo.',
  empate: 'Sos el punto exacto. Ni demasiado ni poco — la precisión como filosofía.',
}

// ── Estado ─────────────────────────────────────────────
const paso       = ref(0)
const respuestas = ref([])
const elegida    = ref(null)
const resultado  = ref(null)

const progreso = computed(() => (paso.value / PREGUNTAS.length) * 100)

function elegir(letra) {
  if (elegida.value) return
  elegida.value = letra
  respuestas.value.push(letra)
  setTimeout(() => {
    elegida.value = null
    if (paso.value < PREGUNTAS.length - 1) {
      paso.value++
    } else {
      calcularResultado()
      paso.value = PREGUNTAS.length
    }
  }, 450)
}

function calcularResultado() {
  const votos = { A: 0, B: 0, C: 0, D: 0 }
  respuestas.value.forEach(r => votos[r]++)
  const max      = Math.max(...Object.values(votos))
  const ganadoras = Object.keys(votos).filter(k => votos[k] === max)
  const letra    = ganadoras.length > 1 ? null : ganadoras[0]
  const cafeId   = letra ? MAPA[letra] : CAFE_EMPATE
  resultado.value = {
    cafe:  cafes.find(c => c.id === cafeId),
    frase: letra ? FRASES[letra] : FRASES.empate,
  }
}

function reiniciar() {
  paso.value         = 0
  respuestas.value   = []
  elegida.value      = null
  resultado.value    = null
  guardado.value     = false
}

// ── Guardar en perfil ──────────────────────────────────
const guardado     = ref(false)
const guardando    = ref(false)

async function guardarEnPerfil() {
  if (!auth.user.id || !resultado.value) return
  guardando.value = true
  try {
    await updateUserProfile({
      userId:      auth.user.id,
      profileData: { favorite_preparation: resultado.value.cafe.id },
    })
    guardado.value = true
  } catch (e) {
    console.error(e)
  }
  guardando.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="overlay" @click.self="$emit('close')">
        <div class="quiz-modal" role="dialog" aria-modal="true">

          <!-- Header del modal -->
          <div class="quiz-modal-header">
            <div class="quiz-modal-titulo">
              <span class="eyebrow-sm">El quiz</span>
              <p class="titulo-texto">¿Qué café sos?</p>
            </div>
            <button class="btn-cerrar" @click="$emit('close')" aria-label="Cerrar">✕</button>
          </div>

          <!-- Barra de progreso (solo durante las preguntas) -->
          <div v-if="paso < PREGUNTAS.length" class="barra-wrap">
            <div class="barra-fondo">
              <div class="barra-relleno" :style="{ width: progreso + '%' }"></div>
            </div>
            <span class="barra-texto">{{ paso + 1 }} / {{ PREGUNTAS.length }}</span>
          </div>

          <!-- Contenido (pregunta o resultado) -->
          <Transition name="slide" mode="out-in">

            <!-- PREGUNTA -->
            <div v-if="paso < PREGUNTAS.length" :key="'p' + paso" class="pregunta">
              <p class="pregunta-texto">{{ PREGUNTAS[paso].texto }}</p>
              <div class="opciones">
                <button
                  v-for="op in PREGUNTAS[paso].opciones"
                  :key="op.letra"
                  class="opcion"
                  :class="{ seleccionada: elegida === op.letra, deshabilitada: elegida && elegida !== op.letra }"
                  @click="elegir(op.letra)"
                >
                  <span class="opcion-letra">{{ op.letra }}</span>
                  <span class="opcion-texto">{{ op.texto }}</span>
                </button>
              </div>
            </div>

            <!-- RESULTADO -->
            <div v-else key="resultado" class="resultado">
              <div class="resultado-top">
                <BeanIcon :size="48" color="#B8820A" :stroke="2.5" />
                <div>
                  <span class="resultado-etiqueta">Tu café es</span>
                  <p class="resultado-nombre">{{ resultado.cafe.name }}</p>
                </div>
              </div>

              <div class="resultado-linea"></div>
              <p class="resultado-frase">{{ resultado.frase }}</p>

              <div class="resultado-card">
                <span class="resultado-tag">{{ resultado.cafe.tag }}</span>
                <p class="resultado-desc">{{ resultado.cafe.desc }}</p>
                <div class="resultado-notas">
                  <span v-for="nota in resultado.cafe.notes" :key="nota" class="nota-pill">{{ nota }}</span>
                </div>
              </div>

              <!-- Guardar en perfil -->
              <div class="resultado-guardar">
                <template v-if="auth.user.id">
                  <button
                    v-if="!guardado"
                    class="btn-guardar-perfil"
                    :disabled="guardando"
                    @click="guardarEnPerfil"
                  >
                    {{ guardando ? 'Guardando…' : '♥ Guardar como favorito en mi perfil' }}
                  </button>
                  <p v-else class="guardado-ok">✓ Guardado en tu perfil</p>
                </template>
                <p v-else class="guardar-aviso">
                  Ingresá para guardar este resultado en tu perfil.
                </p>
              </div>

              <div class="resultado-acciones">
                <button class="btn-reiniciar" @click="reiniciar">Volver a empezar</button>
                <button class="btn-cerrar-final" @click="$emit('close')">Cerrar</button>
              </div>
            </div>

          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Overlay ────────────────────────────────────────── */
.overlay {
  position: fixed; inset: 0; z-index: 800;
  background: rgba(0,0,0,.75);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

/* ── Modal ──────────────────────────────────────────── */
.quiz-modal {
  background: #2a1200;
  border: 1px solid rgba(184,130,10,.2);
  width: 100%; max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 36px 36px 32px;
}

/* ── Header ─────────────────────────────────────────── */
.quiz-modal-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 28px;
}
.eyebrow-sm {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--gold); display: block; margin-bottom: 6px;
}
.titulo-texto {
  font-family: 'Playfair Display', serif;
  font-size: 28px; color: var(--cream);
}
.btn-cerrar {
  background: none; border: none;
  color: var(--dim); font-size: 14px;
  padding: 4px; transition: color .2s; flex-shrink: 0;
}
.btn-cerrar:hover { color: var(--cream); }

/* ── Barra de progreso ─────────────────────────────── */
.barra-wrap {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 28px;
}
.barra-fondo { flex: 1; height: 2px; background: rgba(250,247,240,.1); }
.barra-relleno {
  height: 100%; background: var(--gold);
  transition: width .4s ease;
}
.barra-texto {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2px; color: var(--dim);
  white-space: nowrap;
}

/* ── Pregunta ──────────────────────────────────────── */
.pregunta-texto {
  font-family: 'Playfair Display', serif;
  font-size: 24px; line-height: 1.3;
  color: var(--cream); margin-bottom: 20px;
}
.opciones { display: flex; flex-direction: column; gap: 8px; }
.opcion {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 18px;
  border: 1px solid rgba(250,247,240,.1);
  background: transparent; text-align: left;
  color: var(--mid); font-size: 14px; font-weight: 300;
  transition: border-color .2s, color .2s, background .2s, opacity .2s;
}
.opcion:hover {
  border-color: rgba(184,130,10,.5);
  color: var(--cream);
  background: rgba(184,130,10,.04);
}
.opcion.seleccionada {
  border-color: var(--gold);
  background: rgba(184,130,10,.12);
  color: var(--cream);
}
.opcion.deshabilitada { opacity: .3; pointer-events: none; }
.opcion-letra {
  font-family: 'Space Mono', monospace;
  font-size: 10px; color: var(--gold);
  min-width: 14px; flex-shrink: 0;
}

/* ── Resultado ─────────────────────────────────────── */
.resultado { display: flex; flex-direction: column; gap: 18px; }
.resultado-top { display: flex; align-items: center; gap: 18px; }
.resultado-etiqueta {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--gold); display: block; margin-bottom: 4px;
}
.resultado-nombre {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 40px; line-height: 1;
  color: var(--cream);
}
.resultado-linea { width: 36px; height: 1px; background: rgba(184,130,10,.5); }
.resultado-frase {
  font-size: 15px; font-weight: 300; line-height: 1.7;
  color: var(--mid);
}
.resultado-card {
  border: 1px solid var(--line); padding: 20px 18px;
  display: flex; flex-direction: column; gap: 10px;
}
.resultado-tag {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--gold);
}
.resultado-desc { font-size: 13px; font-weight: 300; color: var(--mid); line-height: 1.6; }
.resultado-notas { display: flex; gap: 6px; flex-wrap: wrap; }
.nota-pill {
  font-family: 'Space Mono', monospace;
  font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim); border: 1px solid var(--line); padding: 3px 8px;
}

/* ── Guardar en perfil ─────────────────────────────── */
.resultado-guardar {
  border: 1px solid var(--line);
  padding: 16px 18px;
  background: rgba(184,130,10,.04);
}
.btn-guardar-perfil {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--gold); background: none; border: none;
  transition: opacity .2s;
}
.btn-guardar-perfil:hover:not(:disabled) { opacity: .75; }
.btn-guardar-perfil:disabled { opacity: .5; }
.guardado-ok {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--gold);
}
.guardar-aviso {
  font-size: 12px; font-weight: 300; color: var(--dim);
  font-style: italic;
}

/* ── Acciones del resultado ────────────────────────── */
.resultado-acciones { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-reiniciar {
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid rgba(250,247,240,.18); color: var(--dim);
  background: transparent; padding: 11px 22px;
  transition: border-color .2s, color .2s;
}
.btn-reiniciar:hover { border-color: rgba(250,247,240,.45); color: var(--mid); }
.btn-cerrar-final {
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid rgba(184,130,10,.4); color: var(--gold);
  background: transparent; padding: 11px 22px;
  transition: background .2s, color .2s;
}
.btn-cerrar-final:hover { background: var(--gold); color: var(--brown); }

/* ── Transiciones ──────────────────────────────────── */
.modal-enter-active, .modal-leave-active { transition: opacity .25s ease; }
.modal-enter-from, .modal-leave-to       { opacity: 0; }

.slide-enter-active, .slide-leave-active {
  transition: opacity .25s ease, transform .25s ease;
}
.slide-enter-from { opacity: 0; transform: translateY(10px); }
.slide-leave-to   { opacity: 0; transform: translateY(-8px); }

/* ── Mobile ─────────────────────────────────────────── */
@media (max-width: 480px) {
  .quiz-modal { padding: 28px 22px 24px; }
  .pregunta-texto { font-size: 20px; }
  .resultado-nombre { font-size: 32px; }
}
</style>
