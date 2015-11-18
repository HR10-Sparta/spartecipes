var User = require('./userModel');

/**
 * Routes for User Models on the DB
 * Handles all routes: '/api/users'
 */
module.exports = function(app, passport) {

  app.route('/register')
    .post(function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) {
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

  // Handles Local Login Strategy
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

};
