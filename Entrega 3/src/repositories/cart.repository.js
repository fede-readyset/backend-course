import CarritosModel from "../models/carritos.model.js";

class CartRepository {
    async findAll() {
        return await CarritosModel.find().populate("products.product");
    }

    async findById(id) {
        try {
            
            const carrito = await CarritosModel.findById(id).populate("products.product").lean();

            if (!carrito) {
                throw new Error(`No existe un carrito con id ${id}`);
            }
            return carrito;
        } catch (error) {
            throw new Error("Error listando elementos del carrito");
        }
    }


    async save(cart) {
        return await cart.save;
    }

    async updateById(id, updateData) {
        return await CarritosModel.updateOne({ _id: id }, updateData);
    }


}

export default CartRepository;