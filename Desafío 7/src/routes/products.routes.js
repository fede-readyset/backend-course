// Importo express
import express from "express";
const router = express.Router();

// Importo el Controller de Productos
import { ProductController } from "../controllers/product.controller.js";
const productController = new ProductController();

// Defino las rutas
router.get("/products", productController.getProducts);
router.get("/products/:pid", productController.getProductById);
router.post("/products", productController.addProduct);
router.put("/products/:pid", productController.updateProduct);
router.delete("/products/:pid", productController.deleteProduct);

// Exporto
export default router;