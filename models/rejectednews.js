var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NewsSchema = new Schema({   
       title: String,   
      description: String, 
       path:   String ,
       id:Schema.ObjectId
  });

module.exports = mongoose.model('new', NewsSchema);