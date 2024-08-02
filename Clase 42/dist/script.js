"use strict";
// Iniciar el proyecto con tsc --init
// Configurar el tsconfig.json
// Compilar con tsc
// Tipo de datos:
let nombre = "Pepe";
const apellido = "Argento";
const nacimiento = 1960;
let trabaja = true;
//Undefined/null
let variableUndefined = undefined;
const datoNull = null;
//Objetos:
const persona = {
    nombre: "Juan",
    edad: 30
};
let alumnito = {
    nombre: "coky",
    edad: 18
};
// Funciones:
function suma(numeroA, numeroB) {
    return numeroA + numeroB;
}
console.log(suma(155, 5));
// Ejemplo con función Flecha
const restar = (a, b) => a - b;
console.log(restar(100, 50));
// Clases
class Perro {
    constructor(raza, edad) {
        this.raza = raza;
        this.edad = edad;
    }
    ladrar() {
        console.log("Guau");
    }
}
// Instancia de firulais:
const firulais = new Perro("Ladrador", 10);
console.log(firulais);
