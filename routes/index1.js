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
                $three.append('<li>title:' + user.title + ',image:' + user.path + ',description:' + user.description + '</li>')
            });
        }
    });

});