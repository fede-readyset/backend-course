/* CLASE 8 */

// Temas de hoy:
// 1) Express Router
// 2) Middleware
// 3) Servicios de archivos estáticos (public)
// 4) Multer
// 5) Primera Pre Entrega del proyecto final


// Express Router: herramienta que me permite separar mis rutas en distintos módulos.

// Ejercicio de práctica: Mascotas y Usuarios
import express from "express";
const app = express();
const PUERTO = 8080;

// Vinculamos las rutas
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";


// Le podemos decir al servidor que vamos a trabajar con JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", usersRouter);
app.use("/", petsRouter)


app.listen (PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})


// SERVICIOS DE ARCHIVOS ESTÁTICOS: 
// Express nos permite tener archivos estáticos, es decir, que no cambian, tales como html, imágenes, css, etc.
// Estos recursos son visibles para el usuario.


// SI quiero que al ingresar al localhost:8080 me muestre mi index.html, primero tengo que compartir a la carpeta public en un recurso estático y lo hago de esta manera
//app.use(express.static("public"));

// Prefijo virtual: si queremos que la public se llame de otra forma podemos cambiarlo de esta manera:
app.use("/firulais", express.static("public"));



// MIDDLEWARE de terceros: Instalamos multer que permite cargar archivos al servidor.

// A) Instalamos: npm i multer
// B) Importamos:

import multer from "multer";

// Common JS: const multer = require("multer");

// 1) Generamos una constante "upload", que almacenará toda la configuración de multer.
// 2) Creamos una ruta para cargar los archivos.

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./public/img");
        // carpeta donde se guardan las img
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        // mantengo el nombre original de los archivos
    }
})

// Versión básica:
// const upload = multer({dest:"./public/img"});

const upload = multer({storage});

// si quiero pasar 1 archivo
/* app.post("/upload", upload.single("imagen"), (req, res) => {
    res.send("Imagen cargada.");
}) */

// si quiero pasar varios
app.post("/upload", upload.array("imagen"), (req, res) => {
    res.send("Imagen cargada.");
})




// Apuntes para la entrega
// app.use("/api/products", productsRouter);
// app.use("/api/carts", cartsRouter);


