
document.addEventListener('DOMContentLoaded', () => {

  const formulario = document.getElementById('formulario-alta');
  const panelErrores = document.getElementById('panel-errores');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Interceptar flujo nativo del formulario

    // Reiniciar interfaz de errores
    panelErrores.style.display = 'none';
    panelErrores.innerHTML = '';
    let errores = [];

    // Extracción de datos
    const nombre = document.getElementById('input-nombre').value.trim();
    const descripcion = document.getElementById('input-desc').value.trim();
    const precio = parseFloat(document.getElementById('input-precio').value);
    const foto = document.getElementById('input-foto').value.trim();

    // 2. Evaluaciones Algorítmicas (Validaciones)
    if (nombre.length < 5) {
      errores.push("El nombre debe tener al menos 5 caracteres.");
    }
    if (descripcion === '') {
      errores.push("La descripción es obligatoria.");
    }
    if (isNaN(precio) || precio <= 0) {
      errores.push("El precio debe ser un número válido mayor a 0.");
    }
    if (foto === '') {
      errores.push("Debe incluir una ruta para la fotografía.");
    }


    if (errores.length > 0) {
      panelErrores.style.display = 'block';
      panelErrores.innerHTML = `<strong>Se encontraron errores:</strong><ul>` +
        errores.map(err => `<li>${err}</li>`).join('') +
        `</ul><p><em>Sugerencia: Revise los campos marcados y vuelva a intentar.</em></p>`;
      return; // Interrumpir ejecución
    }

    // 4. Construcción del Modelo de Datos
    const nuevoServicio = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      foto: foto
    };

    //  Sincronización con LocalStorage
    let datosActuales = JSON.parse(localStorage.getItem('catalogoServicios'));

    // Fallback
    if (!datosActuales) {
      datosActuales = [
        { nombre: "Desarrollo Web Full-Stack", descripcion: "Arquitectura y construcción integral de plataformas web escalables.", precio: 18000, foto: "img/web-fullstack.jpg" },
        { nombre: "Sistemas de Visión por Computadora", descripcion: "Implementación algorítmica para análisis de imágenes.", precio: 25000, foto: "img/computer-vision.jpg" },
        { nombre: "Arquitectura Backend con Java", descripcion: "Desarrollo de microservicios robustos.", precio: 15000, foto: "img/java-backend.jpg" },
        { nombre: "Automatización y Scripts Python", descripcion: "Scripts para análisis de datos.", precio: 4500, foto: "img/python-scripts.jpg" },
        { nombre: "Diseño de APIs RESTful", descripcion: "Interfaces de programación estandarizadas.", precio: 8500, foto: "img/api-rest.jpg" },
        { nombre: "Desarrollo de PWA", descripcion: "Aplicaciones con capacidades offline.", precio: 12000, foto: "img/pwa.jpg" },
        { nombre: "Auditoría de Código", descripcion: "Revisión y optimización de repositorios.", precio: 950, foto: "img/auditoria.jpg" },
        { nombre: "Optimización SQL", descripcion: "Mejora en tiempos de respuesta.", precio: 800, foto: "img/sql-opt.jpg" },
        { nombre: "Maquetación Frontend (UI)", descripcion: "Traducción de diseños a código.", precio: 1900, foto: "img/frontend-ui.jpg" },
        { nombre: "Despliegue Cloud", descripcion: "Configuración en infraestructuras de nube.", precio: 3500, foto: "img/cloud-deploy.jpg" }
      ];
    }


    datosActuales.push(nuevoServicio);
    localStorage.setItem('catalogoServicios', JSON.stringify(datosActuales));

    //  Despliegue de Confirmación Visual
    mostrarDialogoConfirmacion();
  });


  function mostrarDialogoConfirmacion() {

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // Contenedor físico del modal
    const modal = document.createElement('div');
    modal.className = 'card modal-exito';

    // Estructura interna
    modal.innerHTML = `
      <h2 style="color: #3f459a; margin-top: 0;">¡Operación Exitosa!</h2>
      <p style="margin-bottom: 20px;">El nuevo servicio ha sido registrado correctamente en el catálogo.</p>
      <button id="btn-aceptar-modal" class="btn-services" style="margin-bottom: 0;">Aceptar y Continuar</button>
    `;

    // Ensamblaje
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Asignación de evento para redireccionamiento final
    document.getElementById('btn-aceptar-modal').addEventListener('click', () => {
      window.location.href = 'services.html'; // Asegúrese de que este sea el nombre correcto de su página de catálogo
    });
  }
});
