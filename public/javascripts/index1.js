$(function() {
    var $newslist = $('#approved');
    $.ajax({
        type: 'GET',
        url: '/news/approve',
        success: function(newslist) {
            console.log(newslist);


            $.each(newslist.docs, function(i, user) {
                $newslist.prepend('<center><img  src="' + user.path + '"></center><h1 style="text-align:center"><center>' + user.title + '</center></h1><p style="padding-left:50px" style="margin-bottom:50px">' + user.description + '</p>')


            });
        }
    });

});