var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
  name: String, 
  ingredients: Array, // array of ingredient objects
  recipes: Array // array of recipe objects
});


module.exports = mongoose.model('List', listSchema);

