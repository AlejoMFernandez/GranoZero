<script>
import { logout } from '../services/auth'
import BeanIcon from './BeanIcon.vue'

export default {
  name: 'NavBar',
  components: { BeanIcon },
  props: {
    user: { type: Object, default: () => ({ id: null, email: null, username: null }) },
  },
  emits: ['open-quiz'],
  data() {
    return {
      dropOpen:      false,
      nosotrosOpen:  false,
      mobileOpen:    false,
      userDropOpen:  false,
      secciones: [
        { label: 'La carta',        to: '/carta',            desc: 'Los 10 tipos de café' },
        { label: 'Glosario',        to: '/glosario',         desc: '20 términos clave del especialidad' },
        { label: 'Chat',            to: '/chat',             desc: 'Comunidad en tiempo real' },
        { label: 'Reseñas',         to: '/resenas',          desc: 'Lo que opinan los cafeteros' },
        { label: 'Recomendaciones', to: '/recomendaciones',  desc: 'Los mejores lugares según la comunidad' },
      ],
      nosotros: [
        { label: 'Primera Cata', to: '/evento', desc: '5 de Julio · Lattente, San Telmo' },
      ],
    }
  },
  computed: {
    seccionesMovil() {
      return [
        ...this.secciones,
        ...this.nosotros,
        { label: 'Cafeteros', to: '/cafeteros' },
        { label: 'Planes',    to: '/precios'   },
      ]
    },
    inicial() {
      return (this.user.username || this.user.email || '?')[0].toUpperCase()
    },
  },
  methods: {
    closeAll() {
      this.dropOpen     = false
      this.nosotrosOpen = false
      this.mobileOpen   = false
      this.userDropOpen = false
    },
    async handleLogout() {
      await logout()
      this.closeAll()
    },
  },
}
</script>

<template>
  <nav class="navbar">

    <!-- Logo -->
    <RouterLink to="/" class="logo" @click="closeAll">
      <img src="/logofinal.png" alt="" class="logo-img" />
      <span class="logo-text">Grano<em>Zero</em></span>
    </RouterLink>

    <!-- Nav principal (desktop) -->
    <div class="nav-centro">

      <!-- Dropdown "Explorar" -->
      <div
        class="dropdown-wrap"
        @mouseenter="dropOpen = true"
        @mouseleave="dropOpen = false"
      >
        <button class="nav-link nav-link--drop" :class="{ open: dropOpen }">
          Explorar
          <svg width="10" height="6" viewBox="0 0 10 6" class="drop-arrow">
            <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/>
          </svg>
        </button>

        <div v-if="dropOpen" class="dropdown">
            <RouterLink
              v-for="sec in secciones"
              :key="sec.to"
              :to="sec.to"
              class="drop-item"
              @click="closeAll"
            >
              <span class="drop-label">{{ sec.label }}</span>
              <span class="drop-desc">{{ sec.desc }}</span>
            </RouterLink>
          </div>
      </div>

      <!-- Dropdown "Nosotros" -->
      <div
        class="dropdown-wrap"
        @mouseenter="nosotrosOpen = true"
        @mouseleave="nosotrosOpen = false"
      >
        <button class="nav-link nav-link--drop" :class="{ open: nosotrosOpen }">
          Nosotros
          <svg width="10" height="6" viewBox="0 0 10 6" class="drop-arrow">
            <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/>
          </svg>
        </button>
        <div v-if="nosotrosOpen" class="dropdown">
            <RouterLink
              v-for="sec in nosotros"
              :key="sec.to"
              :to="sec.to"
              class="drop-item"
              @click="closeAll"
            >
              <span class="drop-label">{{ sec.label }}</span>
              <span class="drop-desc">{{ sec.desc }}</span>
            </RouterLink>
          </div>
        </div>

      <RouterLink to="/cafeteros" class="nav-link" @click="closeAll">Cafeteros</RouterLink>

      <!-- Botón Quiz en el header -->
      <button class="nav-link nav-link--quiz" @click="$emit('open-quiz')">
        Quiz
        <span class="quiz-ornament">✦</span>
      </button>
    </div>

    <!-- Auth área (desktop) -->
    <div class="nav-auth">

      <!-- Planes — visible siempre, junto a los botones de cuenta -->
      <RouterLink to="/precios" class="nav-link nav-link--planes" @click="closeAll">Planes</RouterLink>

      <!-- Usuario logueado → avatar con dropdown -->
      <div
        v-if="user.id"
        class="user-drop-wrap"
        @mouseenter="userDropOpen = true"
        @mouseleave="userDropOpen = false"
      >
        <button class="user-avatar" :title="user.username">
          {{ inicial }}
        </button>

        <div v-if="userDropOpen" class="user-dropdown">
            <RouterLink
              :to="'/perfil/' + user.id"
              class="udrop-item"
              @click="closeAll"
            >
              Mi perfil
            </RouterLink>
            <button
              class="udrop-item udrop-item--salir"
              @click="handleLogout"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

      <!-- No logueado → botones a páginas de auth -->
      <template v-else>
        <RouterLink to="/ingresar" class="btn-acceder">Acceder</RouterLink>
      </template>
    </div>

    <!-- Hamburger mobile -->
    <button class="hamburger" @click="mobileOpen = !mobileOpen" aria-label="Menú">
      <span></span><span></span><span></span>
    </button>

  </nav>

  <!-- Menú mobile -->
  <div v-if="mobileOpen" class="mobile-menu">
      <RouterLink
        v-for="sec in seccionesMovil"
        :key="sec.to"
        :to="sec.to"
        class="mob-link"
        @click="closeAll"
      >
        {{ sec.label }}
      </RouterLink>
      <button class="mob-link mob-link--quiz" @click="$emit('open-quiz'); closeAll()">
        Quiz ✦
      </button>
      <div class="mob-auth">
        <template v-if="user.id">
          <RouterLink :to="'/perfil/' + user.id" class="mob-link" @click="closeAll">Mi perfil</RouterLink>
          <button class="mob-link" @click="handleLogout">Cerrar sesión</button>
        </template>
        <template v-else>
          <RouterLink to="/ingresar" class="mob-link mob-link--gold" @click="closeAll">Acceder</RouterLink>
        </template>
      </div>
    </div>
