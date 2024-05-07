import express from "express";
const router = express.Router();

// import UsuarioModel from "../models/usuario.model.js";
// import { isValidPassword } from "../utils/hashbcrypt.js";
import passport from "passport";

// Login:
/* router.post("/login", async (req,res)=>{
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
}) */

router.post("/login", passport.authenticate("login",{
    failureRedirect: "/api/sessions/faillogin"
}), async (req,res) =>{
    if(!req.user) {
        return res.status(400).send("Credenciales inválidas");
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
    res.send("<p>Logueado con éxito. Redireccionando...</p>         <meta http-equiv='refresh' content='1;url=/profile'>");

})



router.get("faillogin", async (req,res) =>{
    res.send("Fallo al autenticar!");
})


//Version para GitHub
router.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req,res) =>{})


router.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/login"
}), async(req,res) =>{
    // La estrategia github retorna el usuario, lo agregamos a la sesión
    req.session.user = req.user;
    req.session.login = true;

    res.redirect("/profile");
})

// Logout:
router.get("/logout", (req,res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
});



export default router;