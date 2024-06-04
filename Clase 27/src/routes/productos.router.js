import express from "express";
const router = express.Router();

// importar controladores
import ProductoController from "../controllers/productos.controller.js";
const productoController = new ProductoController();

router.get("/", productoController.getProductos);
router.post("/", productoController.postProducto);

export default router;
