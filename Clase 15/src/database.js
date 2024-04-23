import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb+srv://torresfederico:coderhouse@cluster0.anozfok.mongodb.net/Coderest?retryWrites=true&w=majority")
    .then ( () => console.log("Conectado a MongoDB"))
    .catch ( (error) => console.log("Tenemos un error.", error))

