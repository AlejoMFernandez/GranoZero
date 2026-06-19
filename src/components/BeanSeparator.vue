<!-- Ornamento separador del universo visual GranoZero:
     línea dorada — grano oval — línea dorada  (Universo Visual 03 · Nivel 02) -->
<template>
  <div class="sep" aria-hidden="true">
    <span class="sep-linea"></span>
    <img src="/logofinal.png" class="sep-logo" alt="" />
    <span class="sep-linea"></span>
  </div>
</template>

<style scoped>
.sep {
  display: flex;
  align-items: center;
}

.sep-linea {
  flex: 1;
  height: 1px;
  background: rgba(184,130,10,.35);
}

/* Logo GranoZero al centro — se muestra con sus colores naturales */
.sep-logo {
  width: 16px; height: 16px;
  object-fit: contain; display: block;
  flex-shrink: 0;
  margin: 0 12px;
  opacity: .85;
}
</style>
