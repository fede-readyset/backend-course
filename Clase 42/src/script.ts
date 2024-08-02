// Iniciar el proyecto con tsc --init
// Configurar el tsconfig.json
// Compilar con tsc


// Tipo de datos:
let nombre: string = "Pepe";
const apellido: string = "Argento";
const nacimiento: number = 1960;

let trabaja: boolean = true;

//Undefined/null
let variableUndefined: undefined = undefined;
const datoNull: null = null;

//Objetos:
const persona: { nombre: string, edad: number } = {
    nombre: "Juan",
    edad: 30
}



// Una interfaz es una estructura que define un conjunto de propiedades y métodos que un objeto debe implementar:

interface Alumno {
    nombre: string,
    edad: number
}

let alumnito: Alumno = {
    nombre: "coky",
    edad: 18
}



// Funciones:

function suma(numeroA: number, numeroB: number): number {
    return numeroA + numeroB;
}
console.log(suma(155, 5));

// Ejemplo con función Flecha

const restar = (a: number, b: number) => a - b
console.log(restar(100, 50));




// Clases
class Perro {
    raza: string;
    edad: number;

    constructor(raza: string, edad: number) {
        this.raza = raza;
        this.edad = edad;
    }

    ladrar() {
        console.log("Guau")
    }
}

// Instancia de firulais:

const firulais = new Perro ("Ladrador",10);

console.log(firulais);