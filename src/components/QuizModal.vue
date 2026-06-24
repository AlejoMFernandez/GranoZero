<script>
import { cafes } from '../data/cafes.js'
import BeanIcon from './BeanIcon.vue'

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

const RESULTADO_FIJO = {
  cafe:  cafes.find(c => c.id === 'cortado'),
  frase: 'Sos el equilibrio. Ni demasiado ni poco — la precisión como filosofía.',
}

export default {
  name: 'QuizModal',
  components: { BeanIcon },
  emits: ['close'],
  data() {
    return {
      preguntas:  PREGUNTAS,
      paso:       0,
      elegida:    null,
      resultado:  null,
    }
  },
  methods: {
    elegir(letra) {
      if (this.elegida) return
      this.elegida = letra
      setTimeout(() => {
        this.elegida = null
        if (this.paso < this.preguntas.length - 1) {
          this.paso++
        } else {
          this.resultado = RESULTADO_FIJO
          this.paso = this.preguntas.length
        }
      }, 450)
    },
    reiniciar() {
      this.paso      = 0
      this.elegida   = null
      this.resultado = null
    },
  },
  mounted() {
    this.reiniciar()
  },
}
</script>

<template>
  <div class="overlay" @click.self="$emit('close')">
      <div class="quiz-modal" role="dialog" aria-modal="true">

          <!-- Header del modal -->
          <div class="quiz-modal-header">
            <div class="quiz-modal-titulo">
              <span class="eyebrow-sm">El quiz</span>
              <p class="titulo-texto">¿Qué café sos?</p>
            </div>
            <button class="btn-cerrar" @click="$emit('close')" aria-label="Cerrar">✕</button>
          </div>

          <!-- Contenido (pregunta o resultado) -->
            <!-- PREGUNTA -->
            <div v-if="paso < preguntas.length" :key="'p' + paso" class="pregunta">
              <p class="pregunta-texto">{{ preguntas[paso].texto }}</p>
              <div class="opciones">
                <button
                  v-for="op in preguntas[paso].opciones"
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

              <div class="resultado-acciones">
                <button class="btn-reiniciar" @click="reiniciar">Volver a empezar</button>
                <button class="btn-cerrar-final" @click="$emit('close')">Cerrar</button>
              </div>
            </div>
        </div>
      </div>
</template>

<style scoped>
.overlay {
  position: fixed; inset: 0; z-index: 800;
  background: rgba(0,0,0,.75);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

.quiz-modal {
  background: #2a1200;
  border: 1px solid rgba(184,130,10,.2);
  width: 100%; max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 36px 36px 32px;
}

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
  padding: 4px; flex-shrink: 0;
}
.btn-cerrar:hover { color: var(--cream); }

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

.resultado-acciones { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-reiniciar {
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid rgba(250,247,240,.18); color: var(--dim);
  background: transparent; padding: 11px 22px;
}
.btn-reiniciar:hover { border-color: rgba(250,247,240,.45); color: var(--mid); }
.btn-cerrar-final {
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid rgba(184,130,10,.4); color: var(--gold);
  background: transparent; padding: 11px 22px;
}
.btn-cerrar-final:hover { background: var(--gold); color: var(--brown); }

@media (max-width: 480px) {
  .quiz-modal { padding: 28px 22px 24px; }
  .pregunta-texto { font-size: 20px; }
  .resultado-nombre { font-size: 32px; }
}
</style>
