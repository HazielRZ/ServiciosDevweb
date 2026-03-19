<template>
  <div class="app-container">

    <header style="text-align: center; padding: 20px;">
      <nav style="display: flex; justify-content: center; gap: 15px;">
        <button
          v-if="vistaActual !== 'inicio'"
          @click="vistaActual = 'inicio'"
          class="btn-services">
          Inicio (Equipo y CV)
        </button>

        <button
          v-if="vistaActual !== 'catalogo'"
          @click="vistaActual = 'catalogo'"
          class="btn-services">
          Catálogo de Servicios
        </button>

        <button
          v-if="vistaActual === 'catalogo'"
          @click="vistaActual = 'formulario'"
          class="btn-services">
          + Agregar Nuevo Servicio
        </button>
      </nav>
    </header>

    <main v-if="vistaActual === 'inicio'">
      <div class="hero">
        <h1>Dev Web</h1>
      </div>

      <section class="equipo" style="padding: 20px;">
        <h2>Conoce Nuestro equipo</h2>
        <div class="card">
          <h3>Haziel Ruiz Z</h3>
          <p>Ing. Sistemas Computacionales</p>
          <p>Fullstack Developer</p>
          <h4>CSS, Java, JavaScript, SQL</h4>
        </div>
        <div class="card">
          <h3>Cristian Munoz Hinojosa</h3>
          <p>Ing. Sistemas Computacionales</p>
          <p>Backend/Frontend Developer</p>
          <h4>Java, HTML, JavaScript</h4>
        </div>
      </section>
    </main>

    <main v-else-if="vistaActual === 'catalogo'">
      <section class="grid-servicios">
        <div
          v-for="(servicio, index) in servicios"
          :key="index"
          class="card"
          :class="{ 'servicio-premium': servicio.precio > 1000 }"
        >
          <img :src="servicio.foto" :alt="servicio.nombre" style="width: 100%; border-radius: 5px;">
          <h3>{{ servicio.nombre }}</h3>
          <p>{{ servicio.descripcion }}</p>
          <p style="font-weight: bold;">Inversión: ${{ servicio.precio }} MXN</p>
          <button @click="eliminarServicio(index)" class="btn-eliminar">Eliminar</button>
        </div>
      </section>
    </main>

    <main v-else-if="vistaActual === 'formulario'" class="contenedor-formulario">
      <form @submit.prevent="guardarServicio" class="card" style="width: 100%;">
        <div v-if="errores.length" class="panel-errores">
          <strong>Se encontraron errores:</strong>
          <ul><li v-for="err in errores" :key="err">{{ err }}</li></ul>
        </div>

        <div class="form-group">
          <label>Nombre del Servicio:</label>
          <input v-model.trim="nuevoServicio.nombre" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Descripción:</label>
          <textarea v-model.trim="nuevoServicio.descripcion" rows="3" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label>Inversión (Precio MXN):</label>
          <input v-model.number="nuevoServicio.precio" type="number" class="form-control">
        </div>
        <div class="form-group">
          <label>URL de la Fotografía:</label>
          <input v-model.trim="nuevoServicio.foto" type="text" class="form-control">
        </div>

        <button type="submit" class="btn-services btn-block">Guardar Servicio</button>
      </form>
    </main>

    <footer>
      <div class="contenedor-validadores">
        <a href="https://validator.w3.org/nu/?doc=REFERER">
          <img class="badge-validador badge-html5" alt="¡HTML5 Válido!" src="https://www.w3.org/html/logo/badge/html5-badge-h-solo.png" />
        </a>
        <a href="https://jigsaw.w3.org/css-validator/check/referer">
          <img class="badge-validador badge-css" alt="¡CSS Válido!" src="https://jigsaw.w3.org/css-validator/images/vcss-blue" />
        </a>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // Estado inicial: Renderiza la vista de Equipo y CV
      vistaActual: 'inicio',
      servicios: [],
      errores: [],
      nuevoServicio: { nombre: '', descripcion: '', precio: null, foto: '' }
    };
  },
  mounted() {
    this.cargarDatos();
  },
  methods: {
    cargarDatos() {
      const datosLocales = localStorage.getItem('catalogoServicios');
      if (datosLocales) {
        this.servicios = JSON.parse(datosLocales);
      } else {
        this.servicios = [
          { nombre: "Desarrollo Web Full-Stack", descripcion: "Arquitectura web.", precio: 18000, foto: "img/web-fullstack.jpg" },
          { nombre: "Auditoría de Código", descripcion: "Optimización.", precio: 950, foto: "img/auditoria.jpg" }
        ];
        this.sincronizarMemoria();
      }
    },
    sincronizarMemoria() {
      localStorage.setItem('catalogoServicios', JSON.stringify(this.servicios));
    },
    eliminarServicio(index) {
      if (confirm('¿Está seguro de eliminar este servicio?')) {
        this.servicios.splice(index, 1);
        this.sincronizarMemoria();
      }
    },
    guardarServicio() {
      this.errores = [];
      if (this.nuevoServicio.nombre.length < 5) this.errores.push("El nombre debe tener al menos 5 caracteres.");
      if (!this.nuevoServicio.descripcion) this.errores.push("La descripción es obligatoria.");
      if (!this.nuevoServicio.precio || this.nuevoServicio.precio <= 0) this.errores.push("El precio debe ser mayor a 0.");
      if (!this.nuevoServicio.foto) this.errores.push("Incluya la URL de la fotografía.");

      if (this.errores.length === 0) {
        this.servicios.push({ ...this.nuevoServicio });
        this.sincronizarMemoria();
        this.nuevoServicio = { nombre: '', descripcion: '', precio: null, foto: '' };
        alert("Servicio guardado exitosamente");
        this.vistaActual = 'catalogo';
      }
    }
  }
};
</script>
