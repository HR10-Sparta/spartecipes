
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

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
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

  var signout = function () {
    $window.localStorage.removeItem('spartanShield');
    $location.path('/');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    googleAuth: googleAuth
  };
})
.factory('State', function ($stateProvider, $scope) {
   $scope.changeState = function (state) {
    $state.go(state);
  };
});
