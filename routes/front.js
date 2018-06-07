var router = express.Router();

var fs = require('fs')

$.get("/approve", function(data, ) {
    for (i = 0; i < mineString.obj.length; i++) {

        var mineString = ['<li>',
            '<h3>' + obj.title + '</h3>',
            '<img>' + obj.imageurl + '</img>',
            '<p>' + obj.description + '</p>',
            '</li>'
        ].join('');

        $('#newlist').append(mineString)
    }
    $.each(data, function(index, value) {
        $("#result").append(index + ": " + value + '<br>');
        $('#newlist').append(mineString)
    })
})