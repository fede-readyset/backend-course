import passport from "passport";


const auth = (req,res,next) => {
    console.log("Pasé por el middleware pidiendo "+req.url);
    next();
}

export default auth;