
// Importo el módulo propio ProductManager.js y el módulo de terceros express  
import { ProductManager } from "../ProductManager.js";
import express from "express";

const router = express.Router();
const PM = new ProductManager("./db.json");


// Primer endpoint con limit optativo por query
router.get ("/products", (req,res) => {
    let limit = parseInt(req.query.limit);

    PM.getProduct()
        .then (products => {
            if (!limit){
                res.send(products);
            }
            else {
                res.send(products.slice(0,limit));
            }
        })
        .catch (error => res.send(error));
})

// Segundo endpoint con pid por params 
router.get ("/products/:pid", (req,res) => {
    let pid = parseInt(req.params.pid);
    PM.getProductById(pid)
        .then (product => res.send(product))
        .catch (error => res.send(error));
});

// Ruta POST
router.post ("/products", (req,res) => {
    const newProduct = req.body;
    PM.addProduct(newProduct)
        .then (product => res.send(`Producto añadido con id ${newProduct.id}.`))
        .catch (error => {
            console.log(error);
            res.send(error.message);
        })
})

// Ruta PUT
router.put ("/products/:pid", (req,res) => {
    const pid = parseInt(req.params.pid);
    const newProductData = req.body;

    PM.updateProduct(pid,newProductData)
         .then (product => res.send(`Producto  modificado con éxito. ${product}`))
         .catch (error => {
            console.log(error);
            res.send(error.message);
         })
})
 


// Exporto:
export default router;

