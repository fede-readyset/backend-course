/* CLASE 10 - WEBSOCKETS */

// Temas del día

// 1) ¿Qué es Websockets?
// 2) Socket.io


// 1) Websockets es un protocolo de comunicación bidireccional en tiempo real. A diferencia de HTTP, donde el cliente envía una solicitud y el servidor responde.
// Websockets permite una comunicación contínua y en tiempo real entre el cliente y el servidor

// La comunicación se realiza entre 2 endpoints, cada uno recibe el nombre de "socket".

// ¿Cómo funciona?

// 1) El cliente tiene que enviar una petición HTTP al servidor y esto se conoce como "Handshake".
// 2) El servidor recibe la petición y responde el saludo. A esto se lo conoce como "abrir la conexión".
// 3) Una vez aceptada la comunicación se procede al envío bidireccional de datos

import express from "express";
import exphbs from "express-handlebars";
// const express = require("express");

const app = express();
const PUERTO = 8080;

import viewsRouter from "./routes/views.router.js";


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

// Configuramos express-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views","./src/views")

//Rutas
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () =>{
    console.log("Escuchando en el puerto "+PUERTO);
});



// Pasos para trabajar con socket.io
// 1) Instalamos con NPM: npm install socket.io
// 2) Importamos el módulo:
import { Server } from "socket.io";

// 3) Nos guardamos una referencia de nuestro servidor de express. (httpServer)



// Armamos un array de usuarios:
const usuarios = [
    {id: 1, nombre: "Lionel", apellido: "Scaloni"},
    {id: 2, nombre: "Lionel", apellido: "Messi"},
    {id: 3, nombre: "Pepe", apellido: "Argento"},
    {id: 4, nombre: "Moni", apellido: "Argento"},
    {id: 5, nombre: "Paola", apellido: "Argento"},
    {id: 6, nombre: "Coky", apellido: "Argento"},
]

// Instancia de socket.io del lado del servidor
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Un cliente se conectó");

    // Acá voy a escuchar el evento "mensaje", cuidado que el nombre sea igual en el cliente y en el servidor
    socket.on("Mensaje", (data) => {
        console.log(data);
    })

    // Ahora el servidor le manda un msj al cliente
    socket.emit("Saludo", "Hola Cliente, cómo estas?");

    // Enviamos el array de usuarios
    socket.emit("Usuarios", usuarios);
})


