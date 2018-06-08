var express = require('express');
var router = express.Router();
var uploadmynew = require('../models/uploadNews');
var login = require('../models/adminlogin');
var approvednews = require('../models/adminapprove');
const multer = require('multer');
const path = require('path');


router.get('/', function(req, res, next) {
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

        const news = new uploadmynew({
            title: req.body.title,
            description: req.body.description,
            path:'/../public/images/'+res.req.file.filename

        });
        news.save()
            .then(data => {
                console.log("inserted");
                //res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred ."
                });
                console.log("error");
            });
            res.render('index',{ upload: "news uploaded" });
        console.log('news uploaded');

    });
});

router.get('/home', function(req,res, next){
  res.render('approve');
});


router.post('/login', function(req, res, next) {
    var username = req.body.name;
    var password = req.body.pass;

    console.log(username);
    console.log(password);

    login.find({}, function(err, data) {
        if (username == data[0].name) {
            if(password==data[0].password)
            {
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

});




router.get('/news/all', function(req, res, next){

    console.log("inside approve");
    uploadmynew.find({}, function(err, docs) {
        if (err) { res.json(err); } else {
            res.json({ docs: docs });
        }
    });
});

router.post('/approval', function(req, res, next) {


    var status1 = req.body.status;
    var id1 = req.body.id;
    if (status1.toLowerCase() == "accept") {

        uploadmynew.find({ _id: id1 }, function(err, data) {
            if (err) { res.json(err); } else {
                const approvenews = new approvednews({
                    title: data[0].title,
                    description: data[0].description
                });

                approvenews.save(function(err) {
                    console.log("inserted");
                    if (err)
                        console.error(err);

                });

                res.json(data);


            }
        });
        uploadmynew.findOne({ _id: id1 }, function(error, data) {
            console.log("This object will get deleted " + data);
            data.remove();

        });

    } else {
        uploadmynew.findOne({ _id: id1 }, function(error, data) {
            console.log("This object will get deleted " + data);
            data.remove();

        });

        res.json({ display: "News rejected" });
    }

});

router.get('/news/approve', function(req, res, next) {

  console.log("inside news approve");
  approvednews.find({}, function(err, docs) {
      if (err) { res.json(err); } else {
          res.json({ docs: docs });
      }
  });
});


module.exports = router;