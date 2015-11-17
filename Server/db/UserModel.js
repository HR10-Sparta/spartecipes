var mongoose = require('mongoose');

<<<<<<< HEAD
var userSchema = new.mongoose.Schema({
  local            : {
    email        : String,
    password     : String,
  },
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },

  shoppingList: Array, // array of ingredient objects?
  recipeCollection: Array // array of recipe names
=======
var usesrSchema = new.mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googlelogin: String
>>>>>>> 85f376446dc3d2367f84ac574c5f6fe5b37985f9
})


module.exports = mongoose.model('User', userSchema);