import mongoose from "mongoose";
import { options } from "./config.js";

export const connectDB = async() => {
    mongoose.connect(options.mongo.url) 
        .then ( () => console.log("Conectados a la DB"))
        .catch ( (error) => console.log("Tenemos un error: ",error))
}



    