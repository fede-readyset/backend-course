
// Importo el módulo propio CartManager.js y el módulo de terceros express  
import { CartManager } from "../controllers/CartManager.js";
import CarritosModel from "../models/carritos.model.js"
import express from "express";

const router = express.Router();
const CM = new CartManager("./src/models/carritos.json");

// Ruta GET 
router.get ("/carts", async (req,res) => {
    let limit = parseInt(req.query.limit);

    const carts = await CarritosModel.find().lean()
        .then (carts => {
            if (!limit){
                res.send(carts);
            }
            else {
                res.send(carts.slice(0,limit));
            }
        })
        .catch (error => res.send(error));
});

// Ruta GET para listar el contenido de un carrito 
router.get ("/carts/:cid", (req,res) => {
    let cid = parseInt(req.params.cid);
    CM.getCartById(cid)
        .then (cart => res.send(cart))
        .catch (error => res.send(error));
});

// Ruta POST para nuevos carritos
router.post ("/carts", async (req,res) => {
    const newCart = new CarritosModel();
    newCart.products = req.body.products;
    
    const cart = await newCart.save()
        .then (cart => res.send(`Carrito añadido con id ${newCart._id}.`))
        .catch (error => {
            console.log(error);
            res.send(error.message);
        })
})

// Ruta POST para agregar items a un carrito existente
router.post ("/carts/:cid/product/:pid", async (req,res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;


    // Arrancar por aca 
    CM.addProductToCart(cid,pid)
         .then (cart => res.send(`Producto ${pid} añadido al carrito ${cid}.`))
         .catch (error => {
            console.log(error);
            res.send(error.message);
        })
})





// Exporto:
export default router;
