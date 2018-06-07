UserManager = function(app) {
    var UserProvider = require('./userProvider-mongodb').UserProvider;
    var userProvider = new UserProvider(mongoServer, mongoPort);
    app.set('userProvider', userProvider);
}