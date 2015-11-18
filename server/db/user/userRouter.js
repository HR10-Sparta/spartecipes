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

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

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
          res.status(200).json({
            status: 'you are in bro'
          });
        }
        console.log(user);
      })(req, res, next);
    });

  app.route('/logout')
    .get(function(req, res, next) {
      req.logout();
      res.status(200).json({
        status: 'bye'
      });
      console.log(req.user);
    });
};
