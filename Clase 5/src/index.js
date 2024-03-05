/** CLASE 5 - NPM ADMINISTRADOR DE PAQUETES */

// Temas de hoy:
// - Repasar qué es Node y su uso en el backend
// - Módulos propios, nativos y de terceros
// - NPM y el proceso de instalación
// - Actualización de dependencias y políticas


/////////////////////////////
// Módulo: es un archivo que contiene código de JS que encapsula una funcionalidad específica. Los módulos se usan para reutilizar código y mantenerlo organizado.


//-------------------------------
// Modulos escritos por nosotros:
//-------------------------------
const moment = require("moment/moment.js");
const operaciones = require( "./operaciones.js");
// "require" es una función que me permite cargar o "requerir" algún modulo en particular.


console.log(operaciones.suma(5,5));
console.log(operaciones.resta(10,5));
console.log(operaciones.multiplicacion(10,10));
console.log(operaciones.division(25,5));



//--------------------------------------------------------------------------------------------------------------------
// Módulos nativos: son los que vienen incluídos en NodeJs, no es necesario instalarlos, sólo importarlos para usarlos
//--------------------------------------------------------------------------------------------------------------------

// Los más conocidos:
// 1) FileSystem: permite trabajar con el sistema de archivos del host.
// 2) HTTP: permite trabajar con un servidor web
// 3) Crypto: permite encriptar datos (ej. contraseñas)
// 4) Path: permite trabajar con rutas de archivos
// 5) Timers: permite trabajar con temporizadores (setTimeout, setInterval, etc)
// 6) Console: permite mostrar mensajes por consola. 


//--------------------------------------------------------------------------------------------------------------------
// Módulos de terceros: no vienen con NodeJS y los tenemos que instalar nosotros con NPM.
//--------------------------------------------------------------------------------------------------------------------

// Pasos para instalar módulos de terceros:
// 1) Instalamos el módulo de terceros desde la terminal con el comando "npm install" y el nombre del módulo
//     npm install moment


// Si lo quiero borrar: npm uninstall moment

// Si quiero instalar una versión particular: npm install moment@1.0


// Instalamos dependencias de desarrollo. Sólo la vamos a usar en etapa de desarrollo)
//      npm i nodemon -D

console.log("hola mundo");


// Los scripts son comandos personalizados por nosotros mismos.
// Para ejecutarlos se usa la palabra "run", excepto el script "start".




// Revisar dependencias desactualizadas
// npm outdated (locales)
// npm -g outdated (globales)

