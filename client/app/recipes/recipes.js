angular.module('recipes', ['recipe.services'])


.controller('HeaderController', function ($scope, Search) {
  // Your code here
  $scope.data = {};
  //$scope.data.recipes = [];
  angular.extend($scope, Search);
  
  $scope.retrieveRecipes = function (data) {
    console.log("hello there");
    Search.getRecipes(data).then(function (recipes) {
      $scope.data.recipes = recipes;
      console.log(recipes);
    });
  };

    

  //Search.getRecipes('stuff', $scope.displayData);

  $scope.open = function (recipe) {
    $scope.recipe = recipe;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'RecipeContent.html',
      controller: 'RecipeInstanceCtrl',
      task: task,
      cat: cat,
      resolve: {
        items: function () {
          return $scope.recipe;
        }
      }
  });
};
})
.controller('RecipeInstanceCtrl', function ($scope, $uibModalInstance, recipe, ShoppingList) {

  $scope.recipe = recipe;

  $scope.no = function(){
    $uibModalInstance.close();
  };



  $scope.ok = function() {
    $uibModalInstance.close();
    ShoppingList.addToList(recipe);

    };

  });
