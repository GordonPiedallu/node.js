const mongoose = require("mongoose");

const menuLineSchema = new mongoose.Schema({
    menu: { type: mongoose.Schema.Types.ObjectId, ref: "menu", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, required: true, min: 1 }
}, { timestamps: true });

const MenuLine = mongoose.model("MenuLine", menuLineSchema);

module.exports = MenuLine;