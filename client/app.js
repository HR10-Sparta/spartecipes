angular.module('recipes', [
  'recipes.services',
  'recipes.links',
  'recipes.shorten',
  'recipes.auth',
  'ngRoute',
  'ui.bootstrap'
])
.config(function($routeProvider,  $httpProvider, $locationProvider, $stateProvider) {
  $stateProvider
    .state('welcome', {
      url: '/',
      // ...
      data: {
        requireLogin: false
      }
    })
    .state('app', {
      abstract: true,
      // ...
      data: {
        requireLogin: true // this property will apply to all children of 'app'
      }
    })
    .state('app.dashboard', {
      // child state of `app`
      // requireLogin === true
    })


// .config(function($routeProvider,  $httpProvider, $locationProvider) {
//   $routeProvider
//     .when('/login', {
//       templateUrl: 'app/login/login.html',
//       controller: 'LoginController'
//     })
//     .when('/signup', {
//       templateUrl: 'app/signup/signup.html',
//       controller: 'SignupController'
//     })
//     .when('/recipes/:recipes', {
//       // will use $routeParameter.recipes for look up
//       templateUrl: 'app/recipes/recipes.html',
//       controller: 'RecipesController',
//       authenticate: true
//     })
//     .when('/list', {
//       templateUrl: 'app/list/list.html',
//       controller: 'ListController',
//       authenticate: true
//     })
//     .when('/myrecipes', {
//       templateUrl: 'app/myrecipes/myrecipes.html',
//       controller: 'MyrecipesController',
//       authenticate: true
//     })
//     .otherwise({
//       redirectTo: '/'
//     });
//     // $httpProvider.interceptors.push('AttachTokens');
//     $locationProvider.html5Mode({
//       enabled: true,
//       requireBase: false
//   });
});

// we will use this when we implement jwt
//
// .factory('AttachTokens', function ($window) {

//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.shortly');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
// .run(function ($rootScope, $location, Auth) {

//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });
