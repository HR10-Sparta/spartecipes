var User = require('./userModel.js');

//return an array of all User profiles as JSON objects

exports.getAllUsers = function(callback){
  User.find({}, function(err, users) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('sending user information');
    callback(users);
  });
};



//finds a specific user profile
exports.findUser = function(user, callback){
  User.findOne({ 'local.email' : user}, function(err, profile){
    if (err) {
      console.error(err);
      return;
    } else {
      callback(profile);
    } 
  });
};




exports.addUser = function(data, callback){
  var user = new User({

   local:            {
      username: data.username,
      email: data.email,
      password: data.password
    },
    google :         {
      id : data.id,
      token : data.token,
      email : data.email,
      name : data.name
    },
    username: data.name,
    shoppingList: data.list,
    recipeCollection: data.recipes

  });


  user.save(function(err){
    if (err){
      console.error(err, 'Error on save!');
      return;
    } else {
      console.log('user record created');
      callback();
    }
  });
};
