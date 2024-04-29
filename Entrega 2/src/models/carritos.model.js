import mongoose, { mongo } from "mongoose";

const contenidoSchema = new mongoose.Schema({
    // products: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "products"
    // },
    pid: String,
    qty: Number
});

const carritosSchema = new mongoose.Schema({
    //cid: String,
    content: [contenidoSchema]
});

// Middleware PRE de MongoDB
// contenidoSchema.pre("findOne",function(next) {
//     this.populate("products");
//     next();
// })


const CarritosModel = mongoose.model("carts", carritosSchema);

export default CarritosModel;
