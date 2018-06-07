var router = express.Router();

var fs = require('fs')

$.get("/admin", function(data, ) {
    for (i = 0; i < mystring.obj.length; i++) {

        var mystring = ['<li>',
            '<h3>' + obj.title + '</h3>',
            '<img>' + obj.imageurl + '</img>',
            '<p>' + obj.description + '</p>',
            '</li>'
        ].join('');

        $('#newlist').append(mystring)
    }
    $.each(data, function(index, value) {
        $("#result").append(index + ": " + value + '<br>');
        $('#newlist').append(mystring)
    })
})