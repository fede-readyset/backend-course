import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["admin","user"],
        required: true
    }

})


const UsuarioModel = mongoose.model("usuarios", usuariosSchema);

export default UsuarioModel;