<!-- Selector de puntaje 1-10 con los logos de GranoZero.
     Usa v-model: <RatingPicker v-model="rating" /> -->
<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: { type: Number, default: 0 },
  max:        { type: Number, default: 10 },
})
const emit = defineEmits(['update:modelValue'])

const hovered = ref(0)
</script>

<template>
  <div class="rating-picker">
    <img
      v-for="i in max"
      :key="i"
      src="/logofinal.png"
      class="rating-logo"
      :class="{ on: i <= (hovered || modelValue) }"
      @mouseenter="hovered = i"
      @mouseleave="hovered = 0"
      @click="emit('update:modelValue', i)"
      alt=""
    />
    <span v-if="modelValue" class="rating-num">{{ modelValue }}/10</span>
  </div>
</template>

<style scoped>
.rating-picker {
  display: flex; align-items: center;
  gap: 4px; flex-wrap: nowrap;
}

.rating-logo {
  width: 17px; height: 17px;
  object-fit: contain; display: block; flex-shrink: 0;
  filter: sepia(1) saturate(4) brightness(0.75);
  opacity: .1;
  cursor: pointer;
  transition: opacity .12s, transform .1s;
}
.rating-logo.on       { opacity: .9; }
.rating-logo:hover    { transform: scale(1.15); }

.rating-num {
  font-family: 'Space Mono', monospace;
  font-size: 10px; color: var(--gold);
  margin-left: 8px; flex-shrink: 0;
}
</style>
