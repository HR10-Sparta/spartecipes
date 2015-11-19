var request = require('request');

module.exports = function(app){
	app.route('/search/:query')
		.get(function(req, res, next){
			res.send(req.params.query + '\n');
		});

	app.route('/:recipeId')
		.get(function(req, res, next){
			// req.params.recipeId
		});

	app.route('/params/:recipeId')
		.get(function(req, res, next){
			// req.params.recipeId
		});
};