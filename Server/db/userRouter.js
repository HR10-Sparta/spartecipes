var userController = require('./userController');

/**
 * Routes for User Models on the DB
 * Handles all routes: '/api/users'
 */
module.exports = function(app){

	app.get('/logout', function(req, res, next){
		req.logout()
		res.send(200);
	});
};