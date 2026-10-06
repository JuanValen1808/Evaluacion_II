<!-- src/views/ServiciosView.vue -->
<template>
  <div class="view-container">
    <h1>Catálogo de Servicios</h1>
    <p>Explora los servicios disponibles en la Región de Ñuble.</p>

    <div class="servicios-grid">
      <ServicioCard 
        v-for="item in servicios" 
        :key="item.id" 
        :servicio="item" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { serviciosData } from '../services/serviciosData.js'
import ServicioCard from '../components/ServicioCard.vue'

const servicios = ref(serviciosData)
</script>