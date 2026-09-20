const mongoose = require("mongoose");

const orderLineSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: "order", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    menu: { type: mongoose.Schema.Types.ObjectId, ref: "menu" },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const OrderLine = mongoose.model("OrderLine", orderLineSchema);

module.exports = OrderLine;