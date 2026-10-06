<!-- src/views/ServiciosView.vue -->
<template>
  <div class="view-container">
    <h1>Catálogo de Servicios</h1>
    <p>Explora los servicios disponibles en la Región de Ñuble.</p>

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

    <!-- Mensaje cuando no hay resultados -->
    <div v-else class="mensaje-vacio">
      <p>No se encontraron servicios para los criterios seleccionados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { serviciosData } from '../services/serviciosData.js'
import ServicioCard from '../components/ServicioCard.vue'

const servicios = ref(serviciosData)
const textoBusqueda = ref('')
const categoriaSeleccionada = ref('')
const favoritosIds = ref([])

// Cargar favoritos guardados en localStorage al iniciar el componente
onMounted(() => {
  const guardados = localStorage.getItem('favoritos_servicios')
  if (guardados) {
    try {
      favoritosIds.value = JSON.parse(guardados)
    } catch (e) {
      console.error('Error al parsear favoritos de localStorage', e)
    }
  }
})

// Observar cambios en favoritosIds y guardarlos en localStorage
watch(
  favoritosIds,
  (nuevosFavoritos) => {
    localStorage.setItem('favoritos_servicios', JSON.stringify(nuevosFavoritos))
  },
  { deep: true }
)

// Función para agregar o eliminar de la lista de favoritos
const toggleFavorito = (id) => {
  const index = favoritosIds.value.indexOf(id)
  if (index === -1) {
    favoritosIds.value.push(id)
  } else {
    favoritosIds.value.splice(index, 1)
  }
}

// Lista única de categorías
const categorias = computed(() => {
  const lista = servicios.value.map(s => s.categoria)
  return [...new Set(lista)]
})

// Filtrado combinado
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