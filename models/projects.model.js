const mongoose = require ('mongoose');

const projectSchema = new mongoose.Schema({
   title: {type: String, required: true},
   description: {type: String},
   image: {type: String, required: true},
   skills: {type: [String], required: true},
   author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
   likes: [{type : mongoose.Schema.Types.ObjectId, ref: "User"}],
   comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
},{timestamps: true});

const project = mongoose.model('Project', projectSchema);

module.exports = project;