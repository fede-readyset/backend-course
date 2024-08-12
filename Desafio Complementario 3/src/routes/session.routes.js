import express from "express";
import passport from "passport";
import { isValidPassword } from "../utils/hashbcrypt.js";

const router = express.Router();



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
        cart: req.user.cart,
        avatar_url: req.user.avatar_url
    }
    console.log("Session: " + req.session.user);
    req.session.login = true;
    res.status(200).json({
        success:true,
        message:"Login exitoso"
    });
    //send("<p>Logueado con éxito. Redireccionando...</p>         <meta http-equiv='refresh' content='1;url=/api/users/profile'>");

})



router.get("/faillogin", async (req,res) =>{
    res.send("Fallo al autenticar!");
})


//Version para GitHub
router.get("/github", passport.authenticate("github", {scope: ["user:email"]}) , async (req,res) =>{})


router.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/login"
}), async(req,res) =>{
    // La estrategia github retorna el usuario, lo agregamos a la sesión
    req.session.user = req.user;
    req.session.login = true;

    res.redirect("/api/users/profile");
})

// Logout:
router.get("/logout", (req,res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
});


// Current:
router.get("/current", (req,res) => {
    res.send(req.session.user);    
})


export default router;