<!-- src/components/ServicioCard.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <span class="badge-categoria">{{ servicio.categoria }}</span>
      <span class="badge-estado" :class="{ 'disponible': servicio.disponible, 'no-disponible': !servicio.disponible }">
        {{ servicio.disponible ? 'Disponible' : 'No disponible' }}
      </span>
    </div>
    
    <h3>{{ servicio.nombre }}</h3>
    <p class="descripcion">{{ servicio.descripcion }}</p>
    <p class="precio"><strong>Precio:</strong> ${{ servicio.precio.toLocaleString('es-CL') }}</p>

    <div class="card-footer">
      <RouterLink :to="`/servicios/${servicio.id}`" class="btn-detalle">
        Ver detalle
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  servicio: {
    type: Object,
    required: true
  }
})
</script>