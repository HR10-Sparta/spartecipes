var morgan = require('morgan'),
		bodyParser = require('body-parser'),
		helpers = require('./helpers');

module.exports = function(app, express){

	/**
	 * Set up Routers
	 * @type {[type]}
	 */
	var userRouter = express.Router();

	/**
	 * Set Up Middleware
	 */
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  /**
   * Serve up Static Files
   */
  app.use(express.static(__dirname + '/../../client'));

  /**
   * Funnel all '/api/users' requests to the userRouter
   */
  app.use('/api/users', userRouter);

  /**
   * Set up Error Handling
   */
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  /**
   * Set up userRouter
   */
  require('../db/userRouter.js')(userRouter);
};






