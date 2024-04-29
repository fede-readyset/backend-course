/* CLASE 18 - COOKIES Y SESSION */

// Las cookies son pequeños archivos de texto que viven en el navegador del usuario.
// Esta info puede viajar entre las peticiones del cliente al servidor.

// ¿Qué dato podemos guardar?
// a) ID de las sesiones.
// b) Preferencias del usuario.
// c) Nombre del usuario


// Caracteristicas:

// Se le puede configurar un tiempo de vida
// Espacio limitado, almacenamiento del lado del cliente
// Podemos darle un poco de seguridad con claves
// Cuidado! No tenemos que almacenar datos sensibles

// Vamos a instalar una dependencia que permite gestionar cookies: npm i cookie-parser


// Sessions:
// Nos permite conseguir un almacenamiento de información del cliente pero en el servidor.
// Se maneja con el objeto request (req.session)

// La información se almacena del lado del servidor
// Del lado del cliente se crea un identificador unico para poder acceder a esa info
// Los datos almacenados en session se borran al cerrar la solapa del browser.

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();
const PUERTO = 8080;
const miClaveSecreta = "TinkiWinki";

// Middleware
app.use(cookieParser(miClaveSecreta));
app.use(session({
    secret:"secretCoder",
    resave:true,
    // permite mantener activa la sesion ante inactividad del usuario.
    saveUninitialized:true
    // permite guardar cualquier sesión aún cuando el objeto de sesión no tenga contenido
}))

// Middleware de authentication:
function auth(req,res,next){
    if(req.session.user === "Tinki" && req.session.admin) {
        return next();
    }
    return res.status(403).send("Error de autorización");
}


app.get ("/", (req,res)  => {
    res.send("Hola");
})

// Setear cookies
app.get("/setCookie", (req,res) => {
    // Usamos el objeto res para asignarle la cookie al usuario/cliente
    // res.cookie("coderCookie", "Mi Primera cookie").send("Cookie seteada");

    // Esta cookie vive hasta que es eliminada. Si queremos que tenga un tiempo de vida limitado lo configuramos con:
    res.cookie("coderCookie", "Mi Primera cookie", {maxAge:100000}).send("Cookie seteada");

})

// Leer las cookies
app.get("/getCookie", (req,res) => {
    res.send(req.cookies.coderCookie);
})


// Borrar las cookies
app.get("/delCookie", (req,res) => {
    res.clearCookie("coderCookie").send("Cookie borrada.");

})



// Setear cookie firmada
app.get ("/setCookieSigned", (req,res) => {
    res.cookie("cookieFirmada","Esto es un mensaje secreto",{signed:true}).send("Cookie firmada enviada.");
})

// Leer cookie firmada
app.get("/getCookieSigned", (req,res) => {
    // para recuperar la cookie firmada, usamos req.signedCookies
    const valorCookie = req.signedCookies.cookieFirmada;
    if(valorCookie){
        res.send("Cookie firmada recuperada:  " +  valorCookie);
    } else {
        res.send("Cookie inválida");
    }

})


// Levantamos la session en el endpoint
app.get("/session", (req,res) => {
    // si al conectarme la sesión ya existe, aumento un contador
    if (req.session.counter) {
        req.session.counter++;
        res.send("Visitaste el sitio "+req.session.counter+" veces.");
    }
    else {
        req.session.counter = 1;
        res.send("Bienvenido, esta es tu primer visita.");
    }
} )

// Eliminamos datos de la sesion
app.get("/logout", (req,res) => {
    // para eliminar datos de una variable de sesion, se utiliza el método req.destroy
    req.session.destroy( (error) => {
        if (!error) {
            res.send("Sesión cerrada.")
        } else {
            res.send("Error al cerrar la sesión.")
        }
    })
})


// Login con session
app.get("/login", (req,res) => {
    let {user,pass} = req.query;
    if (user === "Tinki" && pass === "Winki") {
        req.session.user = user;
        req.session.admin = true;
        res.send("Sesión iniciada con éxito.");
    } else {
        res.send("Datos incorrectos.");
    }
})

// Ruta privada con login
app.get("/privado", auth, (req,res) => {
    res.send("Si ves esto es porque estás logueado y sos admin");
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}.`);
});