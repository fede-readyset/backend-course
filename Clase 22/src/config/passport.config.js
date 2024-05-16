// importamos los módulos
import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse", //mismo secret que configuramos en la app
    }, async (jwt_payLoad,done) =>{
        try {
            return done(null, jwt_payLoad)
        } catch (error) {
            return done(error);
        }
    }))
}

// Extractor de cookies
const cookieExtractor = (req) =>{
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"];
    }
    return token;
}

export default initializePassport;

