/* MONGO AVANZADO 2 */

// Temas:

// 1) Agregaciones
// 2) Paginación

////////////////////////

// import mongoose, { mongo } from "mongoose";
// import OrderModel from "./models/order.model.js";

// const main = async () => {
//     await mongoose.connect("mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/Pizzeria?retryWrites=true&w=majority");

//     // Ejercicio 1: Calcular el total de las pizzas vendidas por sabor sólo de las familiares
//     const resultado = await OrderModel.aggregate([
//         {
//             $match: {
//                 tam: "familiar"
//             }
//         },
//         {
//             $group: {
//                 _id: "$nombre",
//                 total: {
//                     $sum: "$cantidad"
//                 }
//             }
//         },


//         // Ejercicio 2: Ordenados por ventas y guardados en una nueva colección
//         {
//             $sort: {
//                 total: -1 //orden descendente
//             }
//         },
//         {
//             $group: {
//                 _id: 1,
//                 orders: {
//                     $push: "$$ROOT"
//                     // Push indica que se guardan los resultados en un array y
//                     // $$ROOT hace referencia al documento actual
//                 }
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 orders: "$orders"
//                 // Aca le decimos que el campo orders, va a ser igual a los resultados que guardamos en el paso anterior 
//             }
//         },
//         // ultimo paso superimportante: merge de los resultados en una nueva colección
//         {
//             $merge: {
//                 into: "reportes"
//             }
//         }
//     ])


    
//     console.log(resultado);
// }

//  main();




// 2) Paginación:
// Es un proceso que consiste en dividir los resultados en bloque de datos
// Instalamos la dependencia con npm install mongoose-paginate-v2

// Ejemplo con express

import express from "express";
const app = express();
const PUERTO = 8080;
import exphbs from "express-handlebars";
import OrderModel from "./models/order.model.js";
import "./database.js";



// Express-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");


// Creamos una ruta
app.get("/pizzas", async (req,res) => {
    const page = req.query.page || 1;
    let limit = 3;

    try {
        const pizzas = await OrderModel.paginate({},{limit,page});
        
        const pizzasResultadoFinal = pizzas.docs.map(pizza => {
            const {_id, ...rest} = pizza.toObject();
            return rest;
        })
        
        
        res.render("pizzas",{
            pizzas:pizzasResultadoFinal,
            hasPrevPage: pizzas.hasPrevPage,
            hasNextPage: pizzas.hasNextPage,
            prevPage: pizzas.prevPage,
            nextPage: pizzas.nextPage,
            currentPage: pizzas.page,
            totalPages: pizzas.totalPages
        });




    } catch (error) {
        res.status(500).send("Error en el servidor");
    }

})

// Listen
app.listen(PUERTO,() =>{
    console.log("Escuchando en el puerto 8080");
})


