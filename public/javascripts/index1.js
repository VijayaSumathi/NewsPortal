$(function() {
    var $newslist = $('#approved');
    $.ajax({
        type: 'GET',
        url: '/news/approve',
        success: function(newslist) {
            console.log(newslist);


            $.each(newslist.docs, function(i, user) {
                $newslist.append('<li>' + user.title + ',' + user.path + '"/><p>' + user.description + '</p></li>')
            });
        }
    });

});