const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    size: { type: String },
    price: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const Menu = mongoose.model("menu", menuSchema);

module.exports = Menu;