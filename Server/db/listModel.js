<<<<<<< HEAD
var mongoose = require('mongoose');

var listSchema = new.mongoose.Schema({
  name: String, 
  ingredients: Array, // array of ingredient objects
  recipes: Array // array of recipe objects
})


module.exports = mongoose.model('List', listSchema);
=======
listModel.js
>>>>>>> 85f376446dc3d2367f84ac574c5f6fe5b37985f9
