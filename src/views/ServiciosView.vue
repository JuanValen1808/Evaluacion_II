<!-- src/views/ServiciosView.vue -->
<template>
  <div class="view-container">
    <h1>Catálogo de Servicios</h1>
    <p>Explora los servicios disponibles en la Región de Ñuble.</p>

    <!-- Estado 1: Carga -->
    <div v-if="cargando" class="estado-carga">
      <p>Cargando servicios...</p>
    </div>

    <!-- Estado 2: Error -->
    <div v-else-if="error" class="mensaje-error">
      <p>Ocurrió un error al cargar el catálogo de servicios. Por favor, intenta más tarde.</p>
    </div>

    <!-- Estado 3: Éxito -->
    <div v-else>
      <!-- Panel de búsqueda y filtro -->
      <div class="filtros-container">
        <div class="filtro-grupo">
          <label for="buscar">Buscar por nombre:</label>
          <input 
            id="buscar"
            type="text" 
            v-model="textoBusqueda" 
            placeholder="Escribe un servicio..." 
            class="input-control"
          />
        </div>

        <div class="filtro-grupo">
          <label for="categoria">Categoría:</label>
          <select id="categoria" v-model="categoriaSeleccionada" class="input-control">
            <option value="">Todas las categorías</option>
            <option v-for="cat in categorias" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
      </div>

      <!-- Renderizado condicional del catálogo -->
      <div v-if="serviciosFiltrados.length > 0" class="servicios-grid">
        <ServicioCard 
          v-for="item in serviciosFiltrados" 
          :key="item.id" 
          :servicio="item" 
          :es-favorito="favoritosIds.includes(item.id)"
          @toggle-favorito="toggleFavorito"
        />
      </div>

      <!-- Mensaje cuando no hay resultados de búsqueda -->
      <div v-else class="mensaje-vacio">
        <p>No se encontraron servicios para los criterios seleccionados.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { obtenerServicios } from '../services/serviciosService.js'
import ServicioCard from '../components/ServicioCard.vue'

const servicios = ref([])
const textoBusqueda = ref('')
const categoriaSeleccionada = ref('')
const favoritosIds = ref([])

// Estados de la solicitud HTTP
const cargando = ref(true)
const error = ref(null)

// Cargar catálogo de servicios desde Fetch API
const cargarServicios = async () => {
  cargando.value = true
  error.value = null
  try {
    const datos = await obtenerServicios()
    servicios.value = datos
  } catch (err) {
    error.value = err.message || 'Error al obtener datos'
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  // Cargar datos asíncronos
  cargarServicios()

  // Cargar favoritos guardados
  const guardados = localStorage.getItem('favoritos_servicios')
  if (guardados) {
    try {
      favoritosIds.value = JSON.parse(guardados)
    } catch (e) {
      console.error('Error al parsear favoritos', e)
    }
  }
})

watch(
  favoritosIds,
  (nuevosFavoritos) => {
    localStorage.setItem('favoritos_servicios', JSON.stringify(nuevosFavoritos))
  },
  { deep: true }
)

const toggleFavorito = (id) => {
  const index = favoritosIds.value.indexOf(id)
  if (index === -1) {
    favoritosIds.value.push(id)
  } else {
    favoritosIds.value.splice(index, 1)
  }
}

const categorias = computed(() => {
  const lista = servicios.value.map(s => s.categoria)
  return [...new Set(lista)]
})

const serviciosFiltrados = computed(() => {
  return servicios.value.filter(servicio => {
    const coincideNombre = servicio.nombre
      .toLowerCase()
      .includes(textoBusqueda.value.toLowerCase().trim())
      
    const coincideCategoria = categoriaSeleccionada.value === '' || 
      servicio.categoria === categoriaSeleccionada.value

    return coincideNombre && coincideCategoria
  })
})
</script>