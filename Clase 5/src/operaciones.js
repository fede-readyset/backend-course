// Declaro mis funciones:

const suma = (a,b) => a + b;
const resta = (a,b) => a - b;
const multiplicacion = (a,b) => a * b;
const division = (a,b) => a / b;


// Dos formas de importar/exportar módulos:
// - Common JS
// - ES Module

module.exports = { 
    suma,
    resta,
    multiplicacion,
    division
}

