
document.addEventListener('DOMContentLoaded', () => {
  inicializarCatalogo();
});

function obtenerDatosSincronizados() {
  const datosLocales = localStorage.getItem('catalogoServicios');
  if (datosLocales) {
    return JSON.parse(datosLocales);
  } else {
    const catalogoBase = [
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
    localStorage.setItem('catalogoServicios', JSON.stringify(catalogoBase));
    return catalogoBase;
  }
}

function crearNavegacion() {
  const header = document.createElement('header');
  const nav = document.createElement('nav');

  const enlaceInicio = document.createElement('a');
  enlaceInicio.href = 'index.html';
  enlaceInicio.textContent = '← Regresar a Equipo y CV';
  enlaceInicio.className = 'btn-services';
  enlaceInicio.style.display = 'inline-block';
  enlaceInicio.style.marginBottom = '20px';

  const enlaceAlta = document.createElement('a');
  enlaceAlta.href = 'alta.html';
  enlaceAlta.textContent = '+ Agregar Nuevo Servicio';
  enlaceAlta.className = 'btn-services';
  enlaceAlta.style.marginLeft = '15px';

  nav.appendChild(enlaceInicio);
  nav.appendChild(enlaceAlta);
  header.appendChild(nav);

  return header;
}

function crearFooterValidadores() {
  const footer = document.createElement('footer');
  const divContenedor = document.createElement('div');
  divContenedor.className = 'contenedor-validadores';

  const enlaceHTML5 = document.createElement('a');
  enlaceHTML5.href = 'https://validator.w3.org/nu/?doc=REFERER';
  const imgHTML5 = document.createElement('img');
  imgHTML5.className = 'badge-validador badge-html5';
  imgHTML5.alt = '¡HTML5 Válido!';
  imgHTML5.src = 'https://www.w3.org/html/logo/badge/html5-badge-h-solo.png';
  enlaceHTML5.appendChild(imgHTML5);

  const enlaceCSS = document.createElement('a');
  enlaceCSS.href = 'https://jigsaw.w3.org/css-validator/check/referer';
  const imgCSS = document.createElement('img');
  imgCSS.className = 'badge-validador badge-css';
  imgCSS.alt = '¡CSS Válido!';
  imgCSS.src = 'https://jigsaw.w3.org/css-validator/images/vcss-blue';
  enlaceCSS.appendChild(imgCSS);

  divContenedor.appendChild(enlaceHTML5);
  divContenedor.appendChild(enlaceCSS);
  footer.appendChild(divContenedor);

  return footer;
}

function inicializarCatalogo() {
  const root = document.getElementById('root-servicios');
  if (!root) return; // Validación de seguridad

  root.innerHTML = ''; // Limpiar nodo base
  root.appendChild(crearNavegacion());

  const seccionCatalogo = document.createElement('section');
  seccionCatalogo.style.display = 'flex';
  seccionCatalogo.style.flexWrap = 'wrap';
  seccionCatalogo.style.justifyContent = 'center';
  seccionCatalogo.style.gap = '20px';


  const datosSincronizados = obtenerDatosSincronizados();

  for (let i = 0; i < datosSincronizados.length; i++) {
    const servicio = datosSincronizados[i];

    const divServicio = document.createElement('div');
    divServicio.className = 'card';

    if (servicio.precio > 10000) {
      divServicio.classList.add('servicio-premium');
    }

    const imagen = document.createElement('img');
    imagen.src = servicio.foto;
    imagen.alt = servicio.nombre;
    imagen.style.width = '100%';
    imagen.style.borderRadius = '5px';

    const titulo = document.createElement('h3');
    titulo.textContent = servicio.nombre;

    const descripcion = document.createElement('p');
    descripcion.textContent = servicio.descripcion;

    const precio = document.createElement('p');
    precio.textContent = `Inversión: $${servicio.precio} MXN`;
    precio.style.fontWeight = 'bold';

    divServicio.appendChild(imagen);
    divServicio.appendChild(titulo);
    divServicio.appendChild(descripcion);
    divServicio.appendChild(precio);


    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar Servicio';
    btnEliminar.className = 'btn-eliminar';


    btnEliminar.addEventListener('click', () => {
      const confirmacion = confirm(`¿Está seguro de eliminar el servicio "${servicio.nombre}" del catálogo?`);

      if (confirmacion) {
        let datosMemoria = JSON.parse(localStorage.getItem('catalogoServicios'));

        // Mutar el arreglo eliminando 1 elemento en el índice 'i'
        datosMemoria.splice(i, 1);

        // nuevo estado en el LocalStorage
        localStorage.setItem('catalogoServicios', JSON.stringify(datosMemoria));

        inicializarCatalogo();
      }
    });


    divServicio.appendChild(imagen);
    divServicio.appendChild(titulo);
    divServicio.appendChild(descripcion);
    divServicio.appendChild(precio);
    divServicio.appendChild(btnEliminar);

    seccionCatalogo.appendChild(divServicio);
  }

  root.appendChild(seccionCatalogo);
  root.appendChild(crearFooterValidadores());
}
