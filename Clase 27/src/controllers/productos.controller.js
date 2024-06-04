import ProductoModel from "../models/productos.model.js";
import respuesta from "../utils/reutilizables.js";

class ProductoController {
    async getProductos (req,res) {
        try {
            const productos = await ProductoModel.find();
            respuesta(res,200,productos);
        } catch (error) {
            respuesta(res,500,"Error al obtener los productos");
        }
    }

    async postProducto(req,res) {
        try {
            const nuevoProducto = req.body;
            await ProductoModel.create(nuevoProducto);
            respuesta(res,201,"Producto creado correctamente");
        } catch (error) {
            respuesta(res,500,"Error al crear el producto")
        }
    }
}

export default ProductoController;