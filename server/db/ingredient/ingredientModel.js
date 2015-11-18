var Ingredient = require('./ingredientModel.js');

var ingredientSchema = new mongoose.Schema({ 
  name: String, 
  quantity: String, 
  purchased: Boolean,
  recipes: Array // reference to every recipe name or ID that uses that ingredient
})

module.exports = mongoose.model('Ingredient', ingredientSchema);