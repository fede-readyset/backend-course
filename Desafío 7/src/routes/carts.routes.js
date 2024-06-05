// Importo express
import express from "express";
const router = express.Router();

// Importo el Controller de Carritos
import { CartController }  from "../controllers/cart.controller.js";
const cartController = new CartController();


// Defino las rutas 
router.get("/carts", cartController.getCart);
router.get("/carts/:cid", cartController.getCartById);
router.post("/carts", cartController.addCart);
router.post("/carts/:cid/product/:pid", cartController.addProductToCart);
router.delete("/carts/:cid/product/:pid", cartController.removeProductFromCart);
router.delete("/carts/:cid", cartController.emptyCart);
router.put("/carts/:cid/",cartController.changeProducts);

// Exporto
export default router;



