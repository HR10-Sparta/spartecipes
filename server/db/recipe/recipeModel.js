var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
  title: String,
  href: String,
  ingredients : Array,
  imageURL: String 
});


module.exports = mongoose.model('Recipe', recipeSchema);

