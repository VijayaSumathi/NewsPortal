$(function() {
    var $newslist = $('#approved');
    $.ajax({
        type: 'GET',
        url: '/news/approve',
        success: function(newslist) {
            console.log(newslist);


            $.each(newslist.docs, function(i, user) {
                $newslist.prepend('<div class="last"><center ><img  src="' + user.path + '"></center><h1><center>' + user.title + '</center></h1><p style="text-align:center;font-size:150%;">' + user.description + '</p></div>')


            });
        }
    });

});