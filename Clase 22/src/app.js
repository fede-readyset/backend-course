/* Clase 22 - Passport avanzado */

import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import passport from "passport";

import initializePassport from "./config/passport.config.js";


const app = express();
const PUERTO = 8081;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();




// Rutas
app.post("/login", (req, res) => {
    let { usuario, pass } = req.body;

    if (usuario === "tinki" && pass === "winki") {
        // // Creo el token
        let token = jwt.sign({ usuario, pass }, "coderhouse", { expiresIn: "24h" });
        // res.send ({message: "Login exitoso",token});


        // Envio token desde cookie
        res.cookie("coderCookieToken", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
            .send({ message: "Login exitoso." });


    } else {
        res.send({ message: "Login fallido" });
    }
})




// Creamos la ruta current:
app.get("/current", passport.authenticate("jwt", /* authorization("admin"), */ { session: false }), (req, res) => {
    res.send(req.user);
})





// Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})