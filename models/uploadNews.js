var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NewsSchema = new Schema({   
       title: String,   
      description: String, 
       path:   String ,
 
  });

module.exports = mongoose.model('uploadmynew', NewsSchema);