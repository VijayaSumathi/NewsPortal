var express = require('express');
var router = express.Router();
var uploadmynew = require('../models/Mynews');
var User = require('../models/adminlogin');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');






router.get('/', function(req, res, next){  
    res.render('index', { title: 'index' });
});
router.get('/index', function(req, res, next) {
    res.render('upload');
});

router.get('/first', function(req, res, next) {
    res.render('one');
});
router.get('/second', function(req, res, next) {
    res.render('two');
});
router.get('/third', function(req, res, next) {
    res.render('three');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/last', function(req, res, next) {
    res.render('index');
});
router.get('/home', function(req,res, next){
   
    res.render('approve');
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
                    res.render('login',{ "Username": "wrong username" });
             }
        if(user.password==req.body.password  )
        {     
            const jwttoken = jwt.sign(
                {  username: req.body.username ,
                   password:req.body.password 
                },
                'secret',{
                    expiresIn : '2h'
                });    

                return res.status(200).json({
                    success: 'Welcome to the JWT Auth',
                    token: jwttoken
                  });
                    
        }
        else
        {
        res.json({"ok":"wrong password"})       
        }       
    });

/*
    var username = req.body.username;
    var password = req.body.password;

    console.log(username);
    console.log(password);

    User.find({}, function(err, data) {
    console.log(data)
        if (username == data[0].username) {
            if(password==data[0].password)
            {
                jwt.sign({username:data},'secretkey',(err,token)=>{
                    //res.json({token:token})
            
            });
                console.log("correct");
                res.redirect('/home'); 
            }
            else
            { 
                 console.log("wrong password")
                res.render('login',{ password: "wrong password" });
            }
        } 
        else
         {
            console.log("wrong username")
          res.render('login',{ password: "wrong username" });
        }
        
         
        console.log(">>>>");
    });
*/
});




router.get('/news/all', function(req, res, next){
    console.log("inside approve");
    uploadmynew.find( { $or: [ { "status":"reject" }, { "status":"fresh" } ] }, function(err, docs) {
        if (err) { res.json(err); } else {
            res.json({ docs: docs });
        }
    });
});

router.post('/approval', function(req, res, next) {
    var status1 = req.body.status;
    var id1 = req.body._id;
    console.log(req.body);
    if (status1.toLowerCase() == "accept")
    {                                 
                
                uploadmynew.findByIdAndUpdate(id1,{'status':status1} , function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated");                  
                });                
       
            
    } 
    else if(status1.toLowerCase() == "delete")
    {  
        uploadmynew.findOne({ _id: id1 }, function(error, data) {
            console.log("news deleted " + data);
            data.remove();
               
        });
        
    }
    else if(status1.toLowerCase() == "reject")
    {   
        uploadmynew.findByIdAndUpdate(id1,{'status':status1} , function(err, res) {
            if (err) throw err;
            console.log("1 document updated");                  
        });   
        console.log("news rejected ");
    }
   
});

router.get('/news/approve', function(req, res, next) {

    uploadmynew.find({"status":"accept"}, function(err, docs) {
      if (err) { res.json(err); } else {
          res.json({ docs: docs });
      }
  });
});


/* save password */


function verifyToken(req,res,next) {
    //get auth val
     const  bearerHeader = req.headers['authorization'];
     //check if bearer is undefined
     if(typeof bearerHeader!== "undefined")
     {
           const bearer = bearerHeader.split(' ');
           //get token from array
           const bearerToken =bearer[1];
           req.token=bearerToken;
           next();
     }
     else{
         //forbidden
         res.sendStatus(403);
     }
}


module.exports = router;