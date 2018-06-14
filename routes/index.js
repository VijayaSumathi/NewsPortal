var express = require('express');
var router = express.Router();
var uploadmynew = require('../models/Mynews');
var User = require('../models/adminlogin');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
var session = require('client-sessions');
var bcrypt = require('bcryptjs');
var fs = require('fs');

router.use(session({
    cookieName: 'session',
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
  }));


router.get('/', function(req, res, next){  
    res.render('index', { title: 'index' });
});
router.get('/index', function(req, res, next) {
    res.render('upload');
});
/*
router.get('/first', function(req, res, next) {
    res.render('one');
});
router.get('/second', function(req, res, next) {
    res.render('two');
});
router.get('/third', function(req, res, next) {
    res.render('three');
});*/
router.get('/login', function(req, res, next) {
  res.render('login');
});
// middleware
router.get('/last', function(req, res, next) {
    res.render('index');
});

function verifySession(req,res,next)
 {
    
        if (req.session && req.session.user) {
                return next();                  
            }
          else 
           {
            return res.redirect('/login');
          }
}
      


router.get('/home',verifySession , function(req,res, next){
    
        // Check if session exists
       // lookup the user in the DB by pulling their username from the session
       User.findOne({ username: req.session.user.username }, function (err, user) {
        if (!user) {
          // if the user isn't found in the DB, reset the session info and
          // redirect the user to the login page
          req.session.reset();
          res.redirect('/login');
        } else 
        {
            console.log("user authentication successful");
          // expose the user to the template
               req.user = user;
              // delete the password from the session
              req.session.user = user;  //refresh the session value
              res.locals.user = user;
          
   
          // render the approve page
          res.render('approve');
        }
      });
    
    
  

   
});


router.get('/logout',verifySession, function(req, res) {
    req.session.reset();
    res.redirect('/');
  });
  
  
router.get('/indexhome', function(req,res, next){
      res.render('index');
});
  
  



router.post('/uploadnews', function(req, res, next) {       
  
        const storageEngine = multer.diskStorage({
            destination: __dirname + '/../public/images/',
            filename: function(req, file, fn) {
                fn(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }    
        });
        const upload = multer({
            storage: storageEngine
        }).single('pic');  
        upload(req, res, function(err, result) {            
                
            if(!res.req.file)
            {
                
                  a=null
            }
            else
            {
                a='http://localhost:3000/images/'+res.req.file.filename
            }

            const news = new uploadmynew({
                title: req.body.title,
                description: req.body.description,               
                 path: a,          
                 status:"fresh"
            }); 
            news.save()
            .then(data => {
                console.log("News successfully uploaded");
                //res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred ."
                });
                console.log("error");
            }); 
        });
        res.render('index',{ upload: "news uploaded" });        
   
    
});


router.post('/login', function(req, res, next) { 
    
    User.findOne({username:req.body.username},function(err,user){
       if(err)
       {
           return res.send(401);
       }

          if(!user)
             {
                     console.log("Incorrect username");
                     res.render('login',{message:"Authentication failed, Wrong Username"});
             }
             else
             {            
             
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                console.log(res);
                if(result)
                {
                    req.session.user = user;
                    res.redirect('/home')                
               }
               else
               {
                res.render('login',{message:"Authentication failed, Wrong password"});            
                
               }
                
            });
        }
    });
           
});




router.get('/news/all',verifySession, function(req, res, next){
    console.log("inside approve");
    uploadmynew.find( { $or: [ { "status":"reject" }, { "status":"fresh" } ] }, function(err, docs) {
        if (err) { res.json(err); } else {
            res.json({ docs: docs });
        }
    });
});

router.post('/approval',verifySession, function(req, res, next) {
    var status1 = req.body.status;
    var id1 = req.body._id;
    console.log(req.body);
    if (status1.toLowerCase() == "accept")
    {                                 
                
                uploadmynew.findByIdAndUpdate(id1,{'status':status1} , function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");    
                    res.json({ message: result._id });   
                    console.log("The result is :"+result._id)           
                });                
       
            
    } 
    else if(status1.toLowerCase() == "delete")
    {  
        uploadmynew.findOne({ _id: id1 }, function(error, data) {
            console.log("news deleted " + data+"the image deleted"+ data.path);
            
            const file=  path.basename(data.path);
            console.log(file)
              //delete photo
              fs.unlink( __dirname + '/../public/images/'+file, function(error) {
                if (error) {
                    throw error;
                }
                console.log('Deleted !!');
            });
                 
            data.remove();
            res.json({ message: data._id });    
        });
        
    }
    else if(status1.toLowerCase() == "reject")
    {   
        uploadmynew.findOne({}, function(error, data) {
            console.log("the status " + data.status);
            if(data.status=="accept")
            {
                res.json({ message: "Cant reject approved news"});  
            }
            else{
                uploadmynew.findByIdAndUpdate(id1,{'status':status1} , function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");    
                    res.json({ message: result._id });                 
                });   
                console.log("news rejected ");
            }
              
        });

       
    }
   
});

router.get('/news/approve', function(req, res, next) {

    uploadmynew.find({"status":"accept"}, function(err, docs) {
      if (err) { res.json(err); } else {
          res.json({ docs: docs });
      }
  });
});






module.exports = router;