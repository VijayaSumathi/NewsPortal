//var ourRequest=new XMLHttpRequest();
//ourRequest.open('GET','http://localhost:3000/user')
//ourRequest.onload=function(){
//console.log(ourRequest.responseText);
//};
function onAccept(id){
  console.log(id);
  $.ajax({
    type:'post',
    url:'/approval',
    data:id,
    success:function(id){
      console.log("data");
      $id=id;
    }
  })
}
$(function(){
  var $newslist=$('#newslist');
  $.ajax({
    type:'GET',
    url:'/news/all',
    success:function(newslist){
      console.log(newslist);
      $.each(newslist.docs,function(i,user)
      {
      $newslist.append('<li><h3>'+user.title+'</h3><img src="'+user.path+'"/><p>'+user.description+'</p> <button name="status" id="click"  value="accept" onclick="onAccept(\''+user._id+'\')"  >Approve</button> &nbsp;&nbsp;&nbsp; <button name="status" id="click"  value="reject" onclick="onAccept(\''+user._id+'\')"  >Reject</button></li>') 
    });
  }
  });

});
