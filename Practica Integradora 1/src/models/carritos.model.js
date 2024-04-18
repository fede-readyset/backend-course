import mongoose, { mongo } from "mongoose";

const productosSchema = new mongoose.Schema({
    pid: Number,
    qty: Number
});

const carritosSchema = new mongoose.Schema({
    cid: Number,
    products: [productosSchema]
});

const CarritosModel = mongoose.model("carts", carritosSchema);

export default CarritosModel;
