<!-- Sello circular -->
<script>
export default {
  name: 'BeanBadge',
  props: {
    label:   { type: String, required: true },
    variant: { type: String, default: 'dark' },
    size:    { type: Number, default: 86 },
  },
}
</script>

<template>
  <div class="sello" :class="variant" :style="{ width: size + 'px', height: size + 'px' }">
    <img src="/logofinal.png" class="sello-logo" alt="" />
    <span class="sello-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.sello {
  border-radius: 50%;
  flex-shrink: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 7px;
  border: 1px solid rgba(184,130,10,.5);
  background: var(--brown);
}

/* Logo en blanco sobre fondo oscuro */
.sello-logo {
  width: 24px; height: 24px;
  object-fit: contain; display: block;
  filter: brightness(0) invert(1);
  opacity: .4;
}

.sello-label {
  font-family: 'Space Mono', monospace;
  font-size: 7px; letter-spacing: 1px; text-transform: uppercase;
  text-align: center; line-height: 1.35;
  padding: 0 10px;
  color: var(--mid);
}

/* variantes */
.sello.gold {
  background: var(--gold);
  border-color: var(--gold);
}
/* Logo oscuro sobre fondo dorado */
.sello.gold .sello-logo  { filter: brightness(0); opacity: .35; }
.sello.gold .sello-label { color: var(--brown); }

.sello.outline {
  background: transparent;
  border: 1px dashed rgba(184,130,10,.55);
}
.sello.outline .sello-label { color: var(--dim); }
</style>
