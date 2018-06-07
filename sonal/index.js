var router = express.Router();

var fs = require('fs')

$.get("server.js", function(data,){


var mystring = ['<li>',
            '<h3>'+docs.title+'</h3>',
            '<img>'+docs.imageurl+'</img>',
            '<p>'+ docs.description +'</p>',
            '<button>Accept</button>',
    '</li>'].join('');
    
        $('#newlist').append(mystring)
    }
    //$.each(data, function(index, value){
     //   $("#result").append(index + ": " + value + '<br>');
   // $('#newlist').append(mystring)
