<!-- Escala de intensidad -->
<script>
export default {
  name: 'IntensityScale',
  props: {
    value: { type: Number, required: true },
    max:   { type: Number, default: 10 },
  },
}
</script>

<template>
  <div class="escala">
    <img
      v-for="i in max"
      :key="i"
      src="/logofinal.png"
      class="escala-logo"
      :class="{ on: i <= value }"
      alt=""
    />
  </div>
</template>

<style scoped>
.escala { display: flex; gap: 4px; align-items: center; flex-wrap: nowrap; }

.escala-logo {
  width: 17px; height: 17px;
  object-fit: contain; display: block;
  filter: sepia(1) saturate(4) brightness(0.75);
  opacity: .1;
  flex-shrink: 0;
}
.escala-logo.on { opacity: .9; }
</style>
