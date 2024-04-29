
// Importo el módulo propio CartManager.js y el módulo de terceros express  
//import { CartManager } from "../controllers/CartManager.js";
import CarritosModel from "../models/carritos.model.js";
import ProductosModel from "../models/productos.model.js";
import express from "express";


const router = express.Router();
//const CM = new CartManager("./src/models/carritos.json");



// Ruta GET 
router.get ("/carts", async (req,res) => {
    let limit = parseInt(req.query.limit);

    try {
        const carts = await CarritosModel.find().populate("products.product")
        if (!limit){
            res.send(carts);
        }
        else {
            res.send(carts.slice(0,limit));
        }

    } catch (error) {
        res.send(error)
    }
});



// Ruta GET para listar el contenido de un carrito 
router.get ("/carts/:cid", async (req,res) => {
    let cid = req.params.cid;

    try {
        const carrito = await CarritosModel.findById(cid).populate("products.product");
        if(carrito) {
            res.send(carrito);
        } else {
            res.status(404).send("Carrito no encontrado");
        }

    } catch (error) {
        res.status(500).send(error);
    }
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
    let {cid,pid} = req.params;
    
    try {
        // Busco el carrito por su ID y devuelvo error si no existe
        const carrito = await CarritosModel.findById(cid);
        if (!carrito) throw new Error ("Carrito inexistente");

        // Busco el producto en la colección de productos y devuelvo error si no existe
        const producto = await ProductosModel.findById(pid);
        if (!producto) throw new Error ("Producto inexistente");

        // Busco si el producto ya existe en el carrito
        const productoIndex = carrito.products.findIndex(productobuscado => String(productobuscado.product) === pid);
        
        let qty=1;
        if (productoIndex !== -1) {
            // Si el producto ya está en el carrito, incrementar la cantidad en 1 unidad
            qty = carrito.products[productoIndex].qty += 1;
        } else {
            // Si el producto no está en el carrito, crear un nuevo item
            const item = { product: producto, qty: qty };
            carrito.products.push(item);
        }

        await CarritosModel.findByIdAndUpdate(cid,carrito);
        
        let response = `Producto ${pid} añadido al carrito ${cid}. Nueva cantidad: ${qty}`;
        console.log(response);
        res.send(response);

    } catch (error) {
        let response = "Error al agregar producto al carrito:" + error;
        console.log(response);
        res.send(response);
    }
})


// Ruta DELETE para eliminar un producto de un carrito
// Como la consigna no especifica lo contrario, borro todas las unidades del producto especificado
router.delete ("/carts/:cid/product/:pid", async (req,res) =>{
    let {cid,pid} = req.params;

    try{
        // Busco el carrito por su ID y devuelvo error si no existe
        const carrito = await CarritosModel.findById(cid);
        if (!carrito) throw new Error ("Carrito inexistente");

        // Busco si el producto existe en el carrito
        const productoIndex = carrito.products.findIndex(productobuscado => String(productobuscado.product) === pid);

        if (productoIndex !== -1) {
            // Si el producto ya está en el carrito lo elimino
            carrito.products.splice(productoIndex,1);
        } else {
            // Si el producto no está en el carrito, devuelvo error
            throw("El producto no existe en el carrito.");
        }

        await CarritosModel.findByIdAndUpdate(cid,carrito);

        let response = `Producto ${pid} eliminado del carrito ${cid}.`;
        console.log(response);
        res.send(response);

    } catch(error){
        let response = "Error al eliminar producto del carrito:" + error;
        console.log(response);
        res.send(response);
    }
})

router.delete("/carts/:cid", async (req,res) => {
    let cid = req.params.cid;
    try {
        // Busco el carrito por su ID y devuelvo error si no existe
        const carrito = await CarritosModel.updateOne({_id: cid},{$set: {products: []}});
        if (!carrito) throw new Error ("Carrito inexistente");
       
        let response = `Carrito ${cid} vaciado con éxito.`;
        console.log(response);
        res.send(response);
    } catch (error) {
        let response = "Error al vaciar el carrito:" + error;
        console.log(response);
        res.send(response);
    }
})

router.put ("/carts/:cid/product/:pid", async (req,res) => {
    let {cid,pid} = req.params;
    let newQty = req.body.qty;

    try {
        // Busco el carrito por su ID y devuelvo error si no existe
        const carrito = await CarritosModel.findById(cid);
        if (!carrito) throw new Error ("Carrito inexistente");

        // Busco si el producto existe en el carrito
        const productoIndex = carrito.products.findIndex(productobuscado => String(productobuscado.product) === pid);

        if (productoIndex !== -1) {
            // Si el producto ya está en el carrito lo actualizo
            carrito.products[productoIndex].qty=newQty;
        } else {
            // Si el producto no está en el carrito, devuelvo error
            throw new Error("El producto no existe en el carrito.");
        }
        await CarritosModel.findByIdAndUpdate(cid,carrito);
        const response = `Producto ${pid} actualizado en el carrito ${cid}. Nueva cantidad: ${newQty}.`
        console.log(response);
        res.send(response);

    } catch (error) {
        const response = "No se pudo actualizar cantidad de producto en el carrito: " + error;
        console.log(response);
        res.send(response);
    }
})




// Exporto:
export default router;
