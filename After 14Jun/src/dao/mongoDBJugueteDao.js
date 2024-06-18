import JuguetesModel from "../models/juguetes.model.js";

class MongoDBJugueteDAO {
    async obtenerJuguetes(){
        try {
            return await JuguetesModel.find();
        } catch (error) {
            throw new Error("Error al obtener los juguetes")           
        }
    }
    
    async crearJuguete(datosJuguete){
        try {
            const juguete = new JuguetesModel(datosJuguete);
            return await juguete.save();
        } catch (error) {
            throw new Error("Error al crear el juguete");
        }
    }
}

export default MongoDBJugueteDAO;