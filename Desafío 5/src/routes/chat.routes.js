import express from "express";
const router = express.Router();


router.get ("/", (req,res) => {
    if(!req.session.login) return res.redirect("/login");
    res.render("chat", {user: req.session.user.first_name});
});


// Exporto:
export default router;
