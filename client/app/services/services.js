
angular.module('recipes.services', [])


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

})
.factory('Auth', function ($http, $location, $window) {

  var login = function (user) {
    console.log(user);
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: user
    })
    .then(function (resp) {
      return resp;
    });
  };

  var signup = function (user) {
    console.log(user);
    return $http({
      method: 'POST',
      url: '/api/users/register',
      data: user
    })
    .then(function (resp) {
      return resp;
    });
  };

  var googleAuth = function (user) {
    return $http({
      method: 'GET',
      url: '/auth/google'
    })
    .then(function (resp) {
      console.log(resp);
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('spartanShield');
  };

  var logout = function () {
    $window.localStorage.removeItem('spartanShield');
    $location.path('/');
  };

  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    logout: logout,
    googleAuth: googleAuth
  };
})
.factory('State', function ($stateProvider, $scope) {
   $scope.changeState = function (state) {
    $state.go(state);
  };
});
