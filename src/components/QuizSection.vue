<script setup>
import { ref, computed } from 'vue'
import { cafes } from '../data/cafes.js'
import BeanIcon from './BeanIcon.vue'

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

// Letra → id del café en cafes.js
const MAPA = {
  A: 'espresso',
  B: 'cappuccino',
  C: 'latte',
  D: 'americano',
}
const CAFE_EMPATE = 'cortado'

const FRASES = {
  A: 'Sos la autenticidad. Sin filtros, sin adornos. Todo está ahí desde el primer sorbo.',
  B: 'Sos el equilibrio. La forma hace al fondo. El ritual y el resultado no son cosas distintas.',
  C: 'Sos la calidez. El café como excusa para quedarse un poco más.',
  D: 'Sos la curiosidad. Encontrás profundidad donde otros solo ven un vaso largo.',
  empate: 'Sos el punto exacto. Ni demasiado ni poco — la precisión como filosofía.',
}

// ── Estado ─────────────────────────────────────────────
const paso       = ref(0)          // 0..3 = preguntas, 4 = resultado
const respuestas = ref([])         // letras elegidas
const elegida    = ref(null)       // letra resaltada antes de avanzar
const resultado  = ref(null)       // { cafe, frase }

// Barra de progreso (0 a 100)
const progreso = computed(() => (paso.value / PREGUNTAS.length) * 100)

// ── Funciones ──────────────────────────────────────────
function elegir(letra) {
  if (elegida.value) return   // ya eligió en esta pregunta

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
  // Contar votos por letra
  const votos = { A: 0, B: 0, C: 0, D: 0 }
  respuestas.value.forEach(r => votos[r]++)

  const max    = Math.max(...Object.values(votos))
  const ganadoras = Object.keys(votos).filter(k => votos[k] === max)

  const letra = ganadoras.length > 1 ? null : ganadoras[0]
  const cafeId = letra ? MAPA[letra] : CAFE_EMPATE
  const frase  = letra ? FRASES[letra] : FRASES.empate

  resultado.value = {
    cafe:  cafes.find(c => c.id === cafeId),
    frase,
  }
}

function reiniciar() {
  paso.value       = 0
  respuestas.value = []
  elegida.value    = null
  resultado.value  = null
}
</script>

<template>
  <section id="quiz" class="section quiz-section">

    <!-- Header -->
    <div class="quiz-header">
      <span v-reveal class="eyebrow">El quiz</span>
      <h2 v-reveal class="sec-title">¿Qué café sos?</h2>
      <p v-reveal class="sec-sub">Cuatro preguntas. Una respuesta sobre vos.</p>
    </div>

    <div class="quiz-centro">

      <!-- Barra de progreso -->
      <div v-if="paso < PREGUNTAS.length" class="barra-wrap">
        <div class="barra-fondo">
          <div class="barra-relleno" :style="{ width: progreso + '%' }"></div>
        </div>
        <span class="barra-texto">{{ paso + 1 }} / {{ PREGUNTAS.length }}</span>
      </div>

      <!-- Transición entre pregunta y resultado -->
      <Transition name="slide" mode="out-in">

        <!-- PREGUNTAS -->
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
            <BeanIcon :size="56" color="#B8820A" :stroke="2.5" />
            <div>
              <span class="resultado-etiqueta">Tu café es</span>
              <p class="resultado-nombre">{{ resultado.cafe.name }}</p>
            </div>
          </div>

          <div class="resultado-linea"></div>
          <p class="resultado-frase">{{ resultado.frase }}</p>

          <!-- Mini card del café resultado -->
          <div class="resultado-card">
            <span class="resultado-tag">{{ resultado.cafe.tag }}</span>
            <p class="resultado-desc">{{ resultado.cafe.desc }}</p>
            <div class="resultado-notas">
              <span v-for="nota in resultado.cafe.notes" :key="nota" class="nota-pill">{{ nota }}</span>
            </div>
          </div>

          <button class="btn-reiniciar" @click="reiniciar">Volver a empezar</button>
        </div>

      </Transition>
    </div>
  </section>
