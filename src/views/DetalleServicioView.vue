<!-- src/views/DetalleServicioView.vue -->
<template>
  <div class="view-container">
    <div v-if="cargando" class="estado-carga">
      <p>Cargando información del servicio...</p>
    </div>

    <div v-else-if="servicio" class="detalle-card">
      <div class="detalle-header">
        <span class="badge-categoria">{{ servicio.categoria }}</span>
        <span 
          class="badge-estado" 
          :class="{ 'disponible': servicio.disponible, 'no-disponible': !servicio.disponible }"
        >
          {{ servicio.disponible ? 'Disponible' : 'No disponible' }}
        </span>
      </div>

      <h1>{{ servicio.nombre }}</h1>
      <p class="descripcion-completa">{{ servicio.descripcion }}</p>

      <div class="detalle-info">
        <p class="precio-destacado">
          <strong>Precio del servicio:</strong> ${{ servicio.precio.toLocaleString('es-CL') }} CLP
        </p>
      </div>

      <div class="acciones">
        <RouterLink to="/servicios" class="btn-volver">
          ← Volver al catálogo
        </RouterLink>
      </div>
    </div>

    <div v-else class="mensaje-vacio">
      <h2>Servicio no encontrado</h2>
      <p>El servicio solicitado no existe o fue removido del catálogo.</p>
      <RouterLink to="/servicios" class="btn-volver margin-top">
        Volver al catálogo
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { obtenerServicios } from '../services/serviciosService.js'

const route = useRoute()
const servicio = ref(null)
const cargando = ref(true)

onMounted(async () => {
  const servicioId = Number(route.params.id)
  try {
    const servicios = await obtenerServicios()
    servicio.value = servicios.find(item => item.id === servicioId) || null
  } catch (error) {
    console.error('Error al recuperar servicio', error)
  } finally {
    cargando.value = false
  }
})
</script>