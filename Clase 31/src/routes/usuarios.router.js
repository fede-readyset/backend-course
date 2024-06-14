import express from "express";
const router = express.Router();

import { generarUsuarios } from "../utils/utils.js";


router.get("/", (req,res) => {
    // Generamos un array de users:
    const usuarios = [];
    for (let i =0; i<5;i++) {
        usuarios.push(generarUsuarios());
    }

    res.send(usuarios);
    
})

export default  router;
