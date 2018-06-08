var router = express.Router();

var fs = require('fs')

$(function() {
    var $newslist = $('approved');
    $.ajax({
        type: 'GET',
        url: '/news/approve',
        success: function(newslist) {
            console.log(newslist);

            $.each(newslist.docs, function(i, user) {
                $three.append('<li> ' + user.title + ',' + user.path + ' ,' + user.description + ' </li>')
            });
        }
    });

});