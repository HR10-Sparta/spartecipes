var module =angular.module('recipe.services', [])

.factory('Search', function ($http) {
  // function will retreive recipes based off the search criteria
  var getRecipes = function(searchCriteria){
    return $http({
      method:'GET',
      url: "http://api.bigoven.com/recipes?any_kw=" + searchCriteria + "&pg=1&rpp=100&api_key=8hUGXs4S34zTaDWaG1CMMmjfB9I3M944"
    })
    .then(function(resp){
      return resp.data.Results;
    });
  };

  var getSingleRecipe = function(recipeID){
    return $http({
      method:'GET',
      url: "http://api.bigoven.com/recipe/{id}&api_key=8hUGXs4S34zTaDWaG1CMMmjfB9I3M944"
    })
    .then(function(resp){
      return resp.data.Results;
    });
  };
  return {
    getRecipes: getRecipes,
    getSingleRecipe: getSingleRecipe
  };

})

.factory('ShoppingList', function(){
  var list = [];

  var addToList = function(recipe){
    list.push(recipe);
  };

  return {
    list: list,
    addToList: addToList
  };

});