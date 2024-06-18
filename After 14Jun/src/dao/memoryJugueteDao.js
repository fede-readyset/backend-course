class MemoryJugueteDAO {
    constructor () {
        this.juguetes = [];
    }

    async obtenerJuguetes(){
        try {
            return this.juguetes;
        } catch (error) {
            throw new Error("Error al obtener los juguetes de memoria.")
        }
    }

    async crearJuguete(datosJuguete){
        try {
            this.juguetes.push(datosJuguete);
            return datosJuguete;
        } catch (error) {
            throw new Error("Error al crear el juguete en memoria.")
        }
    }
}

export default MemoryJugueteDAO;