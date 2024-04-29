
// Importo el módulo propio CartManager.js y el módulo de terceros express  
import { CartManager } from "../controllers/CartManager.js";
import CarritosModel from "../models/carritos.model.js";
import ProductosModel from "../models/productos.model.js";
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
router.get ("/carts/:cid", async (req,res) => {
    let cid = req.params.cid;
    const carrito = await CarritosModel.findById(cid).populate("content")
        .then (carrito => res.send(carrito))
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

    try {
        // Busco el carrito por su ID y devuelvo error si no existe
        const carrito = await CarritosModel.findById(cid);
        if (!carrito) throw new Error ("Carrito inexistente");

        // Busco el producto en la colección de productos y devuelvo error si no existe
        const producto = await ProductosModel.findById(pid);
        if (!producto) throw new Error ("Producto inexistente");

        
        // Busco si el producto ya existe en el carrito
        const productoIndex = carrito.content.findIndex(productobuscado => String(productobuscado.pid) === pid);
        
        
        if (productoIndex !== -1) {
            // Si el producto ya está en el carrito, incrementar la cantidad en 1 unidad
            carrito.content[productoIndex].qty += 1;
        } else {
            // Si el producto no está en el carrito, crear un nuevo item
            const item = { pid: pid, qty: 1 };
            carrito.content.push(item);
        }

        await CarritosModel.findByIdAndUpdate(cid,carrito);

        
        console.log(`Producto ${pid} añadido al carrito ${cid}.`);
        res.send(`Producto ${pid} añadido al carrito ${cid}.`);

    } catch (error) {
        console.log("Error al agregar producto al carrito:", error);
        res.send("Error al agregar producto al carrito: " + error.message);
    }
})


// Ruta DELETE para eliminar productos de un carrito
// Como la consigna no especifica lo contrario, borro todas las unidades del producto del carrito
router.delete("/carts/:cid/product/:pid", async (req,res) =>{
    let cid = req.params.cid;
    let pid = req.params.pid;

    try{
        // Busco el carrito por su ID y devuelvo error si no existe
        const carrito = await CarritosModel.findById(cid);
        if (!carrito) throw new Error ("Carrito inexistente");

        // Busco si el producto ya existe en el carrito
        const productoIndex = carrito.content.findIndex(productobuscado => String(productobuscado.pid) === pid);
        console.log(productoIndex);


        if (productoIndex !== -1) {
            // Si el producto ya está en el carrito lo elimino
            carrito.content.splice(productoIndex,1);
        } else {
            // Si el producto no está en el carrito, devuelvo error
            throw("El producto no existe en el carrito.");
        }

        await CarritosModel.findByIdAndUpdate(cid,carrito);
        console.log(`Producto ${pid} eliminado del carrito ${cid}.`);
        res.send(`Producto ${pid} eliminado del carrito ${cid}.`);

    } catch(error){
        console.log("Error al eliminar producto del carrito:", error);
        res.send("Error al eliminar producto del carrito: " + error.message);
    }
})




// Exporto:
export default router;
