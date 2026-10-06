// src/services/serviciosService.js
export const obtenerServicios = async () => {
  try {
    const respuesta = await fetch('/api/servicios.json')
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status} ${respuesta.statusText}`)
    }
    const datos = await respuesta.json()
    return datos
  } catch (error) {
    console.error('Error al obtener los servicios:', error)
    throw error
  }
}