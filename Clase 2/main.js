/** clases */

//VS Code
// comentar con cmd+k+c, descomentar con cmd+k+u
// comentario de bloque shift+opt+a
// retorno de linea Opt+z

// Continuamos

// DESESTRUCTURACIÓN: Esta herramiento nos permite extraer datos de un array u objeto de una manera más sencilla y legible

const pelicula = {
    titulo: "El Padrino",
    director: "Francis Ford Coppola",
    genero: "Drama",
    lanzamiento: 1972
}

// Antes de ES6

let titulo = pelicula.titulo;
console.log(titulo); 

// De esta forma estoy copiando el valor de la priedad titulo del objeto pelicula a la variable "titulo"

// con ES6:
            //alias 
let {titulo:tituloPeli, director, genero, lanzamiento} = pelicula;

console.log(genero);
console.log(lanzamiento);

tituloPeli = "Volver al futuro";

console.log (pelicula.titulo);
// Estamos trabajando con copias de datos. El objeto original no se modifica.



// Ejemplo con Arrays:
const numeros = [1,2,3,4,5];

// Antes de ES6
let uno = numeros[0];
let dos = numeros[1];
let tres = numeros[2];

console.log (uno,dos,tres);

// Con ES6

let [indiceCero,,indiceDos] = numeros;
console.log(indiceCero,indiceDos);



// Valores por defecto: Nos permite asignar valores por defecto a los parámetros de las funciones.

function saludar(nombre = "Invitado"){
    console.log("Hola "+nombre + " Bienvenido!") ;
}
saludar ();


// Trabajo por módulos:

// Si quisiera importar el array productosMarolio que exporamos en el archivo datos.js, lo hago de la siguiente manera:

import productosMarolio from "./datos.js";

console.log(productosMarolio);




// Operador SPREAD: Operador de propagación
// Nos permite desparramar los elementos de un array u objeto de forma individual en otro contexto, que puede ser un array, un objeto o una función.

const arrayNombres = ["Samuel","Federico","Luciana","Amelia"];

console.log(...arrayNombres);
console.log(arrayNombres[0],arrayNombres[1],arrayNombres[2],arrayNombres[3]);



// Copia de objetos:

const coky = {
    nombre: "Coky",
    apellido: "Argento",
    edad: 16
}

// esto no hay que hacerlo, porque se igualan los punteros no los datos, no creamos un obj nuevo
// const coky2 = coky;

// Forma correcta:
const coky2 = {...coky};

coky.nombre = "Paola";
console.log(coky);
console.log(coky2);


// Arrays:

let numeros2 = [1,2,3,4,5];
let numeros3 = [6,7,8,9,10];

let numerosConcatenados = [...numeros2,...numeros3];

console.log(numerosConcatenados);


// Clases:
class Persona {
    constructor (nombre,apellido,edad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    saludar(){
        console.log(`Hola, soy ${this.nombre} ${this.apellido}`);
    }
}

const persona = new Persona("Luis","Miguel",50);
console.log(persona);
persona.saludar();

// Herencia: 

// Si quiero que el promedio sea una variable privada, tengo que agregarle el # antes del nombre de la variable

class Estudiante extends Persona {
    #promedio;
    constructor(nombre, apellido, edad, carrera, promedio){
        super(nombre, apellido, edad);
        this.carrera = carrera;
        this.#promedio = promedio;
    }

    saludar(){
        console.log(`Hola, soy ${this.nombre} ${this.apellido}, y estudio ${this.carrera} `)
    }

    //Para trabajar con esa variable privada, tengo que crear un método que me permita acceder a ella.

    get getPromedio(){
        return this.#promedio;
    }
}

const estudiante = new Estudiante("Juancito","Perez",20,"Ingeniería en Sistemas",10);
console.log(estudiante);
estudiante.saludar();
console.log(estudiante.promedio);
console.log(estudiante.getPromedio);


// Variables y métodos estáticos.
// Están asociados a la clase en sí. Para poder utilizarlos no requiere que se genere una instancia de clase.

class Contador {
    static cantidad = 0;
    constructor(){
        Contador.cantidad++;
    }

    static obtenerCantidad() {
        return Contador.cantidad;
    }
}

const contador1 = new Contador();
const contador2 = new Contador();
const contador3 = new Contador();
const contador4 = new Contador();

console.log(Contador.obtenerCantidad());


// ¿Qué es un prototipo?
// Un prototipo es un objeto del cual otro objeto hereda sus propiedades y métodos.

const animal = {
    especie: "Animal",
    comer: function() {
        console.log("Comiendo");
    }
}

const gato = {
    raza: "Gato",
    maullar: function(){
        console.log("Miauuu");
    }
}

gato.__proto__=animal;
// __proto__ es una propiedad que tienen todos los obj que nos permiten acceder al prototipo del objeto, pero no es recomendable utilizarla en producción, ya que es una propiedad privada del lenguaje.


// De esta manera el objeto gato hereda las propioedades del objeto animal.
// animal es el prototipo de gato.


gato.comer();
gato.maullar();
