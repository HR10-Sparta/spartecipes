'use strict';

angular.module('test').controller('TestController', ['$scope', 'Global', 'Test',
  function($scope, Global, Test) {
    $scope.global = Global;
    $scope.package = {
      name: 'test'
    };
  }
]);
