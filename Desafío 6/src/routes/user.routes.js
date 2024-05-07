import express from "express";
import passport from "passport";

const router = express.Router();

// import UsuarioModel from "../models/usuario.model.js";
// import { createHash } from "../utils/hashbcrypt.js";

// Ruta post para generar un user y almacenarlo en la DB

/* router.post("/", async (req,res) => {
    const  {first_name, last_name, email, password, age} = req.body;

    try {
        // Verifico si el correo ya existe
        const userExists = await UsuarioModel.findOne({email:email});

        if (userExists) {
            return res.status(400).send("Correo ya registrado")
        }

        //Creamos el usuario
        const newUser = await UsuarioModel.create({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            role: 'user'
        });

        // Una vez creado el usuario creo la sesión
        req.session.user = {
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            role: newUser.role
        }
        req.session.login = true;
        
        // Mandamos confirmación
        res.send("<p>Usuario creado con éxito. Redireccionando...</p>         <meta http-equiv='refresh' content='2;url=/'>");
        

    } catch (error) {
        res.status(500).send("Error al crear el usuario.");
    }
}) */


// VERSION PARA passport-local
router.post("/", passport.authenticate("register", {
    failureRedirect: "/failedregister"
}), async (req,res) => {
    if(!req.user) {
        return res.status(400).send("Credenciales inválidas")
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        avatar_url: req.user.avatar_url
    }
    req.session.login = true;
    res.send("<p>Usuario creado con éxito. Redireccionando...</p>         <meta http-equiv='refresh' content='2;url=/profile'>");
})

router.get("/failedregister", (req,res) =>{
    req.send("Registro fallido");
})




export default router;



