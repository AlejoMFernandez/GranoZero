import { defineConfig } from 'vite'
import vue    from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),

    // ── PWA ──────────────────────────────────────────
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'GranoZero',
        short_name: 'GranoZero',
        description: 'Café de especialidad — conocé cada café y descubrí cuál sos vos.',
        theme_color: '#3E1C00',
        background_color: '#3E1C00',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/logofinal.png', sizes: '192x192', type: 'image/png' },
          { src: '/logofinal.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
