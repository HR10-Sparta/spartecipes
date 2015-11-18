var User = require('./userModel');
var UserController = require('./userController');

/**
 * Routes for User Models on the DB
 * Handles all routes: '/api/users'
 * 
 * All Passport Strategies are in server/config/passport.js
 */
module.exports = function(app, passport) {

  app.route('/recipes')
    .post(function(req, res, next){
      UserController.addRecipe({user: req.body.user, recipe: req.body.recipe}, function(err, res){
        if (err){
          console.error('Unable to add recipe');
        }
      });
    });


  // Handles Registration for a new user using passport local strategy
  // Successful registration sends back DB user object into authenticate callback function
  app.route('/register')
    .post(function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) {
        // Signup error
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        // No user returned
        if (!user) {
          return res.status(401).json({
            err: info
          });
        }
        // Successfully registers new user
        // Log them in
        req.logIn(user, function(err) {
          if (err) {
            return res.status(500).json({
              err: 'Could not log in user'
            });
          }
          res.status(200).json({
            status: 'Login successful!'
          });
        });
      })(req, res, next);
    });

  // Handles Local Login Strategy for Returning Users
  app.route('/login')
    .post(function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        if (!user) {
          return res.status(401).json({
            err: info
          });
        }
        req.logIn(user, function(err) {
          if (err) {
            return res.status(500).json({
              err: 'Could not log in user'
            });
          }
          res.status(200).json({
            status: 'Login successful!'
          });
        });
      })(req, res, next);
    });

  // Initial Route for google Login
  // Will redirect users to a google Auth page asking for access to the things in the scope array
  // Saves new user to DB if successful
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // Route called when google successfully authorizes user
  // Successful registration sends back DB user object into authenticate callback function
  app.route('/auth/google/callback')
    .get(function(req, res, next) {
      passport.authenticate('google', function(err, user, info) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        if (!user) {
          return res.status(401).json({
            err: info
          });
        }
        if (user) {
          req.login(user, function(err) {
            res.status(200).json({
              status: 'you are in bro'
            });
          });
        }
      })(req, res, next);
    });

  // Logout User
  app.route('/logout')
    .get(function(req, res, next) {
      req.logout();
      res.status(200).json({
        status: 'bye'
      });
    });
};
