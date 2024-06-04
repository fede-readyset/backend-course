// Instalamos dotenv, dependencia que permite manejar variables de entorno (npm i dotenv)

//import { config } from "dotenv";
import dotenv from "dotenv";
import program from "../utils/commander.js";

const { mode } = program.opts();

dotenv.config({
    path: mode === "produccion" ? "./.env.produccion" : "./.env.desarrollo"
})


const configObject = { 
    puerto: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL
}

export default configObject;