import { Server } from "socket.io";
import express from "express";

const router = express.Router();

import { ProductManager } from "../controllers/ProductManager.js";
const PM = new ProductManager("./src/models/productos.json");

import ProductosModel from "../models/productos.model.js";


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
/* // Ruta Form de carga nuevos productos
router.get("/newproduct", (req,res) => {
    res.render("newProduct");
})s

// Ruta para cargar nuevos productos
router.post("/newproduct", async (req,res) => {
    try {
        
    } catch (error) {
        
    }
} ) */


// Exporto
export default router;

