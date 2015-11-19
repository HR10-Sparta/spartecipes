
angular.module('recipes', [
  'recipes.services',
  'ui.router',
  'ui.bootstrap'
])
.config(function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  //$stateProvider
    // .state('welcome', {
    //   url: '/',
    //   template: 'app/search/search.html',
    //   controller: 'SearchController',
    //   data: {
    //     requireLogin: false
    //   }
    // })
    // .state('recipes', {
    //   url: '/recipes',
    //   template: 'app/recipes/recipes.html'
    // })
        requireLogin: false
      }
    })
    // .state('recipes.details', {
      url: '/recipes/:recipe',
      template: 'app/views/partial_recipe-detail.html',
    //   data: {
    //     requireLogin: false
    //   }
    // })
    // .state('login', {
    //   url: '/login',
    //   template: 'app/login/login.html',
    //   controller: 'LoginController',
    //   data: {
    //     requireLogin: false
    //   }
    //   // child state of `app`
    //   // requireLogin === true
    // })
    // .state('signup', {
    //   url: '/signup',
    //   template: 'app/signup/signup.html',
    //   controller: 'SignupController',
    //   data: {
    //     requireLogin: false
    //   }
    //   // child state of `app`
    //   // requireLogin === true
    // })
    // .state('list', {
    //   url: '/list',
    //   template: '/shoppinglist/shoppinglist.html',
    //   controller: 'ShoppinglistController',
    //   data: {
    //     requireLogin: true
    //   }
    // })
    // .state('logout', {
    //   url: '/logout',
    //   controller: 'LoginController'
    // });
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
.run(function ($rootScope, $location, Auth) {

//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });

$rootScope.$on('$stateChangeStart',
  function(event, toState, toParams, fromState, fromParams){
    if(toState && toState.data.requireLogin && !Auth.isAuth()) {
      $location.path('/');
    }
})
});
