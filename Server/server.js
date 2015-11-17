var express  = require('express');
var mongoose = require('mongoose');

var app = express();

// mongoose connection?
mongoose.connect('mongodb://localhost/spartans');

/**
 * Set up Middleware
 */
require('./config/middleware.js')(app, express);

// Export app for index.js
module.exports = app;