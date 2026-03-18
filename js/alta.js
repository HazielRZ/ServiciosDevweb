
document.addEventListener('DOMContentLoaded', () => {

  const formulario = document.getElementById('formulario-alta');
  const panelErrores = document.getElementById('panel-errores');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();


    panelErrores.style.display = 'none';
    panelErrores.innerHTML = '';
    let errores = [];

    // 1. Obtención de datos
    const nombre = document.getElementById('input-nombre').value.trim();
    const descripcion = document.getElementById('input-desc').value.trim();
    const precio = parseFloat(document.getElementById('input-precio').value);
    const foto = document.getElementById('input-foto').value.trim();

    // 2. Aplicar validaciones y casos especiales
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

    // 3. Manejo de errores (Alternativa visual sugerida en rúbrica)
    if (errores.length > 0) {
      panelErrores.style.display = 'block';
      panelErrores.innerHTML = `<strong>Se encontraron errores:</strong><ul>` +
        errores.map(err => `<li>${err}</li>`).join('') +
        `</ul><p><em>Sugerencia: Revise los campos marcados y vuelva a intentar.</em></p>`;
      return; // Detener la ejecución si hay errores
    }

    // 4. Si pasa la validación, guardar el nuevo producto
    const nuevoServicio = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      foto: foto
    };

    // Obtener arreglo actual (se usa JSON.parse)
    const datosActuales = JSON.parse(localStorage.getItem('catalogoServicios')) || [];

    // Agregar el nuevo elemento al final
    datosActuales.push(nuevoServicio);

    // Volver a guardar en Local Storage (se usa JSON.stringify)
    localStorage.setItem('catalogoServicios', JSON.stringify(datosActuales));

    // 5. Regresar a la página de servicios (Reflejar el nuevo objeto)
    window.location.href = 'services.html';
  });
});
