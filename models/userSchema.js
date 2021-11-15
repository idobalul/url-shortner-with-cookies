const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 50,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
