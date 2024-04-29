
// Importo el módulo propio ProductManager.js y el módulo de terceros express  
//import { ProductManager } from "../controllers/ProductManager.js";


import ProductosModel from "../models/productos.model.js";
import express from "express";

const router = express.Router();
//const PM = new ProductManager("./src/models/productos.json");


// Primer endpoint con limit optativo por query
router.get ("/products", async (req,res) => {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    const filter = {}

    if (req.query.cat) {
        filter.category=req.query.cat;
    }
    if (req.query.stock) {
        filter.stock=req.query.stock; 
    }
    
    console.log(filter);
    
    let sort = "_id"; // Valor por defaul de sort
    if (req.query.sort === "asc") sort = "price";
    if (req.query.sort === "desc") sort = "-price";


    const products = await ProductosModel.paginate(filter,{limit,page,sort:sort})
        .then (products => {
            if(products.hasPrevPage) {
                products.prevLink=`/api/products/?limit=${limit}&page=${products.prevPage}`; 
            } else {
                products.prevLink=null;
            }

            if(products.hasNextPage) {
                products.nextLink=`/api/products/?limit=${limit}&page=${products.nextPage}`; 
            } else {
                products.nextLink=null;; 
            }

            res.send(products);
        })
        .catch (error => res.send({status:"error",payload: `${error}`})); 
})

// Segundo endpoint con pid por params 
router.get ("/products/:pid", async (req,res) => {
    
    let pid = req.params.pid;

    const product = await ProductosModel.findById(pid)
        .then (product => res.send(product))
        .catch (error => res.send(error));
});

// Ruta POST (agregar)
router.post ("/products", async (req,res) => {
    const newProduct = new ProductosModel();
    newProduct.title = req.body.title;
    newProduct.category = req.body.category;
    newProduct.description = req.body.description;
    newProduct.price = req.body.price;
    newProduct.thumbnail = req.body.thumbnail;
    newProduct.code = req.body.code;
    newProduct.stock = req.body.stock;

    //PM.addProduct(newProduct)
    const product = await newProduct.save()
        .then (product => {
            res.send(`Producto añadido con id ${newProduct._id}.`)
            req.io.emit("UpdateNeeded",true); // Le aviso al cliente por socket que hay data nueva, así pide refresh
        })
        .catch (error => {
            console.log(error);
            res.send(error.message);
        })
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

