var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
  name: String,
  href: String
});


module.exports = mongoose.model('Recipe', recipeSchema);

