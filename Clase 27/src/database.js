import mongoose from "mongoose";
import configObject from "./config/config.js";

/* 
mongoose.connect(configObject.mongo_url)
    .then(()=> console.log("Conectados a la DB"))
    .catch((error) => console.log("Error al conectar la DB"));
 */
    


// PATRON DE DISEÑO SINGLETON:

// Lo usamos para tener una instancia global de toda la aplicación. El caso más usado es la conexión con la base de datos.
// Este patrón verifica si ya existe una instancia, caso contrario la crea.

class BaseDatos {
    static #instancia;
    //se declara una variable estática y privada llamada instancia

    constructor() {
        mongoose.connect(configObject.mongo_url);
    }

    static getInstancia() {
        if(this.#instancia){
            console.log("Conexion previa");
            return this.#instancia;
        } 
        this.#instancia = new BaseDatos();
        console.log("Conexión exitosa");
        return this.#instancia;
    }
}

//export default BaseDatos;

// o puedo exportar para que se conecte automáticamente
export default BaseDatos.getInstancia();
