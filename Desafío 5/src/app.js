// Importo librerías 
import express from "express";
import exphbs from "express-handlebars";

import MongoStore from "connect-mongo";
import session from "express-session";

import "./database.js";

import { Server } from "socket.io";

// import { ProductManager } from "./controllers/ProductManager.js";
// const PM = new ProductManager("./src/models/productos.json");

// Defino variables e instancio clases
const PUERTO = 8080;
const app = express();

// Vinculo las rutas
import cartsRouter from "./routes/carts.routes.js";
import productsRouter from "./routes/products.routes.js";
import viewsRouter from "./routes/views.routes.js";
import chatRouter from "./routes/chat.routes.js";
import usersRouter from "./routes/user.routes.js";
import sessionsRouter from "./routes/session.routes.js";
import MensajesModel from "./models/mensajes.model.js";
import ProductosModel from "./models/productos.model.js";


// Configuro Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
app.use(session({
    secret:"secretCoder",
    resave:true,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/ecommerce?retryWrites=true&w=majority",
        ttl:100   
    })
}))

// Middleware para pasar el objeto io al router
app.use((req, res, next) => {
    req.io = io;
    next();
  });


// Configuro express-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");

// Configuro Rutas
app.use("/", viewsRouter);
app.use("/chat", chatRouter);
app.use("/api", cartsRouter);
app.use("/api", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);



// Listener
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
});


// Instancio io para chat
const io = new Server(httpServer);

// Establecemos la conexión
io.on("connection", async (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("Request", async (data) => {
        //let productos = await PM.getProduct();
        const products = await ProductosModel.find().lean();
        //console.log(products);
        socket.emit("Productos", products);
    })

    socket.on("message", async (data)  => {
        const newMessage = new MensajesModel();
        newMessage.user = data.user;
        newMessage.message = data.message;

        const messages = await newMessage.save()
        .then (message => console.log("Mensaje de chat recibido"))
        .catch (error => console.log(error)); 

        const messagesLogs = await MensajesModel.find().lean();
        io.emit("messagesLogs", messagesLogs);
    })
});












