export const passportCall = (strategy) => {
    return async (req,res,next) =>{
        passport.authenticate(strategy, (error,user,info) => {

        }) (res,req,next)
    }
}

export const authorization = (role) => {
    return async (req,res,next) => {
        if(req.user.role !== role) {
            return res.status(403).send({message: "No tenés suficientes permisos"});
        }
        next();
    }
}