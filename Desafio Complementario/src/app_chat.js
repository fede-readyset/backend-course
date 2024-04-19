import express from "express";
import exphbs from "express-handlebars";
import {Server} from "socket.io";
import MensajesModel from "./models/mensajes.model.js";
import "./database.js";

const app = express();
const PUERTO = 8080;

// Middlewares
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


// Rutas
app.get("/", (req,res)  => {
    res.render("chat");
})
// Listen
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})



// Me guardo una referencia del server.
// Genero una instancia de Socket.io del lado del BE.

const io = new Server(httpServer);


// Establecemos la conexión
io.on("connection", async (socket) => {
    console.log("Nuevo usuario conectado");

    const messagesLogs = await MensajesModel.find().lean();
    io.emit("messagesLogs", messagesLogs);

    socket.on("message", async (data)  => {
        const newMessage = new MensajesModel();
        newMessage.user = data.user;
        newMessage.message = data.message;

        const messages = await newMessage.save()
        .then (message => console.log(message))
        .catch (error => console.log(error)); 

        const messagesLogs = await MensajesModel.find().lean();
        io.emit("messagesLogs", messagesLogs);
    })
});
