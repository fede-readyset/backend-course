/* CLASE 32 - Optimización del servidor */



import express from "express";
const app = express();
const PUERTO = 8081;

import usuariosRouter from "./routes/usuarios.router.js";
import manejadorError from "./middlewares/error.js";


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GZIP: algoritmo de compresión ampliamente utilizado (creado en los 90'). Utiliza el algoritmo DEFLATE, y es compatible con todos los navegadores

// 1) importamos
// import compression from "express-compression";

// 2) Lo usamos como middleware

// GZIP
// app.use(compression());

/* // BROTLI
app.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
        // zlib es una dependencia interna de brotli que espera un objeto c/diferentes niveles de compresion
    }
}))

app.get("/", (req, res) => {
    let string = "Hola coders, soy un string ridiculamente largo";

    for (let i = 0; i < 5e4; i++) {
        string += "Hola coders, soy un string ridiculamente largo";
    }
    res.send(string);
})
 */


app.use("/usuarios", usuariosRouter);
app.use(manejadorError);

// IMPORTANTE: El middleware debe ser invocado después de las rutas.


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})



// instalamos npm i express-compression
// datos transferidos sin compresión 2.3mb/
// con gzip 7.1kb
// con brotli 304b
