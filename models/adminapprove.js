var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var approveSchema = new Schema({   
       title: String,
       description: String,       
       path:   String 
        
  });

module.exports = mongoose.model('approvednew', approveSchema);