const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
   title: {type: String, required: true},
   description: {type: String, required: true},
   image: {type: String, required: true},
   price: {type: Number, required: true},
},{timestamps: true});

const product = mongoose.model('product', productSchema);

module.exports = product;
