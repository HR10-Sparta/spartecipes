angular.module('recipes.search', [])
  .directive('search', ['$rootScope', '$state', function($rootScope, $state) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/directives/search/search.html',
      controller: 'SearchCtrl',
      link: function(scope, el, attr) {

        $rootScope.search = true;
        var searchbar = el.find('#searchtext');

        scope.$on('keypress', function(onEvent, keypressEvent) {
          if ($rootScope.search) {

            // On escape
            if (keypressEvent.which === 27) {
              searchbar.val('').blur();
              el.fadeOut(200);
              // On enter
            } else if (keypressEvent.which === 13) {
              $rootScope.$broadcast('search', searchbar.val());
              $state.go('search');
              searchbar.val('').blur();
              el.fadeOut(200);

            } else {
              if(!el.is(':visible')){
                searchbar.val(String.fromCharCode(keypressEvent.which));
              }
              scope.key = String.fromCharCode(keypressEvent.which);
              searchbar.focus();
              el.fadeIn(200);
            }
          }
        });
      }
    };
  }])
  .controller('SearchCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.searching = false;
    $rootScope.$on('search', function(e, search){
      console.log(search);
    });
  }]);
