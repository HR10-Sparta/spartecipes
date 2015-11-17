var User = require('./userModel.js');

//return an array of all User profiles as JSON objects
exports.getAllUsers = function(callback){};


//finds a specific user profile
exports.getUser = function(user, callback){};

exports.addUser = function(data, callback){
  var user = new User({
    username: data.username, 
    email: data.email,
    password: data.password,
    googlelogin: data.googlelogin
  })
};