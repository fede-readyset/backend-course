/* CLASE 26 - ARQUITECTURA POR CAPAS */

// Ejercicio Juguetería

import express from "express";
const app = express();
const PUERTO = 8080;
import "./database.js"
import jugueteRouter from "./routes/juguetes.router.js";


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));


// Rutas
app.use("/juguetes", jugueteRouter);


// Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})