<!-- src/views/ContactoView.vue -->
<template>
  <div class="view-container">
    <h1>Contacto</h1>
    <p>Envíanos un mensaje para consultar por un servicio profesional en la Región de Ñuble.</p>

    <!-- Mensaje de Confirmación al enviar -->
    <div v-if="enviado" class="mensaje-exito">
      <h3>¡Mensaje enviado con éxito!</h3>
      <p>Gracias <strong>{{ formulario.nombre }}</strong>. Nos pondremos en contacto contigo pronto al correo <strong>{{ formulario.email }}</strong>.</p>
      <button type="button" @click="reiniciarFormulario" class="btn-nuevo">
        Enviar otro mensaje
      </button>
    </div>

    <!-- Formulario de Contacto -->
    <form v-else @submit.prevent="procesarFormulario" class="form-contacto">
      <!-- Mensaje de Error de Validación -->
      <div v-if="errorMsg" class="mensaje-error">
        <p>{{ errorMsg }}</p>
      </div>

      <div class="form-grupo">
        <label for="nombre">Nombre completo (*):</label>
        <input 
          id="nombre"
          type="text" 
          v-model="formulario.nombre" 
          placeholder="Ej. Juan Pérez" 
          class="input-control"
        />
      </div>

      <div class="form-grupo">
        <label for="email">Correo electrónico (*):</label>
        <input 
          id="email"
          type="email" 
          v-model="formulario.email" 
          placeholder="ejemplo@correo.com" 
          class="input-control"
        />
      </div>

      <div class="form-grupo">
        <label for="servicio">Servicio de interés:</label>
        <select id="servicio" v-model="formulario.servicioInteres" class="input-control">
          <option value="">-- Selecciona un servicio (Opcional) --</option>
          <option v-for="item in listaServicios" :key="item.id" :value="item.nombre">
            {{ item.nombre }}
          </option>
        </select>
      </div>

      <div class="form-grupo">
        <label for="mensaje">Mensaje (*):</label>
        <textarea 
          id="mensaje"
          v-model="formulario.mensaje" 
          rows="4" 
          placeholder="Escribe tu consulta aquí..." 
          class="input-control"
        ></textarea>
      </div>

      <button type="submit" class="btn-enviar">
        Enviar consulta
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerServicios } from '../services/serviciosService.js'

// Estado del formulario mediante v-model
const formulario = ref({
  nombre: '',
  email: '',
  servicioInteres: '',
  mensaje: ''
})

const listaServicios = ref([])
const enviado = ref(false)
const errorMsg = ref('')

// Cargar catálogo de servicios para el selector
onMounted(async () => {
  try {
    listaServicios.value = await obtenerServicios()
  } catch (error) {
    console.error('Error al cargar la lista de servicios en contacto', error)
  }
})

// Validación y envío del formulario
const procesarFormulario = () => {
  errorMsg.value = ''

  // Validación de campos obligatorios
  if (!formulario.value.nombre.trim()) {
    errorMsg.value = 'Por favor, ingresa tu nombre completo.'
    return
  }

  if (!formulario.value.email.trim() || !formulario.value.email.includes('@')) {
    errorMsg.value = 'Por favor, ingresa un correo electrónico válido.'
    return
  }

  if (!formulario.value.mensaje.trim()) {
    errorMsg.value = 'Por favor, escribe un mensaje con tu consulta.'
    return
  }

  // Si pasa las validaciones, mostramos el estado de éxito
  enviado.value = true
}

const reiniciarFormulario = () => {
  formulario.value = {
    nombre: '',
    email: '',
    servicioInteres: '',
    mensaje: ''
  }
  enviado.value = false
  errorMsg.value = ''
}
</script>