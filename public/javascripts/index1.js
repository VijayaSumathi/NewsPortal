function dtfnct(date) {
    var d = new Date(date)
    var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
    var monthname = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
    return weekday[d.getDay()] + ", " + (d.getDate() + " ") + monthname[d.getMonth()] + " " + (d.getFullYear())
}
$(function() {
    var $newslist = $('#approved');
    $.ajax({
        type: 'GET',
        url: '/news/approve',
        success: function(newslist) {
            console.log(newslist);
            $.each(newslist.docs, function(i, user) {
                $newslist.prepend('<li><div class="last"><img  src="' + user.path + '"><p style="font-size:17px; margin-bottom:5px; font-family:Open Sans"><b>' + user.title + '</b></p><p2 style="font-size:16px;font-family:Open Sans">' + user.description + '</p2><div><b>' + dtfnct(user.updated_at) + '</b></div></div></li>')


            });
        }
    });

});