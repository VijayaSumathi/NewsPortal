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
var AWS = require('aws-sdk');
router.use(session({
    cookieName: 'session',
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
  }));
  var s3 = new AWS.S3({
    accessKeyId:'AKIAJUJCSZVDZ72WW7JA',
    secretAccessKey:'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'
});

router.get('/', function(req, res, next){  
    res.send()
    res.render('index', { title: 'index' });
});
router.get('/index', function(req, res, next) {
    res.render('upload');
});

router.get('/login', function(req, res, next) {
  res.render('login');

});

router.get('/last', function(req, res, next) {
    res.render('index');
});



router.all('/admin/*', function(req, res, next) {     
    
        if (req.session && req.session.user) {
                return next();                  
            }
          else 
           {
            return res.redirect('/login');
          }
  
  })

      


router.get('/admin/home' , function(req,res, next){
    
        // Check if session exists
       // lookup the user in the DB by pulling their username from the session
       User.findOne({ username: req.session.user.username }, function (err, user) {
        if (!user) {
          // if the user isn't found in the DB, reset the session info and
          // redirect the user to the login page
          req.session.reset();
          return res.redirect('/login');
        } else 
        {
            console.log("user authentication successful");
          // expose the user to the template
               req.user = user;
              // delete the password from the session
              req.session.user = user;  //refresh the session value
              res.locals.user = user;         
   
          // render the approve page
          return res.render('approve');
        }
      });   
});


router.get('/admin/logout', function(req, res) {
    req.session.reset();
    return res.redirect('/login');
  });
  
  
router.get('/indexhome', function(req,res, next){
    return res.render('index');
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
                    console.log(req.file.originalname);
            
           
               console.log(req.file.path)

               fs.readFile(req.file.path, function(err, file_buffer){
            
                    var params = {
                        Bucket:  'y2018m06d20ywdllxn0b3jlltsc',
                        Key:res.req.file.filename, //This is what S3 will use to store the data uploaded.
                        Body:file_buffer, //the actual *file* being uploaded
                        ContentType: req.file.mimetype, //type of file being uploaded
                        ACL: 'public-read', //Set permissions so everyone can see the image
                       
                } ;
                console.log(res.req.file.filename);
               s3.putObject(params, function (perr, data) {
                if (perr) {
                    console.log("Error uploading data: ", perr);
                } 
                else
                 {
                    console.log("Successfully uploaded data "+data.location);
                    var imageurl="d1h8e9mz50lns7.cloudfront.net"+ '/' + encodeURIComponent(res.req.file.filename);
                         
                    const news = new uploadmynew({
                        title: req.body.title,
                        description: req.body.description,               
                        path: "http://"+imageurl,          
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
                  console.log(imageurl);
                }
            });
        });

        return  res.render('index',{ upload: "news uploaded" });           
        });
          
   
    
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
                     return   res.render('login',{message:"Authentication failed, Wrong Username"});
             }
             else
             {            
             
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                console.log(res);
                if(result)
                {
                    req.session.user = user;
                    return  res.redirect('/admin/home')                
               }
               else
               {
                 return res.render('login',{message:"Authentication failed, Wrong password"});            
                
               }
                
            });
        }
    });
           
});




router.get('/admin/news/all', function(req, res, next){
    
    uploadmynew.find({ $or: [ { "status":"reject" }, { "status":"fresh" } ] } , function(err, docs) {
        if (err) { return res.json(err); } else {
            return res.json({ docs: docs });
        }
    });
});





router.post('/admin/approval', function(req, res, next) {
    var status1 = req.body.status;
    var id1 = req.body._id;
    console.log(req.body);
    if (status1.toLowerCase() == "accept")
    {                                 
        
                uploadmynew.findByIdAndUpdate(id1,{'status':status1} , function(err, result) {
                    if (err) throw err;
                  /*if(data.status=="accept")
                   {
                   console.log("cant accept twice");
                   res.json({ message: "Cant accept"});  
                 }
                 else{}*/
                    console.log("1 document updated");    
                    return res.json({ message: result.id });   
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
                   
                }
               
                console.log('Deleted !!');
            });
                 
            data.remove();
                    console.log("Image path s-----------------"+data.path);
        // delete image in bucket
        var deleteparams = {
            Bucket:  'y2018m06d20ywdllxn0b3jlltsc',
            Key:file, //This is what S3 will use to store the data uploaded                             
           } ;
           s3.deleteObject(deleteparams, function(err, data) {
            if (err) {
              console.log(err);
              
            } else {
              console.log("data del is : "+data);
            }
          });
  
            return res.json({ message: data._id });    
        });
        
    }
    else if(status1.toLowerCase() == "reject")
    {   
        uploadmynew.findOne({}, function(error, data) {
            console.log("the status " + data.status);
            if(data.status=="accept")
            {
                console.log("rej");
                return  res.json({ message: "Cant reject approved news"});  
            }
            else{
                console.log("rej1");
                uploadmynew.findByIdAndUpdate(id1,{'status':status1} , function(err, result) {
                    if (err) throw err;
                    console.log("1 document updated");    
                    return  res.json({ message: result._id });                 
                });   
                console.log("news rejected ");
            }
              
        });

       
    }
   
});

router.get('/news/approve', function(req, res, next) {

    uploadmynew.find({"status":"accept"}, function(err, docs) {
      if (err) { return res.json(err); } else {
        return res.json({ docs: docs });
      }
  });
});





module.exports = router;