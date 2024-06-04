/* Clase 25 - PROCESO PRINCIPAL DEL SERVIDOR +GLOBAL & CHILD PROCESS */

// Temas del día

// 1) Objeto process
// 2) Manejar argumentos
// 3) Commander JS
// 4) Manejo de variables de entorno
// 5) Listeners
// 6) Child process



///////////////////////////////////
// Cada vez que se ejecuta la consola node src/app.js se crea automaticamente el objeto process que tiene informaicón sobre el proceso en nuestra compu



// //console.log(process);

// // Directorio donde se ejecuta el proceso
// console.log(process.cwd());

// // Obtener ID del proceso
// console.log(process.pid);

// // Saber cuánta memoria está usando el proceso
// console.log(process.memoryUsage());

// // Saber qué versión del proceso (node) estamos corriendo
// console.log(process.version);

// // Si queremos finalizar un proceso
// //process.exit();



// // 2) Manejo de argumentos
// console.log(process.argv);



import express from "express";
const app = express();
import mongoose from "mongoose";
import UserModel from "./models/usuarios.model.js";
import configObject from "./config/config.js";

const {mongo_url, puerto } = configObject;

// Rutas
app.get("/", async (req,res) => {
    try {
        const usuarios = await UserModel.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send("Error del servidor")
    }
})

app.listen(puerto);


// Nos conectamos con mongodb
mongoose.connect(mongo_url)
    .then(()=> console.log("Conectados a MongoDB"))
    .catch(() => console.log("Error"))



// 6) Child processes 
/* function operacionCompleja() {
    let resultado = 0;
    for (let i=0; i< 5e9; i++){
        resultado += 1;
    }
    return resultado;
}

app.get("/suma",(req,res) => {
    const resultado = operacionCompleja();
    res.send(resultado);
}) */




import {fork} from "child_process";
app.get("/suma", (req,res)=>{
    const child = fork ("./src/operacionCompleja.js");
    child.send("iniciando"); // acá el proceso padre le envia un mensaje al hijo
    child.on("message", resultado => {
        res.send (`El resultado de la operacion es: ${resultado}`);
    })
})