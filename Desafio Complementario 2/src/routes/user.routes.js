import express from "express";
import passport from "passport";

import UserController from "../controllers/user.controller.js";
const userController = new UserController;

const router = express.Router();


router.get("/profile", userController.profile);
router.get("/failedregister", userController.failedRegister);
router.post("/requestPasswordReset", userController.requestPasswordReset);
router.post("/reset-password",userController.resetPassword);
router.put("/premium/:uid",userController.changePremiumRole);

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
        cart: req.user.cart,
        avatar_url: req.user.avatar_url
    }
    req.session.login = true;
    res.send("<p>Usuario creado con éxito. Redireccionando...</p><meta http-equiv='refresh' content='2;url=/api/users/profile'>");
})

 
export default router;



