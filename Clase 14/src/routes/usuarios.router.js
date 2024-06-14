import express from "express";
const router = express.Router();

// 1) Importamos el modelo:
import UsuariosModel from "../models/usuarios.model.js";

// 2) Obtenemos el listado de los usuarios:

router.get("/", async (req,res) => {
    try {
        const usuarios = await UsuariosModel.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json("Error en el servidor");
    }
})


// Subimos un nuevo usuario por postman

router.post("/", async (req,res) => {
    //Tomamos los datos del body
    const usuarioNuevo = req.body;
    
    try {
        const usuario = new UsuariosModel(usuarioNuevo);
        await usuario.save();    
        res.send({message: "Usuario creado exitosamente", usuario: usuario})
    } catch (error) {
        res.status(500).json("Error en el servidor");
    }
})

// Actualizamos un user por ID

router.put("/:id", async (req,res) => {
    const idBuscado = req.params.id;
    const datosNuevos = req.body;
    try {
        const usuario = await UsuariosModel.findByIdAndUpdate(idBuscado, datosNuevos);
        res.status(200).send({message: "Usuario actualizado", usuario: usuario});
    } catch (error) {
        res.status(500).json("Error en el servidor");       
    }
} )

// Elimino un user por su id
router.delete("/:id", async (req,res) => {
    const idBuscado = req.params.id;
    try {
        const usuario = await UsuariosModel.findByIdAndDelete(idBuscado);
        if (!usuario){
            return res.status(404).send("Usuario no encontrado");
        } 
        res.status(200).send({message: "Usuario eliminado correctamente", usuario: usuario});
    } catch (error) {
        res.status(500).json("Error en el servidor");       
    }
})


export default router;