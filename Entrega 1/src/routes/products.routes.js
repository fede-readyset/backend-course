
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
                //res.send(formatDataAsTable(products));
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
        .then (product => res.send(formatDataAsTable([product])))
        .catch (error => res.send(error));
});



// Exporto:
export default router;

