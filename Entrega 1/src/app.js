
import express from "express";

// Defino algunas variables e instancio clases
const PUERTO = 8080;
const app = express();

// Vinculo las rutas
import cartsRouter from "./routes/carts.routes.js";
import productsRouter from "./routes/products.routes.js";

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", cartsRouter);
app.use("/api", productsRouter)

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