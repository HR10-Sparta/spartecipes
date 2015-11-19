angular.module('recipes')
  .directive('login', [function() {
    return {
      restrict: 'EA',
      template: '<a href="#" ng-click="open()">Login</a>',
      controller: 'LoginDirectiveCtrl'
    };
  }])
  .directive('logout', [function() {
    return {
      restrict: 'EA',
      template: '<a href="#" ng-click="logout()">Logout</a>',
      controller: 'LoginDirectiveCtrl'
    };
  }])
  .controller('LoginDirectiveCtrl', ['$scope', '$rootScope', '$uibModal', 'Auth', function($scope, $rootScope, $uibModal, Auth) {

    $scope.open = function() {
      $rootScope.search = false;
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/directives/login/login.html',
        controller: 'LoginInstanceCtrl',
      });
    };

    $scope.logout = function() {
      Auth.logout();
    };

  }])
  .controller('LoginInstanceCtrl', ['$scope', '$rootScope', '$uibModalInstance', '$window', 'Auth', function($scope, $rootScope, $uibModalInstance, $window, Auth) {

    $scope.user = {};

    $scope.close = function() {
      $uibModalInstance.close();
      $rootScope.search = true;
    };

    $scope.login = function() {
      Auth.login($scope.user)
        .then(function(resp) {
          if (resp.data.token) {
            $window.localStorage.setItem('spartanShield', resp.data.token);
            $scope.close();
          } else {
            if (resp.data.err) {
              $scope.message = resp.data.err;
            }
          }
        });
    };

    $scope.signup = function() {
      Auth.signup($scope.user)
        .then(function(resp) {
          if (resp.data.token) {
            $window.localStorage.setItem('spartanShield', resp.data.token);
            $scope.close();
          } else {
            if (resp.data.err) {
              $scope.message = resp.data.err;
            }
          }
        });
    };
  }]);
