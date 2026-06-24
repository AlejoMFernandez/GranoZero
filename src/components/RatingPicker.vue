<!-- Selector de puntaje 1-10 con los logos de GranoZero.
     Usa v-model: <RatingPicker v-model="rating" /> -->
<script>
export default {
  name: 'RatingPicker',
  props: {
    modelValue: { type: Number, default: 0 },
    max:        { type: Number, default: 10 },
  },
  emits: ['update:modelValue'],
  data() {
    return { hovered: 0 }
  },
  methods: {
    setHover(i)  { this.hovered = i },
    clearHover() { this.hovered = 0 },
    pick(i)      { this.$emit('update:modelValue', i) },
  },
}
</script>

<template>
  <div class="rating-picker">
    <img
      v-for="i in max"
      :key="i"
      src="/logofinal.png"
      class="rating-logo"
      :class="{ on: i <= (hovered || modelValue) }"
      @mouseenter="setHover(i)"
      @mouseleave="clearHover()"
      @click="pick(i)"
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
}
.rating-logo.on       { opacity: .9; }

.rating-num {
  font-family: 'Space Mono', monospace;
  font-size: 10px; color: var(--gold);
  margin-left: 8px; flex-shrink: 0;
}
</style>
