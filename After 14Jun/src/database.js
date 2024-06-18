import mongoose, { mongo } from "mongoose";


mongoose.connect("mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/Jugueteria")
    .then ( () => console.log("Conectado a MongoDB"))
    .catch ( (error) => console.log("Conexión fallida a MongoDB", error))