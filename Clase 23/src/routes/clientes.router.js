import express from "express";
const router = express.Router();

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    // En esta situación espero un parametro por url, que es el nombre del cliente
    // Usamos regexp para evitar datos con formato diferentes al esperado

    let cliente = req.params.cliente;
    res.send("Cliente: " + cliente);
})


// Otra forma de hacerlo:

router.get("/email/:email", (req, res) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req.params.email;

    if (patronCorreo.test(email)) {
        res.send("Email valido: " + email)
    } else {
        res.send("Email inválido.");
    }
})



// Que hacemos con las rutas que no coinciden con ningun patrón
router.get("*", async (req, res) => {
    res.status(404).send("Recurso no encontrado")
})



// 3) Validando parámetros:
// Supongamos que al crecer tenemos q generar muchas rutas q reciben el mismo parámetro

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    // Voy a obtener un recurso a partir del parámetro cliente
    res.send("Obteniendo recursos para el cliente " + req.params.cliente);
})

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    // Voy a enviar un recurso a partir del parámetro cliente
    res.send("Enviando recursos para el cliente " + req.params.cliente);
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    // Voy a actualizar un recurso a partir del parámetro cliente
    res.send("Actualizando recursos para el cliente " + req.params.cliente);
})

router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    // Voy a eliminar un recurso a partir del parámetro cliente
    res.send("Eliminando recursos para el cliente " + req.params.cliente);
})


// Nos encontramos que en los 4 métodos se repiten líneas de código
// a) Obtener el parámetro del cliente
// b) Buscar el parámtero en la DB
// c) Una vez validado continuar la operación correspiente

// Esto se puede simplificar a traves de un middleware llamado "router.param"

router.param("cliente", (req, res, next, cliente) => {
    const clientes = ["firulais", "lionel", "pepe"];
    if (clientes.includes(cliente)) {
        req.cliente = cliente;
        next();
    } else {
        res.status(404).send("Recurso no encontrado");
    }
})


export default router;