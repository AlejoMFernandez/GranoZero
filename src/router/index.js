import { createRouter, createWebHistory } from 'vue-router'

// Páginas — carga lazy para mejor performance
const HomeView      = () => import('../pages/HomeView.vue')
const CartaView     = () => import('../pages/CartaView.vue')
const GlosarioView  = () => import('../pages/GlosarioView.vue')
const ChatPage      = () => import('../pages/ChatPage.vue')
const ProfilePage   = () => import('../pages/ProfilePage.vue')
const CafeterosPage = () => import('../pages/CafeterosPage.vue')
const PreciosPage   = () => import('../pages/PreciosPage.vue')
const ResenasPage   = () => import('../pages/ResenasPage.vue')
const MarcaPage     = () => import('../pages/MarcaPage.vue')
const EventoPage          = () => import('../pages/EventoPage.vue')
const RecomendacionesPage = () => import('../pages/RecomendacionesPage.vue')

const routes = [
  { path: '/',              component: HomeView,      name: 'home'      },
  { path: '/carta',         component: CartaView,     name: 'carta'     },
  { path: '/glosario',      component: GlosarioView,  name: 'glosario'  },
  { path: '/chat',          component: ChatPage,      name: 'chat'      },
  { path: '/perfil/:id',    component: ProfilePage,   name: 'perfil'    },
  { path: '/cafeteros',     component: CafeterosPage, name: 'cafeteros' },
  { path: '/precios',       component: PreciosPage,   name: 'precios'   },
  { path: '/resenas',       component: ResenasPage,   name: 'resenas'   },
  { path: '/marca',         component: MarcaPage,     name: 'marca'     },
  { path: '/evento',          component: EventoPage,          name: 'evento'          },
  { path: '/recomendaciones', component: RecomendacionesPage, name: 'recomendaciones' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll al top al cambiar de página, excepto si hay hash (anchor)
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})
