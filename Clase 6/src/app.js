/*  CLASE 6 - SERVIDORES WEB */

// Temas del día:

// 1) ¿Qué es un servidor?
// 2) Protocolo HTTP
// 3) Módulo nativo HTTP
// 4) Express JS
// 5) Objeto Request
// 6) Desafío #3


//////////////////////

// 1) ¿Qué es un servidor?

// Software o hardware que almacena y administra recursos. Estos recursos pueden ser imágenes, archivos, sitios web, videos, datos, juegos. Su función es responder a las peticiones d elos clientes. Aclaramos: el servidor puede responder a multiples clientes al mismo tiempo. A esta relación se la conoce como modelo cliente-servidor

// Cliente = request
// Servidor = response


// ¿Bajo qué protocolo se comunican el cliente y el servidor?
// HTTP: Significa Hyper Text Transfer Protocol. Es un protocolo de comunicación, es decir, un conjunto de reglas que definen cómo se comunican dos dispositivos.


// 2) Módulo Nativo HTTP

// Primer paso: importar el módulo nativo HTTP
// const http = require ("http");

// Segundo paso: creamos el servidor, para lo cual usamos un método que se llama createServer() Este método recibe por parámetro una función callback que va a ser ejecutada cada vez que se realice una petición al servidor. Esta función recibe dos parámetros: request y response.

// const server = http.createServer( (request,response) => {
//     console.log("Se realizó una petición al servidor.");
//     response.end("Mi primer hola mundo desde Backend.");
// });


// Tercer paso: Ponemos a escuchar al servidor en un puerto específico.


// server.listen(PUERTO, () => {
//     console.log(`Escuchando en el http://localhost:${PUERTO}`);
// })
        


// 4) Express JS: es un Framework minimalista de Node JS que nos permite crear servidores de una forma mucho más sencilla.
        
// Instalación: npm install express
        
// Importamos el módulo: 
    
const PUERTO = 8080;
const express = require("express");


// Creación de una app de express
const app = express();

// Rutas
app.get("/", (req,res) => {
    // Cuando utilizo la "/" hago referencia a la ruta raíz de la aplicación.
    res.send("Mi primera chamba con Express JS.");
});


// Los métodos HTTP o verbos son los que nos permiten indicarle al servidor qué tipo de acción queremos realizar. Los más utilizados:

// GET: Lo usamos para pedir datos al servidor.
// POST: lo usamos para enviar datos al servidor.
// PUT: Lo usamos para actualizar datos del servidor.
// DELETE: Lo usamos para eliminar datos del servidor.

app.listen(PUERTO, () => {
         console.log(`Escuchando en el http://localhost:${PUERTO}`);

} );


// Practicamos con otras rutas: (endpoints)

app.get("/tienda",(req,res) => {
    res.send("Bienvenido a la tienda");
})


app.get("/contacto",(req,res) => {
    res.send("Bienvenidos a Contacto");
})


// 5) Objeto request: es un objeto que representa la petición que realiza el cliente al servidor. Este objeto tiene información sobre la petición que se realizó, por ejemplo, la URL, el método, los parámetros, el cuerpo...


// Array de productos Marolio:

const misProductos = [
    { id:1, nombre:"Fideos", precio:150 },
    { id:2, nombre:"Arroz", precio:120 },
    { id:3, nombre:"Pan", precio:50 },
    { id:4, nombre:"Leche", precio:300 },
    { id:5, nombre:"Queso", precio:220 },
    { id:6, nombre:"Manteca", precio:120 },
    { id:7, nombre:"Galletas", precio:50 },
];

// Creamos una ruta nueva que se va a llamar "productos" y retornará todos los productos del array.

app.get("/productos",(req,res) => {
    res.send(misProductos);
})


// req.params = contiene los parámetros de la ruta. Por ejemplo, si tenemos la ruta /productos/:id, podemos acceder a ese id de la siguiente manera: req.params.id

app.get("/productos/:id", (req,res) => {
    let id = parseInt(req.params.id);
    // Siempre que recuperamos un dato de los params es un "string"!!
    // Para solucionar lo pueden parseInt.

    const producto = misProductos.find( producto => producto.id === id);
    if(producto){
        res.send(producto);
    }
    else{
        res.send("Producto no encontrado.");
    }
});



// req.query = se refiere a las múltiples consultas que se pueden hacer en determinadas rutas (endpoints). Simplemente le tenemos que colocar el ? y luego el nombre de la consulta.

app.get("/clientes", (req, res) => {
    // let nombre = req.query.nombre;
    // let apellido = req.query.apellido;
    // ó:
    let {nombre,apellido} = req.query;

    res.send(`Bienvenido ${nombre} ${apellido}.`);
})



// Ejemplo rústico: como retornar determinada cantidad de productos de un array:

app.get("/product",  (req, res) =>{
    let limit = parseInt(req.query.limit);

    let productos = misProductos.slice(0,limit);
    res.send(productos);

})