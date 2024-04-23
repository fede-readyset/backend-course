import mongoose from "mongoose";
mongoose.connect("mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/Pizzeria?retryWrites=true&w=majority")
    .then(()=> console.log("Conexión a la DB exitosa."))
    .catch((error)=> console.log("Conexión a la DB fallida.", error))

