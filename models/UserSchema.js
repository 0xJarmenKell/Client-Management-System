const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: Number,
    age: Number,
    country: String,
    gender: String,
  
}, {  timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;