/*  CLASE 7 - EXPRESS AVANZADO */

// Temas del día:

// 1) Códigos de estado.
// 2) ¿Qué es una API?
// 3) API Rest
// 4) Métodos de la petición
// 5) Postman
// 6) Practicamos GET - POST - PUT - DELETE

// Recordemos: el servidor se comunica con el cliente por medio del modelo cliente-servidor, en donde el cliente hace peticiones (requests) y el servidor da respuestas (responses). Esta comunicación se realiza bajo el protocolo HTTP

// 1) Código de estado:

// Se dividen en 5 clases, los que comienzan con...
// 1xx: son respuestas informativas
// 2xx: Son respuestas exitosas, la petición fue recibida, entendida y aceptada.
// 3xx: Son redirecciones, el cliente necesita realizar algunas acciones adicionales.
// 4xx: Son errores del cliente
// 5xx: Son errores del servidor

// Los más utilizados
// 200: La petición fue exitosa.
// 400: Bad request
// 401: Acceso no autorizado. 
// 403: Tus credenciales no te dan permiso para acceder a un recurso. 
// 404: Not found, recurso no encontrado. 
// 500: Error interno del servidor



// 2) ¿Qué es una API?

// API es el acrónimo de Application Programming Interface)
// Es un conjunto de definiciones y reglas que permiten que dos equipos puedan integrarse para trabajar juntos.



// 3) API REST: REpresentational State Transfer

// Los formatos más importantes:
// JSON: Formato de texto sencillo para intercambio de datos
// XML: Lenguaje de marcado con etiquetas, creado para almacenar e intercambiar información.

// Características de las API REST:




// Métodos de petición: Es una definición que forma parte del protocolo http, el cual nos sirve para canalizar el tipo de petición que estoy realizando sobre un cierto endpoint. 

// Basta de teoría!
//////////////////////////////

import express from "express";
// const express = require("express");
const app =  express();
const PUERTO = 8080;

// Middleware (lo explicamos en la clase que viene)
app.use(express.json());
// voy a utilizar JSON para mis datos.
app.use(express.urlencoded({extended:true}));
// Le dice al servidor que vamos a trabajar con datos complejos, es decir, recibir por ejemplo varias querys.



// Array de clientes:

const clientes = [
    {id: "1", nombre: "Lionel", apellido: "Messi"},
    {id: "2", nombre: "Coky", apellido: "Argento"},
    {id: "3", nombre: "Jason", apellido: "Statham"},
    {id: "4", nombre: "Doble", apellido: "Luis Miguel"},
    {id: "5", nombre: "Paola", apellido: "Argento"},
]


// Rutas

// Método GET
app.get("/", (req, res) => {
    res.send(clientes);
})

// VErsion con limite en el retorno de los productos
app.get("/conlimite/:limit",(req, res) =>{
    //let limit = req.params.limit;
    // otra forma:
    let {limit} = req.params;
    const arrayConLimites = clientes.slice(0,parseInt(limit));
    res.send(arrayConLimites);
})


// Retorno un cliente por id
app.get("/cliente/:id", (req, res) => {
    let {id} = req.params;
    const buscado = clientes.find(cliente => cliente.id == id);

    if(buscado){
        res.send(buscado);
    } else {
        res.send("No hay ningún cliente con ese ID");
    }
})


//  Trabajamos con una ruta POST
app.post("/", (req, res) => {
    const clienteNuevo = req.body;
    clientes.push(clienteNuevo);
    console.log(clientes);
    res.status(201).send({message: "Cliente nuevo creado"});
})

// Vamos a actualizar un dato PUT
app.put("/:id", (req, res) => {
    const {id} = req.params;
    const {nombre,apellido} = req.body;

    // Encontrar el cliente con este ID
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);
    if(clienteIndex !== -1) {
        //si el cliente existe actualizo
        clientes[clienteIndex].nombre = nombre;
        clientes[clienteIndex].apellido = apellido;
        console.log(clientes);
        res.status(201).send({message: "Cliente actualizado."});
    } else {
        //si el cliente no se encuentra
        res.status(404).send({message: "Cliente no encontrado."});
    }
})


// Vamos a borrar un registro: DELETE
app.delete("/:id", (req, res) => {
    let id = req.params.id;

    // una vez que tengo el ID lo busco en mi array
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);
    if(clienteIndex !== -1) {
        //si el cliente existe borro
        clientes.splice(clienteIndex,1);
  
        console.log(clientes);
        res.status(201).send({message: "Cliente eliminado."});
    } else {
        //si el cliente no se encuentra
        res.status(404).send({message: "Cliente no encontrado."});
    }
})

app.listen (PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})

