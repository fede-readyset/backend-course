import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    }

})

export const contactsModel = mongoose.model("contacts", schema);
