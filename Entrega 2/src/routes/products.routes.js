
// Importo el módulo propio ProductManager.js  
//import { ProductManager } from "../controllers/ProductManager.js";
import { ProductManager } from "../controllers/ProductManagerDB.js";



import ProductosModel from "../models/productos.model.js";
import express from "express";

const router = express.Router();
const PM = new ProductManager();

// Endpoint para listar todos los productos
router.get ("/products", async (req,res) => {
    const products = await PM.getProducts(req)
        .then (products => res.send(products))
        .catch (error => res.send({status:"error",payload: `${error}`}));  
})


// Endpoint para listar un porducto según ID
router.get ("/products/:pid", async (req,res) => {
        const product = await PM.getProductById(req.params.pid)
        .then (product => res.send(product))
        .catch (error => res.send(error));
});


// Endpoint para agregar productos nuevos
router.post ("/products", async (req,res) => {

    const product = await PM.addProduct(req,res);

})





// Ruta PUT (modificar)
router.put ("/products/:pid", async (req,res) => {
    const pid = req.params.pid;

    const updatedProduct = req.body;
    
    //PM.updateProduct(pid,newProductData)
    const product = await ProductosModel.findByIdAndUpdate(pid, updatedProduct)
        .then (product => {
            res.send(`Producto modificado con éxito. ${product}`)
            req.io.emit("UpdateNeeded",true); // Le aviso al cliente por socket que hay data nueva, así pide refresh
        })
        .catch (error => {
            console.log(error);
            res.send(error.message);
        })
})
 

// Ruta DELETE (eliminar)
router.delete("/products/:pid", async (req,res) => {
    const pid = req.params.pid;
    
    //PM.deleteProduct(pid) const product =
     await ProductosModel.findByIdAndDelete(pid)
        .then (resultado => {
            res.send(resultado)
            console.log(`Producto eliminado: ${pid}`)
            req.io.emit("UpdateNeeded",true); // Le aviso al cliente por socket que hay data nueva, así pide refresh
        })
        .catch (error => {
            console.log(error);
            res.send(error);
         })
})

// Exporto:
export default router;

