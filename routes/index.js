var express = require('express');
var router = express.Router();
var uploadmynew= require('../models/uploadNews');
var login= require('../models/adminlogin');
var approvednews= require('../models/adminapprove');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user', function(req, res, next) {  
  const news = new uploadmynew({
    title: req.body.title, 
    description: req.body.description
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
  //res.json({news:news});
  res.render("display",{news:news})
});





router.post('/login', function(req, res, next) {
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

  console.log(">>>> " + data[0].password );
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
    

     res.json({display:"accept"});
  
  
  }
  else{

    res.json({display:"News rejected"});
  }
   
});




module.exports = router;