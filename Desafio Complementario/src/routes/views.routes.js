import { Server } from "socket.io";
import express from "express";

const router = express.Router();

import { ProductManager } from "../controllers/ProductManager.js";
const PM = new ProductManager("./src/models/productos.json");

import ProductosModel from "../models/productos.model.js";

router.use(express.json());
router.use(express.urlencoded({extended:true}));

// Ruta raíz /
router.get("/", async (req,res) => {
    try {
        const products = await ProductosModel.find().lean();
        //console.log(products);

        res.render("home",{products});
    } catch (error) {
        res.status(500).json ({error: "Error interno del servidor"});
    }
})

// Ruta realTimeProducts
router.get("/realtimeproducts", (req,res) => {
    res.render("realTimeProducts");
})


// WIP
// Ruta Form de carga nuevos productos
router.get("/newproduct", (req,res) => {
    res.render("newProduct");
})


import bodyParser from "body-parser";
router.use(bodyParser.urlencoded({ extended: true }));


// Ruta para cargar nuevos productos
router.post("/newproduct", async (req,res) => {
    console.log(req.body);

    try {

        const nuevoProducto = new ProductosModel();
        nuevoProducto.title = req.body.title;
        nuevoProducto.description = req.body.description;
        nuevoProducto.price = req.body.price;
        nuevoProducto.thumbnail = req.body.thumbnail;
        nuevoProducto.code = req.body.code;
        nuevoProducto.category = req.body.category;
        nuevoProducto.status = req.body.status === 'on';

        await nuevoProducto.save();
        res.redirect("/");

    } catch (error) {
        res.status(500).send({message: `Error en el servidor: ${error}`}); 
    }
}) 



// Exporto
export default router;

