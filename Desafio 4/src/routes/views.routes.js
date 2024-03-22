import { Server } from "socket.io";
import express from "express";
const router = express.Router();

import { ProductManager } from "../controllers/ProductManager.js";
const PM = new ProductManager("./src/models/productos.json");

// Ruta raíz /
router.get("/", async (req,res) => {
    try {
        const productos = await PM.getProduct();
        res.render("home",{productos});
    } catch (error) {
        res.status(500).json ({error: "Error interno del servidor"});
    }
})

// Ruta realTimeProducts
router.get("/realtimeproducts", (req,res) => {
    res.render("realTimeProducts");
})

// Exporto
export default router;

