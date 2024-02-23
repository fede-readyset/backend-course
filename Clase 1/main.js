/// Clase 1 - Principios básicos de JS.

// 1) Plantillas literales.
// 2) Funciones.
// 3) Scope. 
// 4) Cláusulas, Closures.
// 5) Clases y POO en JS.

// 1) Las plantillas literales me permiten concatenar strings de una forma más sencilla y legible.

let mascota = "Fatiga";
let mascotaEdad = 5;
console.log("Nuestro perro " + mascota + " tiene "+  mascotaEdad+ " años.");

// Ahora:
console.log(`Nuestro perro ${mascota} tiene ${mascotaEdad} años.`);

// También podemos ejecutar cualquier código de JS:
console.log(`Nuestro perro ${mascota} tiene ${mascotaEdad+1} años.`);

// 2) Funciones: son bloques de código que podemos encapsular y reutilizar en nuestro programa
// No se olviden que una función debe tener una sola responsabilidad. 

// CODEMETRICS (extensión para analizar complejidad de funciones)

// Vamos a tener 2 categorías de funciones en JS:

// FUNCIONES DECLARATIVAS:

// 1) Las declaramos:
function saludar(curso) {
    console.log("Hola comisión "+curso);
}


// 2) Las invocamos:
saludar ("Backend");

// Gracias a la tecnica de "Hoisting", se puede invocar una función antes de ser declarada. Es un proceso interno que realiza el lenguaje durante la lectura del código, en donde eleva las declaraciones de las funciones. (Ojo! Solo las declarativas!)


// FUNCIONES EXPRESIVAS:
// Estas se definen utilizando una expresión. 
// Las vamos a trabajar, en general, asignándolas a alguna variable.


let nuevoSaludo = function(curso) {
    console.log("La mejor comisión del condado "+curso);
}

nuevoSaludo("Backend");


// No se pueden invocar antes de la declaración
// Las funciones anónimas siempre estuvieron en JS, incluso en sus primeras versiones.
// Lo que si llega en ES6 son las:

// FUNCIONES FLECHA:
// Estas funciones son una forma más corta y simple de escribir funciones expresivas.

// flecha =>

const ultimoSaludo = (curso) => {
    console.log("Todos amamos el curso de "+curso);
}
ultimoSaludo("Backend!!!");




// Forma más resumida
// en una sola línea se van las llaves, y si el parámetro es único se van los paréntesis
const chau = curso => console.log("chauuu " + curso);

chau("Backend");





// 3) SCOPE: es el alcance que tienen las variables dentro de nuestro programa.
// En JS tenemos dos tipos de scopes:
// Scope Global: las variables declaradas en este scope pueden ser accedidas desde cualquier punto del programa.
// Scope Local: sólo pueden trabajar dentro del bloque de instrucciones donde fueron creadas {}

// Ejemplo:

let global = 2024;

function saludito() {
    console.log("Estamos en el año " + global);
    let curso = "Backend";
    console.log("Curso de "+curso);
}

saludito();


// 4) CLOSURES:
// Los cierres o cláusulas en JS es un concepto que se refiere a la capacidad de una función anidada de acceder a las variables de su función padre.

function padre(){
    let deuda = 15000000;
    function anidada (){
        console.log(deuda);
    }
    return anidada;
    //retornamos la funcion anidada, creando el closure
}

let clausula = padre ();
clausula();


// ¿Qué ocurre en este ejemplo? La función padre termina su ejecución, pero la función anidada puede acceder a la variable deuda.
// Esto se usaba para simular la existencia de variables privadas, en ese momento no existían pero con la llegada de ES6 y las clases pasaron un poco al desuso.

// 5) Clases: son moldes que nos permiten crear objetos con características similares.

// Ejemplo, vamos a crear la clase persona:

class Persona {
    constructor (nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
    }
    
    //podemos agregar métodos a la clase:
    saludar(){
        console.log("Hola, soy " + this.nombre);
    }

    despedir(){
        console.log("Chau, me fui, soy " + this.nombre);
    }

    // Métodos estáticos:
    static especie () {
        console.log("Soy un ser humano");
    }
    static planeta = "Tierra";
}


// Vamos a crear una instancia de la clase Persona:

const coky = new Persona("Coky",30);
console.log(coky);
coky.saludar();
coky.despedir();

// Podemos agregar métodos estáticos, que son métodos que se ejecutan sin necesidad de crear una instancia de la clase.

// Cómo ejecuto un método estático?

Persona.especie();
console.log(Persona.planeta)


// Vamos a crear una clase que herede de la clase Persona.

class Empleado extends Persona {
    constructor(nombre,edad,sueldo){
        super(nombre,edad);
        this.sueldo = sueldo;
    }

     saludar(){
         console.log("Hola soy " + this.nombre + " y mi salario es de " + this.sueldo);
     }
}

const empleado = new Empleado("Paola",35,1000000);
console.log(empleado);
empleado.saludar();


