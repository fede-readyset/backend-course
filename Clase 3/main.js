/** CLASE 3 **/

// Temas del día:

// 1) Enfoque sincrónico vs asincrónico
// 2) Callback
// 3) Promesas
// 4) Asyn Await


///////////////////

// Programación Sincrónica
// Es un enfoque a la hora de escribir en JS en el que las tareas se van a ejecutar en orden secuencial. 
// Cada tarea es bloqueante de la siguiente.

console.log("Primero");
console.log("Segundo");
console.log("Tercero");

// Ejemplo con funciones:

function a(){
    console.log("1");
    b();
}

function b(){
    console.log("2");
    c();
}

function c(){
    console.log("3");
}
a();




// Programación Asincrónica
// Es un enfoque o estilo de programación en elq ue las tareas se ejecutan en segundo plano y no bloquean la ejecución de la siguiente tarea.
// Las tareas son independientes y no bloquean el flujo de la ejecución de la App. Por ejemplo, si trabajo con una API no voy a bloquear la ejecución de mi código hasta que la petición se complete. Muy útil cuando trabajamos con base de datos y servidores.

// setTimeout().
// La vamos a usar para simular una petición a una API.

setTimeout(() => {
    console.log("Primer tareaaaaa");
}, 1000)

setTimeout(() => {
    console.log("tercer tareaaaaa");
}, 1000)
console.log("Segunda tarea, ah re loco"); 




// 2) Callback
// ¿Qué es una función callback? Es una función que pasamos como argumentro o parámetro a otra función.

// OJO! No confundir con las FOS (Funciones de orden superior). 

// Una FOS es una función que recibe otra función por parámetro, mientras que un Callback es la función que se pasa como argumento a otra. 


// Ejemplo:

function suma(numA,numB,callback){
    let resultado = numA + numB;

    callback(resultado);
}

function mostrarResultado(resultado){
    console.log("El resultado es: "+resultado);
}

suma(10,5,mostrarResultado);


// Otro ejemplo, la función map()
// La función map() es una FOS que recibe como parámetro una función callback.

let numeros=[1,2,3,4,5];
const numerosDuplicados = numeros.map(numero => numero * 2);
console.log(numerosDuplicados);


// Cómo haríamos la función map?
function mapear(array,callback){
    let nuevoArray = [];
    for (let i =0; i<array.length;i++){
        nuevoArray.push(callback(array[i]));
    }
    return nuevoArray;
}

function duplicar(numero){
    return numero * 2;
}

console.log(mapear(numeros,duplicar));


// Convenciones:
// - El callback siempre es el último parámetro
// - El callback 
// - La función llama al callback después de ejecutar todas sus operaciones.
// - Función fue exitosa, llamára al cb pasando null como primer parametro y si generó algún resultado se pasará como 2do parámtero
// - Si la op resultó en un error, llamará al callback pasando el error obtenido como 1er parámetro.

// Callback HELL !!!




// 3) Promesas:
// Las promesas son objetos que representan un hecho eventual a futuro. 
// Las vamos a utilizar en operaciones asincrónicas que pueden resultar exitosas o fallidas.

// Las promesas pueden tener 3 estados:
// Pendiente: (pending) Estado incial de la promesa. La operación asincrónica aún no se ha completado ni rechazado. 
// Exitoso: (fulfilled) La operación asincrónica se completó Ok y se resuelve la promesa. Generalmente esto ocurre cuando se devuelve un valor o resultado.
// Rechazado: (rejected) La operación asincrónica falló y se rechazó la promesa. Esto puede pasar por algún error en la operación.

// Creación de una promesa

const promesa = new Promise((resolve, rejected) => {
    // acá va el código que queremos ejecutar.

    // Resolve y reject son funciones que nos provee la promesa para indicarle el estado de la misma.

    // Si fue exitoso, utilizo resolve y si fue fallido rejected.

    let estado=true;
    if(estado){
        resolve("Exito en la promesa, me llegó la camiseta de Messi");
    }
    else{
        rejected("Fracasamos, tengo otra taza más.")
    }
});

console.log(promesa);



// Métodos THEN y CATCH
// Nos permiten manejar el resultado de la promesa.

// THEN: recibe una función que se va a ejecutar cuando la promesa se resuelva exitosamente
// CATCH: recibe una función que se va a ejecutar cuando la promesa se rechace
// FINALLY: recibe una función que se va a ejecutar siempre. Es opcional y se agregó en ES8


promesa
    .then(() => console.log("Roberto me envió la camiseta firmada."))
    .catch(() => console.log("Roberto decidió cambiarse de comisión."))
    .finally(()=> console.log("Fin del proceso."))





// Lo podemos practicar con un array de datos:

const productos = [
    {id:1, nombre:"Mesa", precio:5000},
    {id:2, nombre:"Silla", precio:1500},
    {id:3, nombre:"Cuadro", precio:300}
]

// Creamos una promesa que devuelva el producto por su ID.

function buscarProductoPorID(id){
    return new Promise((res,rej)=>{
        setTimeout(() => {
            const producto = productos.find( item => item.id === id);
            if (producto) {
                res(producto);
            } else {
                rej("No existe el producto!");
            }
        },2000)
    })
}



buscarProductoPorID(2)
    .then((producto) => console.log(producto))
    .catch((error)=> console.log(error))






// 4) Async Await

// con la palabra await, genero una pausa en la ejecución del código hasta que la promesa se resuelva o se rechaze.
// El tema es que para poder usar await, la función donde la use debe ser async.

// Ejemplo:

// async function buscarProductoAsync(id){
//     const producto = await buscarProductoPorID(id);
//     console.log(producto);

// }

// buscarProductoAsync(3);

// Generalmente se usa en conjunto con el bloque try catch, para manejar los errores.

async function buscarProductoAsync(id){
    try{
        const producto = await buscarProductoPorID(id);
        console.log(producto);
    } catch (error){
        console.log(error);
    }
}

buscarProductoAsync(1);
