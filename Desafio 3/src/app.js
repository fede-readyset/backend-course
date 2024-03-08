// Importo el módulo propio ProductManager.js y el módulo de terceros express  
import { ProductManager } from "./ProductManager.js";
import express from "express";

// Defino algunas variables e instancio clases
const PUERTO = 8080;
const app = express();
const PM = new ProductManager("./db.json");

// Primer endpoint con limit optativo por query
app.get ("/products", (req,res) => {
    let limit = parseInt(req.query.limit);

    PM.getProduct()
        .then (products => {
            if (!limit){
                res.send(formatDataAsTable(products));
            }
            else {
                res.send(formatDataAsTable(products, limit));
            }
        })
        .catch (error => res.send(error));
})

// Segundo endpoint con pid por params 
app.get ("/products/:pid", (req,res) => {
    let pid = parseInt(req.params.pid);
    PM.getProductById(pid)
        .then (product => res.send(formatDataAsTable([product])))
        .catch (error => res.send(error));
});

// Listener
app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
});


// Función opcional para dar formato de tabla HTML al objeto
function formatDataAsTable(data, limit) {
    let html = '<table style="border-collapse: collapse; width: 100%;">';
    html += '<tr style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">';
    for (const key in data[0]) {
        html += `<th>${key}</th>`;
    }
    html += '</tr>';

    data.slice(0, limit).forEach(item => {
        html += '<tr>';
        for (const key in item) {
            html += `<td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item[key]}</td>`;
        }
        html += '</tr>';
    });

    html += '</table>';
    return html;
}