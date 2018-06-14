//var ourRequest=new XMLHttpRequest();
//ourRequest.open('GET','http://localhost:3000/user')
//ourRequest.onload=function(){
//console.log(ourRequest.responseText);
//};
function onAccept(e, id){
  var target = e.currentTarget;
  var lielement = $(target).closest('li');
  console.log("id",id);
  $.ajax({
    type:"POST",
    url:'/approval',
    data:{_id : id, status:"accept"},
    datatype:"json",
    success:function(data){
      lielement.append('<span>Approved</span>');
      console.log("onAccept Succes");
      $("#click").attr('disabled', true); 
      $("#hide").attr('disabled', true);// enable butto
    }
  })
  $.ajax({
    type:"GET",
    url:'',
    success:function(newsid)
    {
      
    }
 

  })
}

function onReject(e, id){
  var target = e.currentTarget;
  var lielement = $(target).closest('li');
  console.log("id",id);
  $.ajax({
    type:"POST",
    url:'/approval',
    data:{_id : id, status:"reject"},
    datatype:"json",
    success:function(data){
      lielement.append('<span>Approved</span>');
      console.log("onReject Succes");
    }
  })
}
function onDelete(id){
  console.log("id",id);
  $.ajax({
    type:"POST",
    url:'/approval',
    data:{_id : id, status:"delete"},
    datatype:"json",
    success:function(data){
      console.log("onDelete Succes");
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
     $newslist.prepend('<li><h3>'+user.title+'</h3><img src="' +user.path+ '"/><p>'+user.description+'</p> <button name="status" value="accept" id="click" onclick="onAccept(event, \''+user._id+'\')"  >Approve</button> <button name="status" value="reject" id="hide" onclick="onReject(event,\''+user._id+'\')"   >Reject</button>     <button name="status" value="delete" id="delete" onclick="onDelete(event,\''+user._id+'\')"  >Delete</button>  </li>') 
     
    
    });
  }
});
});