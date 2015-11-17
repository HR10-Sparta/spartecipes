<<<<<<< HEAD
// var root = new Firebase("https://.....firbaseio.com");
// var recipeRef = new Firebase("https://.....firbaseio.com/recipes");
// var userRef = new Firebase("https://.....firbaseio.com/users");
// var listRef = new Firebase("https://.....firbaseio.com/lists");

var mongoose = require('mongoose');

// sets db location to Heroku Mongolab uri or local host
var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/spartecipes';
mongoose.connect(dbUri);

var db = mongoose.connection;

// db connection and error logging
db.once('open', function() {
  console.log('Connection established with MongoDB at: ' + dbUri);
});
db.on('error', console.error.bind(console, 'Connection error: unable to establish connection with MongoDB at: ' + dbUri));
db.on('diconnected', mongoose.connect);

module.exports = db;
=======
var root = new Firebase("https://.....firbaseio.com");
var recipeRef = new Firebase("https://.....firbaseio.com/recipes");
var userRef = new Firebase("https://.....firbaseio.com/users");
var listRef = new Firebase("https://.....firbaseio.com/lists");
>>>>>>> 85f376446dc3d2367f84ac574c5f6fe5b37985f9
