$(function() {
    var $newslist = $('#approved');
    $.ajax({
        type: 'GET',
        url: '/news/approve',
        success: function(newslist) {
            console.log(newslist);
            $.each(newslist.docs, function(i, user) {
                $newslist.append('<li><h3>' + user.title + '</h3><img src="' + user.path + '"/><p>' + user.description + '</p></li>')
            });
        }
    });

});