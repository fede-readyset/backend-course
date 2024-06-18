import fs from "fs";

class FileSystemJugueteDAO {
    async obtenerJuguetes() {
        try {
            const juguetes = await this.leerArchivo();
            return juguetes;
        } catch (error) {
            throw new Error("Error al leer los juguetes del archivo")
        }
    }

    async crearJuguete(datosJuguete) {
        try {
            const juguetes = await this.leerArchivo();
            juguetes.push(datosJuguete);
            await this.escribirArchivo(juguetes);
            return datosJuguete;
        } catch (error) {
            throw new Error("Error al crear un juguete en archivo")
        }
    }

    // Metodos auxiliares para manejar archivo
    async leerArchivo() {
        try {
            const data = await fs.promises.readFile("./src/data/juguetes.json");
            return JSON.parse(data);
        } catch (error) {
            throw new Error("Error al leer el archivo")
        }
    }

    async escribirArchivo(datosJuguete) {
        try {
            await fs.promises.writeFile("./src/data/juguetes.json", JSON.stringify(datosJuguete, null, 2));
        } catch (error) {
            throw new Error("Error al guardar el archivo")
        }
    }
}

export default FileSystemJugueteDAO;