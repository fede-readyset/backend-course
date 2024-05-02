
// Importo el módulo propio ProductManager.js y el módulo de terceros express  
//import { ProductManager } from "../controllers/ProductManager.js";
import { ProductManager } from "../controllers/ProductManagerDB.js";


import ProductosModel from "../models/productos.model.js";
import express from "express";

const router = express.Router();
const PM = new ProductManager();



// Endpoint para listar todos los productos
router.get ("/products", async (req,res) => {
    
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const filter = {}
    if (req.query.cat) filter.category=req.query.cat;
    if (req.query.stock) filter.stock=req.query.stock;

    var sort = "_id"; // Valor por defaul de sort
    if (req.query.sort === "asc") sort = "price";
    if (req.query.sort === "desc") sort = "-price";

    const result = await PM.getProducts(filter,limit,page,sort)
    res.send(result);
})


// Endpoint para listar un producto según ID
router.get ("/products/:pid", async (req,res) => {

    const result = await PM.getProductById(req.params.pid);
    res.send(result);
});


// Endpoint para agregar productos nuevos
router.post ("/products", async (req,res) => {

    const result = await PM.addProduct(req.body);
    res.send(result);

    // Aviso al cliente realtime que hay updates
    if (result.success) req.io.emit("UpdateNeeded",true);

})

// Ruta PUT (modificar)
router.put ("/products/:pid", async (req,res) => {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    
    const result = await PM.updateProduct(pid,updatedProduct)
    res.send(result);

    // Aviso al cliente realtime que hay updates
    if (result.success) req.io.emit("UpdateNeeded",true);
})
 

// Ruta DELETE (eliminar)
router.delete("/products/:pid", async (req,res) => {
    const pid = req.params.pid;
    
    const result = await PM.deleteProduct(pid)
    res.send(result);

    // Aviso al cliente realtime que hay updates
    if (result.success) req.io.emit("UpdateNeeded",true);     
})

// Exporto:
export default router;

