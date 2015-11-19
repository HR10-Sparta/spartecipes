angular.module('recipes')

.factory('Search', function($http) {
  var currentRecipe;
  // function will retreive recipes based off the search criteria
  var getRecipes = function(searchCriteria) {
    return $http({
        method: 'GET',
        url: '/api/recipes/search/' + searchCriteria,
      })
      .then(function(data) {
        return data.data.Results;
      });
  };

  var getSingleRecipe = function(recipeID) {
    return $http({
        method: 'GET',
        url: '/api/recipes/' + recipeID,
      })
      .then(function(data) {
        return data.data;
      });
  };

  return {
    currentRecipe: currentRecipe,
    getRecipes: getRecipes,
    getSingleRecipe: getSingleRecipe
  };

})

.factory('ShoppingList', function() {
  var list = [];

  var addToList = function(recipe) {
    list.push(recipe);
    console.log(list);
  };

  return {
    list: list,
    addToList: addToList
  };

});
