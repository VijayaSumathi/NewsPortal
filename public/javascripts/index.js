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
    url:'/admin/approval',
    data:{_id : id, status:"accept"},
    datatype:"json",
    success:function(data){
      lielement.append('<div class="CellLabel">approved</div>');
      console.log(data);
      console.log("onAccept Succes");
      lielement.children(".click").prop('disabled', true); 
      lielement.children(".hide").prop('disabled', true);
      if(data) {   // DO SOMETHING
        $('.reject').empty();// enable butto
        $('delete1').empty();
      }
    }
  })
}

function onReject(e,id){
  var target = e.currentTarget;
  var lielement = $(target).closest('li');
  console.log("id",id);
  $.ajax({
    type:"POST",
    url:'/admin/approval',
    data:{_id : id, status:"reject"},
    datatype:"json",
    success:function(data){
      console.log("onReject Succes");
      lielement.append('<div class="reject">Rejected</div>');
      console.log(data);
      lielement.children(".hide").prop('disabled', true); 
      
      //lielement.children("").prop('disabled', true);
    }
  })
}
function onDelete(e,id){
  var target = e.currentTarget;
  var lielement = $(target).closest('li');
  console.log("id",id);
  $.ajax({
    type:"POST",
    url:'/admin/approval',
    data:{_id : id, status:"delete"},
    datatype:"json",
    success:function(data){
      console.log("onDelete Succes");
      lielement.remove();
      lielement.append('<div class="delete1">Deleted</div>');
      console.log(data);
      lielement.children(".delete").prop('disabled', true);
      lielement.children(".hide").prop('disabled',true);
      lielement.children(".click").prop('disabled',true);
      if(data) {   // DO SOMETHING
        $('.CellLabel').empty();
      }
      lielement.children('.CellLabel').removeByContent('approved');
    }
  })
}
		

$(function(){
  var $newslist=$('#newslist');
  $.ajax( {
    type:'GET',
    url:'/admin/news/all',
    success:function(newslist){
      console.log(newslist);
      $.each(newslist.docs,function(i,user)
      {
      $newslist.prepend('<li><h3>'+user.title+'</h3><img src="' +user.path+ '"/><p>'+user.description+'</p> <button name="status" value="accept"  class="click" onclick="onAccept(event, \''+user._id+'\')"  >Approve</button> <button name="status" value="reject" class="hide" onclick="onReject(event, \''+user._id+'\')"   >Reject</button>     <button name="status" value="delete" class="delete" onclick="onDelete(event, \''+user._id+'\')"  >Delete</button>  </li>') 
    });
  }
});
});