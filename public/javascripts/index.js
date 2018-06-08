//var ourRequest=new XMLHttpRequest();
//ourRequest.open('GET','http://localhost:3000/user')
//ourRequest.onload=function(){
//console.log(ourRequest.responseText);
//};
function onAccept(id){
  console.log(id);
  $.ajax({
    type:"post",
    url:"/approval",
    data:id,
    success:function(){
      alert("data")
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
      $newslist.append('<li><h3>'+user.title+'</h3><img src=""/><p>'+user.description+'</p> <button name="status" id="click" onclick="onAccept(\''+user._id+'\')"  >Approve</button> &nbsp;&nbsp;&nbsp; <button>Reject</button></li>') 
    });
  }
  });

});
