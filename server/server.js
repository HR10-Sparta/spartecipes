var express  = require('express');
var mongoose = require('mongoose');

var app = express();

// mongoose connection?
//mongoose.connect('mongodb://localhost/spartans');
var port = process.env.PORT || 8000;

/**
 * Set up Middleware
 */
require('./config/middleware.js')(app, express);

app.listen(port);
console.log('Making digital magic on port ' + port);
// Export app for index.js
module.exports = app;