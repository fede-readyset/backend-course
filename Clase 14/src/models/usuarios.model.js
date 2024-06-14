import mongoose from "mongoose";


// Definimos el esquema: "schema". (Nos permite definir la forma de los documentos)

const usuariosSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number
})

// Definimos el modelo. Me va a permitir generar instancias (como una clase)

const UsuariosModel = mongoose.model("usuarios",usuariosSchema);

export default UsuariosModel;

