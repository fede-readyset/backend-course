/** CLASE 34 - Loggers y Testing de Performance */

// Temas de hoy:
// 1) Qué son los loggers?
// 2) Winston
// 3) Test de carga con Artillery
// 4) Desafío


// LOGGERS: es una herramiente que registra información importante sobre el funcionamiento de la aplicación mientras se ejecuta. Estos registros son útiles para diagnosticar problemas, rastrear eventos y ver el rendimiento del sistema.

// Los LOGGERS tienen dos características principales:

// - Podemos separar los mensajes en diferentes "niveles" y estos pueden ser configurados por nosotros mismos
// - Podemos enviar esa información a otros recursos, a partir del transporte. Entonces puedo enviar mis logs a DB, files, email, e incluso a la consola.

// WINSTON:
// Es una biblioteca popular de logging para node JS.



import express from "express";
const app = express();
const PUERTO = 8081;
import addLogger from "./utils/logger.js";

//Middleware
app.use(addLogger);

// Ruta para testear Winston:
app.get("/loggertest", (req, res) => {
    req.logger.http("Mensaje HTTP");
    req.logger.info("Mensaje INFO");
    req.logger.warning("Mensaje WARN");
    req.logger.error("Mensaje ERROR");
    res.send("Logs Generados")

})

app.get("/", (req, res) => {
    res.send("Hola");
})


// Simulamos algunas peticiones:
// OPERACION SIMPLE:
app.get("/operacionsimple", (req, res) => {
    let suma = 0;
    for (let i = 0; i < 1000000; i++) {
        suma += i;
    }
    res.send({suma});
})

// OPERACION COMPLEJA:
app.get("/operacioncompleja", (req, res) => {
    let suma = 0;
    for (let i = 0; i < 5e8; i++) {
        suma += i;
    }
    res.send({suma});
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);

})



// ARTILLERY:
// Es una herramienta que permite simular multiples peticiones de información al servidor, con la idea de testear su funcionamiento.
// Se recomienda instalar de forma global: npm i artillery -g


// artillery quick --count 40 --num 50 "http://localhost:8081/operacionsimple" -o simple.json
// 