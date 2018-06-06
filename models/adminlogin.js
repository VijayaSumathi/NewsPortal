var mongoose = require('mongoose');
var LoginSchema = new mongoose.Schema({
    name: String,
    password: String,
    updated_at: { type: Date, default: Date.now },
  });
  module.exports = mongoose.model('LOGIN', LoginSchema);