const mongoose = require ('mongoose');

const commentSchema = new mongoose.Schema({
   content: {type: String, required: true},
   author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
   likes: {type: [mongoose.Schema.Types.ObjectId], ref: "User", default: []},
   project: {type:mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
},{timestamps: true});

const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;