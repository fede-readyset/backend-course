/** CLASE 4 MANEJO DE ARCHIVOS */

// Temas de hoy:

// 1) Filesystem
//  A) Manejo de archivos de forma sincrónica
//  B) Manejo de archivos con callbacks
//  C) Manejo de archivos con promesas
// 2) Manejo de datos complejos
// 3) Presentación de Desafío #2




// 1) Filesystem es un manejador de archivos que ya viene incorporado con NodeJS que me permite realizar las operaciones de Crear, Leer, Actualizar, Borrar registros (CRUD)

// Paso 1: Importamos el módulo
const fs = require ("fs");
//console.log(fs);


// A) FORMA SINCRONICA
const rutaSin = "./ejemplo-sin.txt";

// Crear un archivo:
fs.writeFileSync(rutaSin,"Hola, estamos trabajando en un ejemplo sincrónico.");

// Leer un archivo:
// let contenido = fs.readFileSync(rutaSin, "utf-8");
// console.log(contenido);

// Podemos verificar primero que el archivo exista
if(fs.existsSync(rutaSin)){
    let resultado = fs.readFileSync(rutaSin,"utf-8");
    console.log(resultado);
} else {
    console.log("No existe el archivo, vamos a moriiiiiir!");
}

// Actualizar contenidos:

// Sobrescribiendo el contenido.
fs.writeFileSync(rutaSin,"Hola, actualizamos la info");

// Agregando contenido al final.
fs.appendFileSync(rutaSin," y este es un texto agregado al final.");

// Eliminar un archivo
fs.unlinkSync(rutaSin);







// B) Trabajando con Callbacks

const conCall = "./ejemplo-con.txt";

fs.writeFile(conCall, "Nuevo archivo, ahora con Callbacks", (error) => {
    // el tercer parámetro es un callback, que pregunta si hubo un error.
    if (error) return (console.log("No pudimos crear el archivo."));
    
    // Leemos el archivo:
    fs.readFile("firulais.txt","utf-8",(error,contenido) => {
        if (error) return (console.log("No pudimos leer el archivo."));
        console.log(contenido);

        // Acá el cb tiene 2 parámetros, uno el error, segundo el contenido.
    })

    // Y si queremos agregar info
    fs.appendFile(conCall," mas contenido.", (error) => {
        if (error) return (console.log("No pudimos actualizar el archivo."));
 
        fs.unlink(conCall, (error) => {
            if (error) return (console.log("No pudimos eliminar el archivo."));
        })
    })


})





// C) Utilizando promesas
// Para poder trabajar con promesas, tenemos que usar la propiedad "promises" del módulo fs:

const textoPromises = "./texto-pro.txt";

const operacionesAsincronicas = async () => {
    // Crear un archivo:
    await fs.promises.writeFile(textoPromises,"Nuevo Archivo!");

    // Leer el archivo:
    let respuesta = await fs.promises.readFile(textoPromises,"utf-8");
    console.log(respuesta);

    // Agregar contenido al final:
    await fs.promises.appendFile(textoPromises," ... agregamos este texto");

    // Releer por consola
    respuesta = await fs.promises.readFile(textoPromises,"utf-8");
    console.log(respuesta);

    // Eliminar archivo
    await fs.promises.unlink(textoPromises);
}

operacionesAsincronicas();




// 2) Manejo de datos complejos.

// Desarrollamos un array de personas:

const arrayPersonas = [
    {nombre: "Pepe", apellido: "Argento", edad: 50},
    {nombre: "Moni", apellido: "Argento", edad: 48},
    {nombre: "Paola", apellido: "Argento", edad:17},
    {nombre: "Coky", apellido: "Argento", edad: 15},
    {nombre: "Fatiga", apellido: "Argento", edad: 9}
];

const archivoArgento = "./archivo-argento.json";

// De esta forma lo guardamos
const guardarArchivos = async () => {
    await fs.promises.writeFile(archivoArgento, JSON.stringify(arrayPersonas,null,2));
}

guardarArchivos();


const leerArchivos = async () => {
    const respuesta = await fs.promises.readFile(archivoArgento,"utf-8");
    const nuevoArray = JSON.parse(respuesta);
    console.log(nuevoArray);
}

leerArchivos();








// Desafío #2 - Agregamos fileSystem para cambiar el modelo de persistencia actual

