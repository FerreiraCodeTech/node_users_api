const mongoose = require('mongoose');
const { Schema } = mongoose;
const { model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: String
});

const User = new model('User', userSchema);

module.exports = User;