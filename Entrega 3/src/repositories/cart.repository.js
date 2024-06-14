import CarritosModel from "../models/carritos.model.js";

class CartRepository {
    async findAll() {
        return await CarritosModel.find().populate("products.product");
    }

    async findById(id) {
        return await CarritosModel.findById(id).populate("products.product");
    }

    async save(cart) {
        return await cart.save();
    }

    async updateById(id, updateData) {
        return await CarritosModel.updateOne({ _id: id }, updateData);
    }
}

export default CartRepository;