var mongoose = require('mongoose');

var usesrSchema = new.mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googlelogin: String
})


module.exports = mongoose.model('User', userSchema);