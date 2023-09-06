const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Corrected typo from "require" to "required"
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
},
{timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User; // Corrected typo from "module.export" to "module.exports"
