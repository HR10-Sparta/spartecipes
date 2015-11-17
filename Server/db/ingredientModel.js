var Ingredient = require('./ingredientModel.js');

var ingredientSchema = new mongoose.Schema({ 
  name: String, 
  quantity: Number, 
  units: String, 
  recipes: Array 
})

module.exports = mongoose.model('Ingredient', ingredientSchema);