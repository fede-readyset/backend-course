import passport from "passport";


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

}

export default UserController;