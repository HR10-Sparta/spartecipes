var User = require('./userModel');
var UserController = require('./userController');
var jwt = require('jwt-simple');

/**
 * Routes for User Models on the DB
 * Handles all routes: '/api/users'
 * 
 * All Passport Strategies are in server/config/passport.js
 */
module.exports = function(app, passport) {

  app.route('/recipes')
    .post(function(req, res, next) {
      UserController.updateShoppingList({
        user: req.body.user,
        recipe: req.body.list
      }, function(err, res) {
        if (err) {
          console.error('Unable to update Shopping List');
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
          return res.send({
            token: false,
            err: err
          });
        }
        // No user returned
        if (!user) {
          return res.send({
            token: false,
            err: info
          });
        }
        // Successfully registers new user
        // Log them in
        var token = jwt.encode(user, 'supersecret');
        return res.status(200).send({
          token: token,
          user: user
        });
      })(req, res, next);
    });

  // Handles Local Login Strategy for Returning Users
  app.route('/login')
    .post(function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
        if (err) {
          return res.send({
            token: false,
            err: err
          });
        }
        if (!user) {
          return res.send({
            token: false,
            err: info
          });
        }
        var token = jwt.encode(user, 'supersecret');
        return res.status(200).send({
          token: token,
          user: user
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
          var token = jwt.encode(user, 'supersecret');
          return res.status(200).send({
            token: token,
            user: user
          });
        }
      })(req, res, next);
    });

  app.route('/auth/google/callback')
    .post(function(req, res, next) {
      // checking to see if the user is authenticated
      // grab the token in the header is any
      // then decode the token, which we end up being the user object
      // check to see if that user exists in the database
      var token = req.headers['x-access-token'];
      if (!token) {
        next(new Error('No token'));
      } else {
        var user = jwt.decode(token, 'secret');
        UserController.findUser(user, function(foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        });
      }
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
