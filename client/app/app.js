
angular.module('recipes', [
  'recipes.recipes',
  'recipes.services',
  'recipes.keypress',
  'recipes.search',
  'ui.router',
  'ui.bootstrap'
])
.config(function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/main.html',
      controller: 'HeaderController',
      data: {
        requireLogin: false
      }
    })
    .state('search', {
      //url: '/recipes',
      templateUrl: 'app/recipes/recipes.html',
      data: {
        requireLogin: false
      }
    })
    .state('search.details', {
      url: '/recipes/:recipe',
      templateUrl: 'app/views/partial_recipe-detail.html',
      data: {
        requireLogin: false
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      data: {
        requireLogin: false
      }
      // child state of `app`
      // requireLogin === true
    })
    .state('signup', {
      url: '/signup',
      template: 'app/signup/signup.html',
      controllerUrl: 'SignupController',
      data: {
        requireLogin: false
      }
      // child state of `app`
      // requireLogin === true
    })
    .state('list', {
      url: '/list',
      templateUrl: '/shoppinglist/shoppinglist.html',
      controller: 'ShoppinglistController',
      data: {
        requireLogin: true
      }
    })
    .state('logout', {
      url: '/logout',
      controller: 'LoginController'
    });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
})

// we will use this when we implement jwt
//
.factory('AttachTokens', function ($window) {

  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('spartanShield');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {

  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      if(toState && toState.data.requireLogin && !Auth.isAuth()) {
        $location.path('/');
      }
  });
});
