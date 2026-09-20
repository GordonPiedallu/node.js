const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["En cours", "Complété", "Livré", "Annuler"], default: "En cours" },
    totalPrice: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);

module.exports = Order;