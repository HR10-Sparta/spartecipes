var userController = require('./userController');

/**
 * Routes for User Models on the DB
 * Handles all routes: '/api/users'
 */
module.exports = function(app) {
  app.route('/')
  	.get(function(req, res){
  		res.send('what up dawg');
  	});
};
