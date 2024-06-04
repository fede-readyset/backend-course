// Importo módulos propios y de terceros 
//import { CartManager } from "../controllers/CartManager.js";
import { CartManager } from "../controllers/CartManagerDB.js";
import CarritosModel from "../models/carritos.model.js";
import ProductosModel from "../models/productos.model.js";
import express from "express";


const router = express.Router();
const CM = new CartManager();


// Ruta GET 
router.get ("/carts", async (req,res) => {
    const result = await CM.getCart(req.query.limit);
    res.send(result);
});

// Ruta GET para listar el contenido de un carrito 
router.get ("/carts/:cid", async (req,res) => {
    const result = await CM.getCartById(req.params.cid);
    res.send(result);
});

// Ruta POST para nuevos carritos
router.post ("/carts", async (req,res) => {
    const result = await CM.addCart(req.body.products)
    res.send(result);
})

// Ruta POST para agregar items a un carrito existente
router.post ("/carts/:cid/product/:pid", async (req,res) => {
    const result = await CM.addProductToCart(req.params.cid,req.params.pid);
    res.send(result);
})


// Ruta DELETE para eliminar un producto de un carrito
router.delete ("/carts/:cid/product/:pid", async (req,res) =>{
    const result = await CM.removeProductFromCart(req.params.cid,req.params.pid);
    res.send(result);
})


// Ruta DELETE para vaciar el carrito
router.delete("/carts/:cid", async (req,res) => {
    const result = await CM.emptyCart(req.params.cid);
    res.send(result);
})

// Ruta PUT para modificar la cantidad de un producto en un carrito
router.put ("/carts/:cid/product/:pid", async (req,res) => {
    const result = CM.changeProdQty(req.params.cid, req.params.pid, req.body.qty);
    res.send(result);
})


// Ruta PUT para modificar productos mediante un arreglo
router.put ("/carts/:cid/", async (req,res) => {
    const result = CM.changeProduct(req.params.cid,req.body);
    res.send(result);


})


// Exporto:
export default router;
