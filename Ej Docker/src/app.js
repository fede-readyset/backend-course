/* EJEMPLO CON DOCKER */

import express from "express";
const app = express();
const PUERTO = 8081;

app.get("/", (req,res) => {
    res.send("Hola mundo, estoy en docker");
})

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8081")
})