/** AFTER - DAO */
import express from "express";
const app= express();
const PUERTO = 8081;
import "./database.js";
import jugueteRouter from "./routes/juguetes.router.js";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Rutas
app.use("/juguetes",jugueteRouter);

// Listen
app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el puerto ${PUERTO}`);
})