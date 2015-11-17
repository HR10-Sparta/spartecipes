  var morgan       = require('morgan');
  var bodyParser   = require('body-parser');
  var passport     = require('passport');
  var flash        = require('connect-flash');
  var morgan       = require('morgan');
  var cookieParser = require('cookieParser');
  var session      = require('express-session'); 
  var helpers      = require('./helpers');

module.exports = function(app, express){

	/**
	 * Set up Routers
	 */
	var userRouter = express.Router();

  /**
   * Set up Passport
   */
  require('./passport')(passport);

	/**
	 * Set Up Middleware
	 */
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(bodyParser());

  /**
   * Set up Passport Auth dependencies
   */
  app.use(session({secret: 'thisissparta'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  /**
   * Serve up Static Files
   */
  app.use(express.static(__dirname + '/../../client'));

  /**
   * Funnel all '/api/users' requests to the userRouter
   */
  app.use('/api/users', userRouter);
  
  /**
   * Set up userRouter
   */
  require('../db/userRouter.js')(userRouter);

  /**
   * Set up Error Handling
   */
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

};






