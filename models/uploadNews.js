var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NewsSchema = new Schema({   
       title: String,   
      description: String, 
       path:   String ,
       createdAt: { type: Date, default: Date.now, expires: '43200m'  }
 
  });

module.exports = mongoose.model('uploadmynew', NewsSchema);