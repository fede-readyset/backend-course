// MOCK: Es una imitación de un dato real. Es una simulación que generamos en el entorno de desarrollo para no manipular datos reales y para tener herramientas de trabajo de forma rápida.
// Entonces a través de un mock podemos simular de forma simple y rápida una base de datos de usuarios, productos, clientes, etc.

import express from "express";
import usuariosRouter from "./routes/usuarios.router.js";
const app = express();
const PUERTO = 8081;

app.use("/",usuariosRouter);

app.listen(PUERTO,()=>{
    console.log(`Escuchando en el puerto ${PUERTO}`);
})

