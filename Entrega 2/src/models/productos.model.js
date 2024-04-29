import mongoose, { mongo } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

productosSchema.plugin(mongoosePaginate);

const ProductosModel = mongoose.model("products", productosSchema);

export default ProductosModel;
