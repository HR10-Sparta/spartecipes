var mongoose = require('mongoose');

var listSchema = new.mongoose.Schema({
  name: String, 
  ingredients: Array
})


module.exports = mongoose.model('List', listSchema);