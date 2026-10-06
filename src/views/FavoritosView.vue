<!-- src/views/FavoritosView.vue -->
<template>
  <div class="view-container">
    <h1>Servicios Favoritos</h1>
    <p>Consulta y gestiona tus servicios guardados de interés.</p>

    <!-- Si existen servicios favoritos -->
    <div v-if="serviciosFavoritos.length > 0" class="servicios-grid">
      <ServicioCard 
        v-for="item in serviciosFavoritos" 
        :key="item.id" 
        :servicio="item" 
        :es-favorito="true"
        @toggle-favorito="eliminarFavorito"
      />
    </div>

    <!-- Si no hay favoritos -->
    <div v-else class="mensaje-vacio">
      <p>Aún no has agregado ningún servicio a tus favoritos.</p>
      <RouterLink to="/servicios" class="btn-volver margin-top">
        Explorar catálogo de servicios
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { serviciosData } from '../services/serviciosData.js'
import ServicioCard from '../components/ServicioCard.vue'

const favoritosIds = ref([])

onMounted(() => {
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

// Eliminar un favorito de la lista
const eliminarFavorito = (id) => {
  favoritosIds.value = favoritosIds.value.filter(favId => favId !== id)
}

// Filtrar la lista de datos para obtener solo los objetos cuya ID esté en favoritos
const serviciosFavoritos = computed(() => {
  return serviciosData.filter(servicio => favoritosIds.value.includes(servicio.id))
})
</script>