</template>

<style scoped>
/* navbar */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 300;
  display: flex; align-items: center;
  padding: 20px 48px; gap: 32px;
  background: rgba(20,8,0,.97);
  box-shadow: 0 1px 0 rgba(184,130,10,.12);
}

/* logo */
.logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.logo-img  { height: 26px; width: auto; }
.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 19px; color: var(--cream);
}
.logo-text em { font-style: italic; color: var(--gold); }

/* navegacion */
.nav-centro { display: flex; align-items: center; gap: 22px; flex: 1; }

.nav-link {
  background: none; border: none;
  font-size: 11px; font-weight: 500;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--dim);
  display: flex; align-items: center; gap: 5px;
}
.nav-link:hover,
.nav-link.router-link-active { color: var(--cream); }

/* quiz */
.nav-link--quiz { color: rgba(184,130,10,.75); }
.nav-link--quiz:hover { color: var(--gold); }
.quiz-ornament { font-size: 8px; opacity: .7; }

/* drpdowns */
.dropdown-wrap { position: relative; }

.nav-link--drop .drop-arrow { }
.nav-link--drop.open .drop-arrow { transform: rotate(180deg); }

.dropdown {
  position: absolute; top: calc(100% + 8px); left: -16px;
  width: 280px;
  background: rgba(20,8,0,.98);
  border: 1px solid rgba(184,130,10,.18);
  padding: 8px;
  box-shadow: 0 16px 40px rgba(0,0,0,.5);
}

/* puente */
.dropdown::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 0; right: 0;
  height: 12px;
}

.drop-item {
  display: flex; flex-direction: column; gap: 2px;
  padding: 10px 14px;
}
.drop-item:hover { background: rgba(184,130,10,.08); }

.drop-label {
  font-size: 12px; font-weight: 500;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--cream);
}
.drop-item:hover .drop-label { color: var(--gold); }

.drop-desc { font-size: 11px; font-weight: 300; color: var(--dim); }

/* acceder */
.nav-auth { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

/* icon de user */
.user-drop-wrap { position: relative; }

.user-avatar {
  width: 34px; height: 34px;
  border: 1px solid rgba(184,130,10,.4);
  background: rgba(184,130,10,.1);
  color: var(--gold);
  font-family: 'Playfair Display', serif;
  font-size: 15px; font-style: italic;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.user-avatar:hover {
  background: rgba(184,130,10,.2);
  border-color: var(--gold);
}

.user-dropdown {
  position: absolute; top: calc(100% + 8px); right: 0;
  min-width: 160px;
  background: rgba(20,8,0,.98);
  border: 1px solid rgba(184,130,10,.18);
  padding: 6px;
  box-shadow: 0 12px 32px rgba(0,0,0,.5);
}

/* puente para el dropdown de usuario también */
.user-dropdown::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 0; right: 0;
  height: 12px;
}

.udrop-item {
  display: block; width: 100%;
  padding: 10px 14px; text-align: left;
  background: none; border: none;
  font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--mid);
}
.udrop-item:hover { background: rgba(184,130,10,.08); color: var(--cream); }
.udrop-item--salir { color: rgba(250,247,240,.3); }
.udrop-item--salir:hover { color: var(--cream); }

/* link planes */
.nav-link--planes {
  font-size: 10px; letter-spacing: 2px;
  border: 1px solid rgba(184,130,10,.35);
  color: rgba(184,130,10,.8); padding: 7px 14px;
}
.nav-link--planes:hover,
.nav-link--planes.router-link-active {
  background: rgba(184,130,10,.1);
  border-color: var(--gold); color: var(--gold);
}

/* acceder */
.btn-acceder {
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  border: 1px solid rgba(184,130,10,.5);
  color: var(--gold); background: transparent;
  padding: 8px 18px;
}
.btn-acceder:hover { background: var(--gold); color: var(--brown); }

/* menu mobile hamburguesa*/
.hamburger {
  display: none;
  flex-direction: column; gap: 5px;
  background: none; border: none; padding: 4px;
  margin-left: auto;
}
.hamburger span {
  width: 22px; height: 1.5px;
  background: var(--dim); display: block;
}
.hamburger:hover span { background: var(--cream); }

/* mobile menu */
.mobile-menu {
  position: fixed; top: 60px; left: 0; right: 0; z-index: 299;
  background: rgba(20,8,0,.98);
  border-bottom: 1px solid rgba(184,130,10,.12);
  padding: 16px 24px 24px;
  display: flex; flex-direction: column; gap: 2px;
}
.mob-link {
  background: none; border: none; text-align: left;
  font-size: 14px; font-weight: 300; letter-spacing: 1px;
  color: var(--mid); padding: 10px 0;
  border-bottom: 1px solid var(--line);
}
.mob-link:hover { color: var(--cream); }
.mob-link--gold  { color: var(--gold) !important; }
.mob-link--quiz  { color: rgba(184,130,10,.75) !important; }
.mob-auth { margin-top: 8px; display: flex; justify-content: space-between; align-items: center; }


/* responsive mobile */
@media (max-width: 900px) {
  .navbar    { padding: 18px 22px; }
  .nav-centro,
  .nav-auth  { display: none; }
  .hamburger { display: flex; }
}
</style>
