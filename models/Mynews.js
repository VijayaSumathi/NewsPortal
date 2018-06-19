var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NewsSchema = new Schema({   
       title: String,   
       description: String, 
       path:   String ,
       status:String ,
       createdAt: { type: Date, default: Date.now, expires: '43200m'  },
       updated_at: { type: Date, default: Date.now }
        
  });

module.exports = mongoose.model('Mynew', NewsSchema);