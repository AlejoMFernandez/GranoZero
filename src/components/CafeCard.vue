<script setup>
import BeanIcon from './BeanIcon.vue'
import IntensityScale from './IntensityScale.vue'

const props = defineProps({
  cafe:             { type: Object,  required: true },
  // Opcionales — solo se usan en CartaView (no en la landing)
  mostrarFavorito:  { type: Boolean, default: false },
  esFavorito:       { type: Boolean, default: false },
})
defineEmits(['select', 'toggle-favorito'])
</script>

<template>
  <article class="card" @click="$emit('select', cafe)">

    <!-- Bean decorativa -->
    <div class="bean-deco" aria-hidden="true">
      <BeanIcon :size="36" color="#FAF7F0" :stroke="5" />
    </div>

    <!-- Botón de favorito (solo en la carta completa) -->
    <button
      v-if="mostrarFavorito"
      class="btn-favorito"
      :class="{ activo: esFavorito }"
      :title="esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'"
      @click.stop="$emit('toggle-favorito', cafe.id)"
    >
      {{ esFavorito ? '♥' : '♡' }}
    </button>

    <span class="card-tag">{{ cafe.tag }}</span>
    <h3 class="card-name">{{ cafe.name }}</h3>
    <div class="card-line"></div>
    <p class="card-desc">{{ cafe.desc }}</p>

    <div class="card-specs">
      <span v-for="(val, key) in cafe.specs" :key="key" class="card-spec">{{ val }}</span>
    </div>

    <div class="card-footer">
      <IntensityScale :value="cafe.intensity" />
      <span class="card-cta">Ver más →</span>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--brown);
  padding: 32px 28px;
  position: relative; overflow: hidden;
  transition: background .22s, border-color .22s;
  border: 1px solid transparent;
}
.card:hover {
  background: rgba(184,130,10,.05);
  border-color: rgba(184,130,10,.2);
}

.bean-deco {
  position: absolute; top: 16px; right: 16px;
  opacity: .11; pointer-events: none;
}

/* ── Botón favorito ─────────────────────────────────── */
.btn-favorito {
  position: absolute; top: 14px; left: 14px;
  background: none; border: none;
  font-size: 16px;
  color: rgba(250,247,240,.2);
  transition: color .2s, transform .15s;
  z-index: 2;
  line-height: 1;
}
.btn-favorito:hover  { color: var(--gold); transform: scale(1.15); }
.btn-favorito.activo { color: var(--gold); }

.card-tag {
  display: block;
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--gold); margin-bottom: 14px;
}

.card-name {
  font-family: 'Playfair Display', serif;
  font-size: 26px; color: var(--cream); margin-bottom: 10px;
}

.card-line {
  width: 28px; height: 1px;
  background: rgba(184,130,10,.45); margin-bottom: 13px;
}

.card-desc {
  font-size: 13.5px; font-weight: 300;
  color: var(--mid); line-height: 1.6; margin-bottom: 18px;
}

.card-specs {
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;
}
.card-spec {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1px;
  color: var(--dim); padding: 3px 8px;
  border: 1px solid rgba(250,247,240,.1);
}

.card-footer {
  display: flex; align-items: center; justify-content: space-between;
}

.card-cta {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--dim); transition: color .2s;
}
.card:hover .card-cta { color: var(--gold); }
</style>
