/** CLASE 14 - MONGOOSE */

// Temas de hoy:
// 1) Clientes de base de datos
// 2) MongoDB Atlas
// 3) Definición de una DB como servicio (DBaaS)
// 4) Configurar e instalar mongoose
// 5) CRUD desde nuestra app



import express from "express";
import usuariosRouter from "./routes/usuarios.router.js";
const app = express();
const PUERTO = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Rutas
app.use("/", usuariosRouter);

// Listen
app.listen(PUERTO, () => {
    console.log (`Escuchando en el puerto $PUERTO`);
})


// Conectamos a Mongo Atlas usando Mongoose
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/Tienda?retryWrites=true&w=majority")
    .then(() => console.log("Conectados a la base de datos"))
    .catch((error) => console.log("Error: ", error))

    