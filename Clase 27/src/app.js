/* Clase 27 - ARQUITECTURA DEL SERVIDOR */

// Temas del día:
// 1) Consejos para desarrollar un servidor
// 2) Patrones de diseño
// 3) Singleton para MongoDB
// 4) Comunicación entre el Front y el Back

///////////////////////////////////////////


// 1) Código Reutilizable



// levantamos un servidor simple:

import express from "express";
const app = express();
const PUERTO = 8080;
import "./database.js";
import productosRouter  from "./routes/productos.router.js";


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

app.use("/productos",productosRouter)

app.listen(PUERTO,()=>{
    console.log(`Escuchando en el puerto ${PUERTO}`);
})



