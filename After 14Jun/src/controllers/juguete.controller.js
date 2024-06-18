/* import MongoDBJugueteDAO from "../dao/mongoDBJugueteDao.js";
import MemoryJugueteDAO from "../dao/memoryJugueteDao.js";
import FileSystemJugueteDAO from "../dao/fileSystemJugueteDao.js";

const jugueteService = new FileSystemJugueteDAO();
 */

import DAO  from "../dao/factory.js";
const jugueteService = DAO;


class JugueteController {
    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await jugueteService.obtenerJuguetes();
            res.json(juguetes);
        } catch (error) {
            res.status(500).send("Error del servidor.");
        }
    }

    async crearJuguete(req, res) {
        const datosJuguete = req.body;
        try {
            const juguete = await jugueteService.crearJuguete(datosJuguete);
            res.json(juguete);
        } catch (error) {
            res.status(500).send("Error del servidor.");
        }
    }
}

export default JugueteController;