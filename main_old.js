/* /** REPASITO JS */
// Los podemos dividir en dos grupos:




// 1.1 Tipo primitivo


// Tipo number:
56545565
4565.5454
// Datos numéricos que pueden ser enteros o decimales, que le llamamos punto flotante. Este tipo de datos estèa destinado a ser usado en operaciones matemèaticas


// Tipo String: 
"Esto es un string"
'Esto es un string tambien'
// Los strings son cadenas de texto. Se pueden escribir con comillas simples o dobles


// Tipo Boolean:
true 
false
// Son valores que pueden ser verdaderos o falsos. Los vamos a usar generalmente para tomar decisiones en nuetro codigo, junto a bucles y condicionales



// Tipo Indefinido:
undefined
// Es un valor que se asigna a una variable cuando todavia no se le ha asignado ningún valor


// Tipo Null:
null
// Es un valor que se le asigna a una variable cuando queremos que no tenga ningún valor.



// Variables
// Es un espacio de memoria reservado para almacenar un dato importante para nuestra aplicación

// Declaración de una variable
let alumno;
console.log(alumno);
// Podemos chequear que retorna undefined.


// Asignación de un valor:
alumno = "Federico";
console.log(alumno);
console.log(typeof alumno);


alumno = 10;
console.log(alumno);
console.log(typeof alumno);


// También puedo inicializar variables, que significa que le asinamos un valor al momento de declararlo:
let profesor = "Dipsy";
console.log(profesor);


// Las constantes son variablesque no pueden cambiar su valor. Se declaran con la palabra reservada "const". Una vez que se le asigna un valor a una constante, no se le puede asignar otro

const nacimiento = 1985;
console.log(nacimiento);


// Expresiones: es una combinación de valores, variables y operadores que se evaluan para producir un resultado.

// Expresion booleana:
let ejemploA = 10 < 5; // true
console.log (ejemploA);






// 1.2 Tipo Objeto
// Tenemos los objetos, arrays y funciones

// Array: es una colección de datos. Puede ser cualquier tipo de dato.
let array =  [1,"Hola", true, null, [1,2,3]];
console.log(array);

// A cada elemento del array se puede acceder a través de un índice. Este es un número entero que representa la posición del elemento en el array. Comienza en el índice 0.
// Los arrays son dinámicos, pueden cambiar su tamaño en tiempo de ejecución.
console.log(array[0]);



// Tipo Object
let perro = {
    nombre: "Fatiga",
    edad: 11,
    raza: "Callejero"
}

console.log(perro.nombre);


// Los métodos de este objeto los vemos la clase que viene



// CICLOS: nos permiten ejecutar un bloque de código cierta cantidad de veces. En JS tenemos 2 tipos de ciclos: ciclos por conteo y ciclos condicionales
// Ciclo FOR. Nos permite ejecutar un bloque de código una cantidad determinada de veces.
//      desde    hasta   actualizacion
for (let i = 0; i < 10 ; i++) {
    console.log(i);
}

/*
// Ciclo WHILE. Nos permite ejecutar un bloque de código mientras se cumpla alguna condición.
let nombre = prompt("Ingrese su nombre (para salir presione: salir)");

while (nombre !== "salir") {
    console.log("Hola "+ nombre);
    nombre = prompt("Ingrese su nombre (para salir presione: salir)");
}



// Ciclo DO..WHILE. Igual que el ciclo WHILE, pero la condicion se evalua despues de ejecutar el bloque.

const password = "1234";

let passUsuario;

do {
    passUsuario = prompt ("Ingrese su password.");
}while (passUsuario !== password)
*/

// FOR OF: este ciclo me permite ejecutar alguna acción sobre cada elemento de un objeto iterable (array, object, string)

let frutas = ["manzana", "pera", "banana","vino"];

for (let fruta of frutas) {
    console.log(fruta);
}




// FOR IN: la diferencia entre FOR OF y FOR IN, es que el FOR OF itera sobre los valores de un objeto, y el for in itera sobre las claves del objeto.

let clienteNuevo = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30
}

for (let clave in clienteNuevo){
    console.log(clave);
 }