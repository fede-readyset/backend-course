import mongoose from "mongoose";

mongoose.connect("mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/Jugueteria")
    .then ( () => console.log("Conectados a la DB"))
    .catch ( (error) => console.log("Tenemos un error: ",error))

    