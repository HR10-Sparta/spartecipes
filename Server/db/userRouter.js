var userController = require('./userController');

/**
 * Routes for User Models on the DB
 * Handles all routes: '/api/users'
 */
module.exports = function(app, passport) {

  // Handles Local Login Strategy
  app.route('/login')
  	.post(function(req, res, next){
  		passport.authenticate('local-login', function(err, user, info){
  			if(err){
  				return res.status(500).json({err:err});
  			}
  			if(!user){
  				return res.status(401).json({err: info});
  			}
  			req.logIn(user, function(err){
  				if(err){
  					return res.status(500).json({err: 'Could not log in.'});
  				}
  				res.status(200).json({status: 'Login Successful!'});
  			});
  		})(req, res, next);
  	});

  // Handles Local Signup Strategy
  app.route('/signup')
  	.post(function(req, res, next){
  		passport.authenticate('local-signup', function(err, user, info){

  		});
  	});
};
