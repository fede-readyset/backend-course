// Importo express
import express from "express";
const router = express.Router();

// Importo el Controller de Carritos
import { CartController }  from "../controllers/cart.controller.js";
const cartController = new CartController();

import checkUserRole from "../middlewares/rolecheck.js";


// Defino las rutas 
router.get("/", cartController.getCart);
router.get("/:cid", cartController.getCartById);
router.post("/", cartController.addCart);
router.post("/:cid/product/:pid", checkUserRole(['user']), cartController.addProductToCart);
router.delete("/:cid/product/:pid", checkUserRole(['user']), cartController.removeProductFromCart);

router.delete("/:cid", cartController.emptyCart);
router.put("/:cid",cartController.changeProducts);
router.get("/:cid/purchase",cartController.confirmPurchase);

// Exporto
export default router;



