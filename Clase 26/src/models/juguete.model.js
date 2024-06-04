import mongoose from "mongoose";
const schema = mongoose.Schema ({
    nombre: String,
    categoria: String,
    precio: Number
})

const JugueteModel = mongoose.model("juguetes", schema);

export default JugueteModel;