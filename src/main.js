import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import './style.css'

const app   = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// ── Directiva global: v-reveal (IntersectionObserver scroll reveal) ──
app.directive('reveal', {
  mounted(el) {
    el.classList.add('reveal')
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('in')
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
  },
})

app.mount('#app')
