import express from "express";
const Router = express.Router();

import CustomError from "../services/errors/custom-error.js";
import generarInfoError from "../services/errors/info.js";
import { EErrors } from "../services/errors/enum.js";

// Guardamos los users en un array en memoria.

const arrayUsuarios = [];

// Rutas
Router.post("/", async (req, res, next) => {
    const {nombre, apellido, email} = req.body; 
    try {
        if( !nombre || !apellido || !email ) {
            throw CustomError.crearError({
                nombre: "Usuario nuevo", 
                causa: generarInfoError({nombre, apellido, email}),
                mensaje: "Error al intentar crear un usuario", 
                codigo: EErrors.TIPO_INVALIDO
            })
        }
        //Creo el usuario:
        const usuario = {
            nombre, 
            apellido, 
            email
        }
        //Lo voy a pushear en mi array: 
        arrayUsuarios.push(usuario);
        res.send({status: "success", payload: usuario}); 
    } catch (error) {
        next(error);
    }
})



export default Router;
