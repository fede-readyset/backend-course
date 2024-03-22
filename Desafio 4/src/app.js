// Importo librerías 
import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import { ProductManager } from "./controllers/ProductManager.js";
const PM = new ProductManager("./src/models/productos.json");

// Defino variables e instancio clases
const PUERTO = 8080;
const app = express();

// Vinculo las rutas
import cartsRouter from "./routes/carts.routes.js";
import productsRouter from "./routes/products.routes.js";
import viewsRouter from "./routes/views.routes.js";

// Configuro Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

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
app.use("/api", cartsRouter);
app.use("/api", productsRouter);
app.use("/", viewsRouter);

// Listener
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
});


// Instancio io
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado desde la IP: "+socket.handshake.address);
    
    socket.on("Message", async (data) => {
        let productos = await PM.getProduct();
        socket.emit("Productos", productos);
    })
})










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Función opcional para dar formato de tabla HTML al objeto
// function formatDataAsTable(data, limit) {
//     let html = '<table style="border-collapse: collapse; width: 100%;">';
//     html += '<tr style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">';
//     for (const key in data[0]) {
//         html += `<th>${key}</th>`;
//     }
//     html += '</tr>';

//     data.slice(0, limit).forEach(item => {
//         html += '<tr>';
//         for (const key in item) {
//             html += `<td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item[key]}</td>`;
//         }
//         html += '</tr>';
//     });

//     html += '</table>';
//     return html;
// }