</template>

<style scoped>
.quiz-section { background: var(--brown); }
.quiz-header  { margin-bottom: 52px; }
.quiz-centro  { max-width: 640px; }

/* ── Barra de progreso ─────────────────────────────── */
.barra-wrap  { display: flex; align-items: center; gap: 16px; margin-bottom: 36px; }
.barra-fondo { flex: 1; height: 2px; background: rgba(250,247,240,.1); }
.barra-relleno {
  height: 100%; background: var(--gold);
  transition: width .4s ease;
}
.barra-texto {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2px; color: var(--dim);
  white-space: nowrap;
}

/* ── Pregunta ──────────────────────────────────────── */
.pregunta-texto {
  font-family: 'Playfair Display', serif;
  font-size: 30px; line-height: 1.25;
  color: var(--cream); margin-bottom: 24px;
}

.opciones { display: flex; flex-direction: column; gap: 8px; }

.opcion {
  display: flex; align-items: center; gap: 16px;
  padding: 16px 22px;
  border: 1px solid rgba(250,247,240,.1);
  background: transparent; text-align: left;
  color: var(--mid); font-size: 15px; font-weight: 300;
  transition: border-color .2s, color .2s, background .2s, opacity .2s;
}
.opcion:hover {
  border-color: rgba(184,130,10,.5);
  color: var(--cream);
  background: rgba(184,130,10,.04);
}

/* Estado: opción seleccionada */
.opcion.seleccionada {
  border-color: var(--gold);
  background: rgba(184,130,10,.12);
  color: var(--cream);
}

/* Estado: opción no elegida cuando ya hay una elegida */
.opcion.deshabilitada {
  opacity: .3;
  pointer-events: none;
}

.opcion-letra {
  font-family: 'Space Mono', monospace;
  font-size: 10px; color: var(--gold);
  min-width: 14px; flex-shrink: 0;
}

/* ── Resultado ─────────────────────────────────────── */
.resultado { display: flex; flex-direction: column; gap: 20px; }

.resultado-top    { display: flex; align-items: center; gap: 20px; }
.resultado-etiqueta {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
  color: var(--gold); display: block; margin-bottom: 6px;
}
.resultado-nombre {
  font-family: 'Playfair Display', serif;
  font-style: italic; font-size: 52px; line-height: 1;
  color: var(--cream);
}

.resultado-linea {
  width: 40px; height: 1px; background: rgba(184,130,10,.5);
}

.resultado-frase {
  font-size: 17px; font-weight: 300; line-height: 1.7;
  color: var(--mid); max-width: 460px;
}

/* Mini card del café */
.resultado-card {
  border: 1px solid var(--line);
  padding: 24px 22px;
  display: flex; flex-direction: column; gap: 10px;
}
.resultado-tag {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--gold);
}
.resultado-desc {
  font-size: 14px; font-weight: 300;
  color: var(--mid); line-height: 1.6;
}
.resultado-notas { display: flex; gap: 8px; flex-wrap: wrap; }
.nota-pill {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim); border: 1px solid var(--line); padding: 4px 10px;
}

.btn-reiniciar {
  font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid rgba(250,247,240,.18); color: var(--dim);
  background: transparent; padding: 11px 26px;
  width: fit-content;
  transition: border-color .2s, color .2s;
}
.btn-reiniciar:hover { border-color: rgba(250,247,240,.5); color: var(--mid); }

/* ── Transición ────────────────────────────────────── */
.slide-enter-active, .slide-leave-active {
  transition: opacity .28s ease, transform .28s ease;
}
.slide-enter-from { opacity: 0; transform: translateY(12px); }
.slide-leave-to   { opacity: 0; transform: translateY(-10px); }

/* ── Mobile ────────────────────────────────────────── */
@media (max-width: 640px) {
  .pregunta-texto { font-size: 24px; }
  .resultado-nombre { font-size: 42px; }
  .resultado-top { flex-wrap: wrap; }
}
</style>
