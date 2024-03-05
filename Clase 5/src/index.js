/** CLASE 5 - NPM ADMINISTRADOR DE PAQUETES */

// Temas de hoy:
// - Repasar qué es Node y su uso en el backend
// - Módulos propios, nativos y de terceros
// - NPM y el proceso de instalación
// - Actualización de dependencias y políticas


/////////////////////////////

// Módulo: es un archivo que contiene código de JS que encapsula una funcionalidad específica. Los módulos se usan para reutilizar código y mantenerlo organizado.


// Modulos escritos por nosotros:

const operaciones = require( "./operaciones.js");
// "require" es una función que me permite cargar o "requerir" algún modulo en particular.


console.log(operaciones.suma(5,5));
console.log(operaciones.resta(10,5));
console.log(operaciones.multiplicacion(10,10));
console.log(operaciones.division(25,5));

