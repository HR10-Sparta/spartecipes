angular.module('recipes', [
  'recipes.services',
  'recipes.links',
  'recipes.search',
  'recipes.login',
  'recipes.signup',
  'ui-router',
  'ui.bootstrap'
])
.config(function($routeProvider,  $httpProvider, $locationProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('main', {
      url: '/',
      template: 'app/views/partial_main.html',
      controller: 'SearchController',
      data: {
        requireLogin: false
      }
    })
    .state('recipes', {
      url: '/recipes',
      template: 'app/views/partial_recipes.html',
      data: {
        requireLogin: false
      }
    })
    .state('recipes.details', {
      url: '/recipes/:recipe',
      template: 'app/views/partial_recipe-detail.html'
      data: {
        requireLogin: false
      }
    })
    .state('login', {
      url: '/login',
      template: 'app/login/login.html',
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
      controller: 'SignupController',
      data: {
        requireLogin: false
      }
      // child state of `app`
      // requireLogin === true
    })
    .state('list', {
      url: '/list',
      template: '/shoppinglist/shoppinglist.html',
      controller: 'ShoppinglistController',
      data: {
        requireLogin: true
      }
    })
    .state('logout', {
      url: '/logout',
      controller: 'LoginController'
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
});
// .run(function ($rootScope, $location, Auth) {

//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });
