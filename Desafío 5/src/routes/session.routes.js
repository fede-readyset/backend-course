import express from "express";
const router = express.Router();

import UsuarioModel from "../models/usuario.model.js";
import { isValidPassword } from "../utils/hashbcrypt.js";

// Login:
router.post("/login", async (req,res)=>{
    const {email, password} = req.body;
    try {
        const usuario = await UsuarioModel.findOne({email:email});

        if( usuario ){ 
            //Si encuentro el usuario valido el password con bcrypt
            if(isValidPassword (password,usuario)) {

                req.session.login = true;
                req.session.user = {
                    email: usuario.email,
                    first_name: usuario.first_name,
                    last_name: usuario.last_name,
                    role: usuario.role
                }
                res.redirect("/");
            } else {
                res.status(401).send("Contraseña no válida.");
            } 
        } else {
            res.status(404).send("Usuario no encontrado.");
        }
        
    } catch (error) {
        res.status(500).send("Error del servidor.")
        
    }
})


// Logout:
router.get("/logout", (req,res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
});

export default router;