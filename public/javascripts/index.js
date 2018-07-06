//var ourRequest=new XMLHttpRequest();
//ourRequest.open('GET','http://localhost:3000/user')
//ourRequest.onload=function(){
//console.log(ourRequest.responseText);
//};
function onAccept(e, id){
  var target = e.currentTarget;
  var lielement = $(target).closest('li');
  console.log("id",id);
  $.ajax( {
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
        $('saved').empty();
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
      if(data) {   // DO SOMETHING
        $('.saved').empty();// enable butto
        $('delete1').empty();
      }
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

function onedit(e,id) {
  var target = e.currentTarget;
  var lielement = $(target).closest('li');
  $(lielement).children(".para").css('border', "solid 1px #212121");
  $(lielement).children(".title").css('border', "solid 1px #212121");
  $(lielement).children(".para").attr('contentEditable', true);
  $(lielement).children(".para").html();
  $(lielement).children(".para").focus();
  $(lielement).children(".title").attr('contentEditable', true);
  $(lielement).children(".title").html();
  $(lielement).children(".title").focus();
  lielement.append(' &nbsp<button class="save">save</button>');
  lielement.children(".edit").prop('disabled',true);
  $('.save').on('click', function(){
    $(lielement).children(".para").css('border','');
    $(lielement).children(".title").css('border','');
    var editedContent= $(lielement).children(".para").html();
    var content2=$(lielement).children(".title").html();
  $.ajax( {
    type:"POST",
    url:'/admin/news/edit',
    data:{_id:id,description:editedContent,title:content2},
    datatype:"text/json",
    success:function(data)
    {
      lielement.append('<div class="saved">saved</div>')
      lielement.children(".save").prop('disabled',true);
      if(data) {   // DO SOMETHING
        $('.CellLabel').empty();
        $('.reject').empty();// enable butto
        $('delete1').empty();
      }
      console.log("edited");
    }
  });
});
};


$(function(){
  var $newslist=$('#newslist');
  $.ajax( {
    type:'GET',
    url:'/admin/news/all',
    success:function(newslist){
      console.log(newslist);
      $.each(newslist.docs,function(i,user)
      {
      $newslist.prepend('<li><h3 id="head"class="title">'+user.title+'</h3><img src="' +user.path+ '"/><p class="para",id="paragraph">'+user.description+'</p><p>'+user.createdAt+' </p><button name="status" value="accept"  class="click" onclick="onAccept(event, \''+user._id+'\')"  >Approve</button> &nbsp <button name="status" value="reject" class="hide" onclick="onReject(event, \''+user._id+'\')"   >Reject</button> &nbsp  <button name="status" value="delete" class="delete" onclick="onDelete(event, \''+user._id+'\')"  >Delete</button> &nbsp <button name="status" value="edit" id="edtbtn"class="edit" onclick="onedit(event, \''+user._id+'\')">Edit</button></li>') 
    });
  }
});
});