const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, minlength: 5, maxlength: 30, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minlength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 1},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    bio: {type : String},
    avatar: {type: String},
},{timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;