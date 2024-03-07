
// Importamos el módulo ProductManager.js: 
import { ProductManager } from "./ProductManager.js";
import express from "express";


const PUERTO = 8080;
const app = express();
const PM = new ProductManager("./db.json");


app.get ("/products", (req,res) => {
    let limit = parseInt(req.query.limit);
    console.log(limit);
    if (!limit){
        PM.getProduct( (error,products) => {
            res.send("<pre>"+JSON.stringify(products,null,2)+"</pre>");
        })
    }
    else{
        PM.getProduct( (error,products) => {
            res.send("<pre>"+JSON.stringify(products.slice(0,limit),null,2)+"</pre>");
        })
    }
    
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

