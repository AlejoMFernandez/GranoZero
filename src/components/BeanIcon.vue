<script setup>
defineProps({
  size:   { type: Number, default: 40 },
  color:  { type: String, default: 'currentColor' },
  stroke: { type: Number, default: 3 },
})
</script>

<template>
  <svg
    viewBox="0 0 100 140"
    :width="size"
    :height="size * 1.4"
    aria-hidden="true"
    style="display:block;flex-shrink:0"
  >
    <path
      d="M50 6 C78 6,94 36,94 70 C94 104,78 134,50 134 C22 134,6 104,6 70 C6 36,22 6,50 6Z"
      fill="none" :stroke="color" :stroke-width="stroke" stroke-linejoin="round"
    />
    <path
      d="M32 28 C56 44,48 70,60 84 C72 98,60 118,36 116"
      fill="none" :stroke="color" :stroke-width="stroke * 0.85" stroke-linecap="round"
    />
  </svg>
</template>
