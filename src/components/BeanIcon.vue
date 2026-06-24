<script>
export default {
  name: 'BeanIcon',
  props: {
    size: { type: Number, default: 40 },
  },
}
</script>

<template>
  <img
    src="/logofinal.png"
    :width="size"
    :height="size"
    alt=""
    aria-hidden="true"
    style="display:block;flex-shrink:0;object-fit:contain"
  />
</template>
