import { ref } from 'vue'

// ── Singleton reactivo compartido entre todos los componentes ──
const CLAVE = 'gz_favoritos'

function cargar() {
  try { return JSON.parse(localStorage.getItem(CLAVE) ?? '[]') }
  catch { return [] }
}

const lista = ref(cargar())

// ── Composable ─────────────────────────────────────────────────
export function useFavoritos() {
  function toggle(cafeId) {
    const i = lista.value.indexOf(cafeId)
    if (i >= 0) lista.value.splice(i, 1)
    else lista.value.push(cafeId)
    localStorage.setItem(CLAVE, JSON.stringify(lista.value))
  }

  function esFavorito(cafeId) {
    return lista.value.includes(cafeId)
  }

  return { favoritos: lista, toggle, esFavorito }
}
