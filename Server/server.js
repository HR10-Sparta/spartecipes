var express = require('express');

var app = express();

var port = process.env.PORT || 8000;

// mongoose connection?

/**
 * Set up Middleware
 */
require('./config/middleware.js')(app, express);

app.listen(port);

console.log('Making digital magic on port ' + port);