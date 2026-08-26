const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
   title: {type: String, required: true},
   description: {type: String},
   image: {type: String, required: true},
   skills: {type: [String], required: true},
   author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
   likes: [{type : mongoose.Schema.Types.ObjectId, ref: "User"}],
   comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
},{timestamps: true});

const product = mongoose.model('product', productSchema);

module.exports = product;