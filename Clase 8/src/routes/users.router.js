// Common JS
// const express = require("express");

import express from "express";
const router = express.Router();


const users = [];

// Rutas users:

// Ruta para obtener todos los usuarios
router.get ("/api/users", (req,res) => {
    res.send(users);
})

// Ruta para cargar nuevos users
router.post("/api/users", (req,res) =>{
    const nuevoUsuario = req.body;
    users.push(nuevoUsuario);
    res.send({message: "Usuario creado correctamente"});
})

// Exportamos:
export default router;




