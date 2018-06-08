
//var ourRequest=new XMLHttpRequest();
//ourRequest.open('GET','http://localhost:3000/user')
//ourRequest.onload=function(){
//console.log(ourRequest.responseText);
//};
$(function(){
  var $newslist=$('#newslist');
$.ajax({
type:'GET',
url:'/news/all',
success:function(newslist){
  console.log(newslist);
  $.each(newslist.docs,function(i,user)
  {
   $newslist.append('<li><h3>'+user.title+'</h3><img src="'+user.path+'"/><p>'+user.description+'</p></li>') 
 });
}
});

});
//$get
//var mystring = ['<li>',
//'<h3>'+docs.title+'</h3>',
//'<img>'+docs.imageurl+'</img>',
//'<p>'+ docs.description +'</p>',
//'<button>Accept</button>',
//'</li>'].join('');
//for(i=0;i<mystring.obj.length;i++)
//{
//$('#newlist').append(mystring)

//$.each(data, function(index, value){
//   $("#result").append(index + ": " + value + '<br>');
// $('#newlist').append(mystring)


//function loadlist(){
  // $.ajax call /docs
 // $('.userlist').append(['<li>',
  //'<h3>India Football Match In Mumbai Sold Out After Sunil Chhetris Heartfelt Plea.</h3>',
  //'<img src="image1.png"/>',
  //'<p> Sunil Chhetri had made a heartfelt plea to fans on Saturday to go watch India football matches in the stadiums. The India football team captain\'s appeal seems to have done the trick with NDTV sources saying that the Intercontinental Cup match between',
   //         'India and Kenya at the Mumbai Football Arena on Monday has been sold out. Chhetri, who will be making his 100th international appearance for India, had posted an emotional video on Twitter, pleading with fans to "abuse us, criticise us but',
    ////        'please come to watch the Indian national team play..</p>',
   //         '<button>Accept</button>',
 //'<button>Reject</button>',
//'</li>'].join());
//}

//$(document).ready(loadlist);

