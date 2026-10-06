<!-- src/App.vue -->
<template>
  <div id="app">
    <header>
      <h2>Plataforma de Servicios Profesionales de Ñuble</h2>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>