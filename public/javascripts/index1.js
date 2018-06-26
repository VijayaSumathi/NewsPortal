$(function() {
    var $newslist = $('#approved');
    $.ajax({
        type: 'GET',
        url: '/news/approve',
        success: function(newslist) {
            console.log(newslist);


            $.each(newslist.docs, function(i, user) {
                $newslist.prepend('<li><div class="last"><img  src="' + user.path + '"><p style="font-size:16px; margin-bottom:5px; font-family:Open Sans"><b>' + user.title + '</b></p><p2 style="font-size:14px;font-family:Open Sans">' + user.description + '</p2></div></li>')


            });
        }
    });

});