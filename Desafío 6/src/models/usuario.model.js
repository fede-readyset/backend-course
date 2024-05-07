import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        enum: ["admin","user"],
        required: false
    },
    avatar_url:  String
    
    
})


const UsuarioModel = mongoose.model("usuarios", usuariosSchema);

export default UsuarioModel;