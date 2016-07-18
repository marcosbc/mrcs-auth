'use strict';
// Dependencies and variables
var mongoose = require('mongoose');
var userSchema;
var User;
// Build the schema
userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
// Create the model
User = mongoose.model('User', userSchema);
// Simply export the schema
module.exports = User;
