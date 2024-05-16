/* CLASE 22 - RUTEO AVANZADO */

// Temas del día:

// 1) Expresiones regulares
// 2) Restringir parámetros
// 3) Validar parámetros
// 4) Custom router
// 5) Custom response


// EXPRESIONES REGULARE: son herramientas que permiten validar diferentes patrones en cadenas de texto
// Por ejemplo, validar un email 


// Ejemplo con un correo electrónico
let correoIngresado = "lionel@messi.com";
let correoFalso = "tinkiwinki";

const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(patronCorreo.test(correoIngresado));
console.log(patronCorreo.test(correoFalso));



// Ejemplo con número de teléfono
// esperamos (xxx) xxx - xxxx

let telefonoIngresado = "(223) 669-1111";
let telefonoFalso = "(3571) 42-1111";

const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;
console.log(patronTelefono.test(telefonoIngresado));
console.log(patronTelefono.test(telefonoFalso));




// 2) Restringiendo parámetros
// Vemos que pasa cuando queremos trabajar con rutas y 
import express from "express";
const app = express();
const PUERTO = 8081;
import clientesRouter from "./routes/clientes.router.js";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/clientes", clientesRouter);



// Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})