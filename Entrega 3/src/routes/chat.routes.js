import express from "express";
const router = express.Router();


router.get ("/", (req,res) => {
    if(!req.session.login) return res.redirect("/login");
    const session = {
        loggedIn: req.session.login,
        user: req.session.user
    };
    res.render("chat", {session});
});


// Exporto:
export default router;
