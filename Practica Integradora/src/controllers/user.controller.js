import passport from "passport";
import { isValidPassword } from "../utils/hashbcrypt.js";
import { createHash } from "../utils/hashbcrypt.js";

// Tercer practica integradora
import EmailManager from "../services/email.js";
import UsuarioModel from "../models/usuario.model.js";
import generateResetToken from "../utils/tokenreset.js";
const emailManager = new EmailManager();


class UserController {
    async profile(req, res) {
        if (!req.session.login) {
            return res.redirect("login");
        } else {
            const session = {
                loggedIn: req.session.login,
                user: req.session.user,
            };
            return res.render("profile", { session });
        }
    }

    async register(req, res) {
        passport.authenticate("register", { failureRedirect: "/failedregister" }, async (err, user, info) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (!user) {
                return res.status(400).send("Credenciales inválidas");
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                req.session.user = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    age: user.age,
                    role: user.role,
                    cart: user.cart,
                    avatar_url: user.avatar_url
                };
                req.session.login = true;
                res.send("<p>Usuario creado con éxito. Redireccionando...</p>         <meta http-equiv='refresh' content='2;url=/profile'>");
            })
        });
    }

    failedRegister(req, res) {
        res.send("Registro fallido");
        req.logger.error("Registro fallido")
    }


    // Tercer integradora:

    async requestPasswordReset(req, res) {
        const { email } = req.body;
        try {
            // Busco al usuario por email
            const user = await UsuarioModel.findOne({ email });
            if (!user) {
                // Si no hay usuario tiro error y termina
                return res.status(404).send("Usuario no encontrado");
            }

            // Si hay usuario genero un token
            const token = generateResetToken();

            // Le agrego el token al usuario
            user.resetToken = {
                token: token,
                expire: new Date(Date.now() + 3600000) // 1 hora
            }
            await user.save();

            // Mando el email
            await emailManager.sendResetEmail(email, user.first_name, token);

            // Redirect a confirmación
            res.redirect("/confirmacion-envio");

        } catch (error) {
            res.status(500).send("Error interno del servidor")
        }
    }


    async resetPassword(req, res) {
        const { email, password, token } = req.body;

        try {
            // Busco al usuario por email
            const user = await UsuarioModel.findOne({ email });
            if (!user) {
                // Si no hay usuario tiro error y termina
                return res.render("changepass", { error: "Usuario no encontrado" });
            }

            // Verifico si hay token y si es correcto
            const resetToken = user.resetToken;
            if (!resetToken || resetToken.token != token) {
                return res.render("resetpass", { error: "Token incorrecto" });
            }

            // Verifico que el token no haya expirado
            const now = new Date();
            if (now > resetToken.expire) {
                return res.render("resetpass", { error: "El token ya no es válido" })
            }

            // Verifico que la contraseña nueva no sea igual a la anterior
            if (isValidPassword(password, user)) {
                return res.render("changepass", { error: "La nueva contraseña no puede ser igual a la anterior" });
            }

            // Actualizo contraseña
            user.password = createHash(password);

            // Marco el token como usado
            user.resetToken = undefined;

            // Guardo los cambios
            await user.save();

            // Redirijo al login
            return res.redirect("/login");

        } catch (error) {
            res.status(500).render("resetpass", { error: `Error interno del servidor: ${error}` });
        }
    }


    // Cambiar rol del usuario
    async changePremiumRole(req, res) {
        const { uid } = req.params;
        try {
            // Busco el usuario
            const user = await UsuarioModel.findById(uid);
            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }

            // Si lo encuentro le cambio el rol:
            const nuevoRol = user.role === "user" ? "premium" : "user";

            const actualizado = await UsuarioModel.findByIdAndUpdate(uid, {role: nuevoRol});
            res.json(actualizado);

        } catch (error) {
            res.status(500).send("Error en el servidor");
        }
    }
}

export default UserController;