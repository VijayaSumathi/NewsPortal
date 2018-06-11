//var ourRequest=new XMLHttpRequest();
//ourRequest.open('GET','http://localhost:3000/user')
//ourRequest.onload=function(){
//console.log(ourRequest.responseText);
//};
function onAccept(id){
  console.log("id",id);
  $.ajax({
    type:"POST",
    url:'/approval1',
    data:{_id : id, status:"accept"},
    datatype:"json",
    success:function(data){
      console.log("Succes");
    }
  })
}
$(function(){
  var $newslist=$('#newslist');
  $.ajax( {
    type:'GET',
    url:'/news/all',
    success:function(newslist){
      console.log(newslist);
      $.each(newslist.docs,function(i,user)
      {
      $newslist.append('<li><h3>'+user.title+'</h3><img src="' +user.path+ '"/><p>'+user.description+'</p> <button name="status" value="accept" id="click" onclick="onAccept(\''+user._id+'\')"  >Approve</button>     <button>Reject</button></li>') 
    });
  }
  });

});
