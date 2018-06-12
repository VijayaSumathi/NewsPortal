$(function() {
    var $newslist = $('#approved');
    $.ajax({
        type: 'GET',
        url: '/news/approve',
        success: function(newslist) {
            console.log(newslist);


            $.each(newslist.docs, function(i, user) {
                $newslist.append('<center><img  src="' + user.path + '"></center><h1><center>' + user.title + '</center</h1><p style="font-size:24px">' + user.description + '</p>')


            });
        }
    });

});