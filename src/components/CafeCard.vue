<script>
import BeanIcon from './BeanIcon.vue'
import IntensityScale from './IntensityScale.vue'

export default {
  name: 'CafeCard',
  components: { BeanIcon, IntensityScale },
  props: {
    cafe: { type: Object, required: true },
  },
  emits: ['select'],
}
</script>

<template>
  <article class="card" @click="$emit('select', cafe)">

    <!-- logo decorativo usando el BEANICON component -->
    <div class="bean-deco" aria-hidden="true">
      <BeanIcon :size="36" color="#FAF7F0" :stroke="5" />
    </div>

    <span class="card-tag">{{ cafe.tag }}</span>
    <h3 class="card-name">{{ cafe.name }}</h3>
    <div class="card-line"></div>
    <p class="card-desc">{{ cafe.desc }}</p>

    <div class="card-specs">
      <span v-for="(val, key) in cafe.specs" :key="key" class="card-spec">{{ val }}</span>
    </div>

    <div class="card-footer">
      <IntensityScale :value="cafe.intensity" />
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--brown);
  padding: 32px 28px;
  position: relative; overflow: hidden;
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
  color: var(--dim);
}
.card:hover .card-cta { color: var(--gold); }
</style>
