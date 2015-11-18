var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
  local            : {
    username: String,
    email: String,
    password: String
  },
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },

  shoppingList: Array, // array of ingredient objects?
  recipeCollection: Array // array of recipe names
});


module.exports = mongoose.model('User', userSchema);