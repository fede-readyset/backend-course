import express from "express";
const router = express.Router();

let arrayProductos = [
    {nombre: "Fideos", descripcion: "Los más ricos", precio: 100},
    {nombre: "Arroz", descripcion: "El que no se pasa", precio: 200},
    {nombre: "Helado", descripcion: "Más frío que el corazón de tu ex", precio: 1000},
    {nombre: "Coca", descripcion: "Cada día más cara", precio: 5000}
];

// Ruta

router.get("/", (req,res) => {
    const usuario = {
        nombre: "Tinki",
        apellido: "Winki",
        mayorEdad: true
    }

    res.render("index", {usuario,arrayProductos,titulo:"Plantillita"});
})

router.get("/contacto", (req,res) => {
    res.render("contacto");
})

export default router;