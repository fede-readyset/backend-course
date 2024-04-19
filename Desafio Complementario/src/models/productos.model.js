import mongoose, { mongo } from "mongoose";

const productosSchema = new mongoose.Schema({
    title: String,
    description: String, 
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
    category: String,
    status: Boolean
})

const ProductosModel = mongoose.model("products", productosSchema);

export default ProductosModel;
