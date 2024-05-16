// 4) Creando un Custom Router:


import express from "express";
const router = express.Router();

class Router {
    constructor() {
        this.router = router;
        this.init();
    }

    getRouter() {
        return this.router;
        // devuelve el objeto router
    }
    init() { };


    get(path, ...callbacks) {
        // Definir una ruta get en el router.
        // El primer argumento es la ruta.
        // Los siguientes son los callbacks que se ejecutarán cuando haga get en esta ruta
        this.router.get(path, this.generateCustomResponde, this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this,params);
            } catch (error) {
                params[1].status(500).send(error);
            }
        })
    }

    // Custom responses:
    generateCustomResponse(req,res,next) {
        res.sendSuccess = payload => res.send({status: "success", payload});
        res.sendServerError = error => res.status(500).send({status:"error",error});
        res.sendUserError = error => res.status(400).send({status: "error", error});
        next();
    }
}