$(function() {
    var $newslist = $('#approved');
    $.ajax({
        type: 'GET',
        url: '/news/all',
        success: function(newslist) {
            console.log(newslist);


            $.each(newslist.docs, function(i, user) {
                $newslist.append('<li><center><img  src="' + user.path + '"></center><h1><center>' + user.title + '</center</h1><p style="font-size:24px">' + user.description + '</p></li>')


            });
        }
    });

});