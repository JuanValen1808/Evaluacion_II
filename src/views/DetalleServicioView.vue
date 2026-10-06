<!-- src/views/DetalleServicioView.vue -->
<template>
  <div class="view-container">
    <div v-if="servicio" class="detalle-card">
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

    <!-- Mensaje si el servicio no existe o el ID es inválido -->
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
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { serviciosData } from '../services/serviciosData.js'

const route = useRoute()

// Obtenemos el ID de los parámetros de la ruta (/servicios/:id)
const servicioId = Number(route.params.id)

// Buscamos el servicio correspondiente
const servicio = computed(() => {
  return serviciosData.find(item => item.id === servicioId)
})
</script>