'use strict';

angular.module('test').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('test example page', {
      url: '/test/example',
      templateUrl: 'client/views/index.html'
    });
  }
]);
