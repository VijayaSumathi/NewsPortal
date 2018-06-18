var mongoose = require('mongoose');
var LoginSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
   created_at: { type: Date, default: Date.now },// find how to triger event 
    updated_at: { type: Date, default: Date.now },
  });
  module.exports = mongoose.model('adminlogin', LoginSchema,'adminlogin');