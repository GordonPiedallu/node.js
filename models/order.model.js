const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
   product: {type: mongoose.Schema.Types.ObjectId, ref: "product", required: true},
   quantity: {type: Number, required: true},
   totalPrice: {type: Number, required: true},
   status: {type: String, enum: ["En cours", "Complété", "Livré", "Annuler"], default: "En cours"},
   user: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
},{timestamps: true});

const order = mongoose.model('order', orderSchema);


module.exports = order;