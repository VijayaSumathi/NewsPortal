var User = require('../models/adminlogin');
const adminlogin = new User();
    adminlogin.username='admin',
    adminlogin.password= '$2y$12$7PbB.VP79nxNrYkU.9.tfe9MU486md5tiBY1WuZNlR4sjfBGTIbsG',               
  

adminlogin.save(function (err) {
    if (err) {
        console.log(err);
    }
    // console.log('LOGIN !' )
})
