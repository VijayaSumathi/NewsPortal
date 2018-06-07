var express = require('express');
var router = express.Router();
var uploadmynew= require('../models/uploadNews');
var login= require('../models/adminlogin');
var approvednews= require('../models/adminapprove');
const multer = require('multer');
const path = require('path');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadnews', function(req, res, next) { 
  
  const storageEngine = multer.diskStorage({
    destination: __dirname + '/../public/images/',
    filename: function(req, file, fn){
      fn(null,file.fieldname+'-'+ Date.now() + path.extname(file.originalname));
    }
    
  });
  
  const upload =  multer({
    storage: storageEngine    
  }).single('pic');

  upload(req, res, function(err, result) {

    const news = new uploadmynew({
    //  title: req.body.title, 
     // description: req.body.description,
      path:res.req.file.filename
  
  });
  news.save()
  .then(data => {
      console.log("inserted");
      //res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Note."
      });
      console.log("error");
  });
   res.json({news:news});
    console.log('The filename is ' +res.req.file.filename );
    
  });  
 
});





router.post('/adminlogin', function(req, res, next) {
  var username=req.body.name;
  var password=req.body.pass;
  
  console.log(username);
  console.log(password);
  
login.find({name:username}, function(err, data){
 if(password==data[0].password )
 {
   res.json({password:"correct"});
 }
 else{
  res.json({password:"wrong"});
 }

  console.log(">>>> " );
  });
  
});



router.post('/admin', function(req, res, next){
 
  console.log("inside approve");
  uploadmynew.find({}, function(err, docs){
    if(err) {res.json(err);}
    else {
     res.json({docs: docs});
    }
   });
});

router.post('/approve', function(req, res, next){
 
  
  var status1=req.body.status;
  var id1=req.body.id;
  if(status1.toLowerCase()=="accept")
  {    
    
    uploadmynew.find({_id:id1}, function(err, data){
      if(err) {res.json(err);}
    else {      
       const approvenews = new approvednews({
        title:data[0].title, 
        description: data[0].description
       });
        
       approvenews.save(function(err){
               console.log("inserted");
               if(err)
               console.error(err);
                
       });        
      
       res.json(data);


      }});  
      uploadmynew.findOne({_id:id1}, function (error, data){
        console.log("This object will get deleted " + data);
        data.remove();

    }); 
     
    } 
    
  
  
  else{
    uploadmynew.findOne({_id:id1}, function (error, data){
      console.log("This object will get deleted " + data);
      data.remove();

    });

    res.json({display:"News rejected"});
  }
   
});




module.exports = router;