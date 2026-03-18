const catalogoServicios = [
  {
    nombre: "Desarrollo Web Full-Stack",
    descripcion: "Arquitectura y construcción integral de plataformas web escalables.",
    precio: 18000,
    foto: "img/web-fullstack.jpg"
  },
  {
    nombre: "Sistemas de Visión por Computadora",
    descripcion: "Implementación de modelos algorítmicos para procesamiento y análisis de imágenes.",
    precio: 25000,
    foto: "img/computer-vision.jpg"
  },
  {
    nombre: "Arquitectura Backend con Java",
    descripcion: "Desarrollo de microservicios y lógica de negocio robusta para servidores.",
    precio: 15000,
    foto: "img/java-backend.jpg"
  },
  {
    nombre: "Automatización y Scripts en Python",
    descripcion: "Desarrollo de scripts para análisis de datos y automatización de procesos.",
    precio: 4500,
    foto: "img/python-scripts.jpg"
  },
  {
    nombre: "Diseño de APIs RESTful",
    descripcion: "Creación de interfaces de programación de aplicaciones estandarizadas e iterables.",
    precio: 8500,
    foto: "img/api-rest.jpg"
  },
  {
    nombre: "Desarrollo de PWA",
    descripcion: "Aplicaciones Web Progresivas con capacidades offline y rendimiento nativo.",
    precio: 12000,
    foto: "img/pwa.jpg"
  },
  {
    nombre: "Auditoría de Código Fuente",
    descripcion: "Revisión técnica, refactorización y optimización de repositorios existentes.",
    precio: 950,
    foto: "img/auditoria.jpg"
  },
  {
    nombre: "Optimización de Consultas SQL",
    descripcion: "Normalización de bases de datos y mejora en tiempos de respuesta (por hora).",
    precio: 800,
    foto: "img/sql-opt.jpg"
  },
  {
    nombre: "Maquetación Frontend (UI)",
    descripcion: "Traducción de diseños a código semántico utilizando HTML, CSS y JavaScript.",
    precio: 1900,
    foto: "img/frontend-ui.jpg"
  },
  {
    nombre: "Despliegue en Entornos Cloud",
    descripcion: "Configuración y paso a producción en infraestructuras de nube.",
    precio: 3500,
    foto: "img/cloud-deploy.jpg"
  }
];

const root = document.getElementById('root-servicios');


const header = document.createElement('header');
const nav = document.createElement('nav');
const enlaceInicio = document.createElement('a');

enlaceInicio.href = 'index.html';
enlaceInicio.textContent = '← Regresar a Equipo y CV';
enlaceInicio.className = 'btn-services';
enlaceInicio.style.display = 'inline-block';
enlaceInicio.style.marginBottom = '20px';

nav.appendChild(enlaceInicio);
header.appendChild(nav);
root.appendChild(header);


const seccionCatalogo = document.createElement('section');
seccionCatalogo.style.display = 'flex';
seccionCatalogo.style.flexWrap = 'wrap';
seccionCatalogo.style.justifyContent = 'center';
seccionCatalogo.style.gap = '20px';


for (let i = 0; i < catalogoServicios.length; i++) {
  const servicio = catalogoServicios[i];


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

  // DOM
  divServicio.appendChild(imagen);
  divServicio.appendChild(titulo);
  divServicio.appendChild(descripcion);
  divServicio.appendChild(precio);

  seccionCatalogo.appendChild(divServicio);
}


root.appendChild(seccionCatalogo);
