/* CLASE 19 - COOKIES, SESSION Y STORAGE 2 */

// El memory storage es el espacio de memoria volátil que tiene el server para almacenar las sesiones. 
// Si el servidor se cae o se reinicia, se pierden todas las sesiones

// Instalamos: npm i express mongoose express-session

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";

const app = express();
const PUERTO = 8081;
const FileStorage = FileStore(session);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(session({
    // 1) Con Memory Storage:
    secret: "secretCoder",
    resave: true,
    // Esta conf mantiene la sesión activa frente a inactividad del user
    saveUninitialized: true,
    // Guarda la sesión aunque el objeto no tenga nada 

    // 2) Con File Storage
    // npm i session-file-storage
    
    store: new FileStorage({path:"./src/sessions", ttl:100, retries: 1}),
    // path: ruta donde se guardan los archivos de sesiones
    // ttl: tiempo de vida (en segundos)
    // retries: cantidad de veces q el server intentará leer el archivo

}))


//////// Rutas

// Repaso de cookies
app.get("/crearCookie",(req,res)=>{
    res.cookie("Cookie","Esto es una cookie!").send("Cookie seteada");
})

app.get("/borrarCookie", (req,res) =>{
    res.clearCookie("Cookie").send("Cookie borrada");
})

// Login de usuario con session:
app.get("/login", (req,res) =>{
    let usuario = req.query.usuario;
    req.session.usuario = usuario;
    res.send("Guardamos el usuario por medio de query.");
})

// Verificamos el usuario
app.get("/usuario",(req,res) => {
    if(req.session.usuario) {
        return res.send(`El usuario registrado es ${req.session.usuario}`)
    } else {
        res.send("No hay un usuario registrado.");
    }
})

// Listen
app.listen(PUERTO,() => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});