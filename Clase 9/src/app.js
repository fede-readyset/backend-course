/* CLASE 9 - MOTORES DE PLANTILLAS */

// Temas del día
// ¿Qué es un motor de plantillas?
// Handlebars, instalación y uso.
// Estructuras, condicionales y ciclos.
// Organizamos el router de handlebars
// Trabajamos con la carpeta public, con js y css.


// Organizamos nuestra app

import express from "express";

const app = express();
const PUERTO = 8080;
import viewsRouter from "./routes/views.router.js";


// Middleware
app.use(express.static("./src/public"));

// Me traigo el módulo de Express-Handlebars
import exphbs from "express-handlebars";

// Configuramos el motor de plantillas:
app.engine("handlebars", exphbs.engine());
// le decimos a express que cuando vea un archivo de extensión handlebars utilice el motor de plantillas "handlebars"

app.set("view engine", "handlebars");
// nuevamente le decimos que la vista de nuestra app es desarrollada con handlebars

app.set("views", "./src/views")

app.use("/", viewsRouter);

app.listen(PUERTO,() => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})