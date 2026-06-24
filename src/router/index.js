// ruteo de todos los indexs
import { createRouter, createWebHistory } from 'vue-router'

const HomeView      = () => import('../pages/HomeView.vue')
const CartaView     = () => import('../pages/CartaView.vue')
const GlosarioView  = () => import('../pages/GlosarioView.vue')
const ChatPage      = () => import('../pages/ChatPage.vue')
const ProfilePage   = () => import('../pages/ProfilePage.vue')
const CafeterosPage = () => import('../pages/CafeterosPage.vue')
const PreciosPage   = () => import('../pages/PreciosPage.vue')
const ResenasPage   = () => import('../pages/ResenasPage.vue')
const EventoPage          = () => import('../pages/EventoPage.vue')
const RecomendacionesPage = () => import('../pages/RecomendacionesPage.vue')
const LoginPage    = () => import('../pages/LoginPage.vue')
const RegisterPage = () => import('../pages/RegisterPage.vue')

const routes = [
  { path: '/',              component: HomeView,      name: 'home'      },
  { path: '/carta',         component: CartaView,     name: 'carta'     },
  { path: '/glosario',      component: GlosarioView,  name: 'glosario'  },
  { path: '/chat',          component: ChatPage,      name: 'chat'      },
  { path: '/perfil/:id',    component: ProfilePage,   name: 'perfil'    },
  { path: '/cafeteros',     component: CafeterosPage, name: 'cafeteros' },
  { path: '/precios',       component: PreciosPage,   name: 'precios'   },
  { path: '/resenas',       component: ResenasPage,   name: 'resenas'   },
  { path: '/evento',          component: EventoPage,          name: 'evento'          },
  { path: '/recomendaciones', component: RecomendacionesPage, name: 'recomendaciones' },
  { path: '/ingresar',        component: LoginPage,           name: 'login'           },
  { path: '/crear-cuenta',    component: RegisterPage,        name: 'register'        },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})
