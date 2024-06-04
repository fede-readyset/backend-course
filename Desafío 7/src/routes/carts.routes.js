// Importo express
import express from "express";
const router = express.Router();

// Importo el Controller de Carritos
import { CartController }  from "../controllers/cart.controller.js";
const cartController = new CartController();

router.get("/carts", cartController.getCart);
router.get("/carts/:cid", cartController.getCartById);
router.post("/carts", cartController.addCart);
router.post("/carts/:cid/product/:pid", cartController.addProductToCart);
router.delete("/carts/:cid/product/:pid", cartController.removeProductFromCart);
router.delete("/carts/:cid", cartController.emptyCart);
router.put("/carts/:cid/",cartController.changeProduct);
//router.put("/carts/:cid/product/:pid", cartController.changeProdQty);

// Exporto:
export default router;




/* 
// Ruta PUT para modificar la cantidad de un producto en un carrito
router.put ("/carts/:cid/product/:pid", async (req,res) => {
    const result = CM.changeProdQty(req.params.cid, req.params.pid, req.body.qty);
    res.send(result);
})
 */


