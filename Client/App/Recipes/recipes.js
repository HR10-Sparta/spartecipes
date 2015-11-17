angular.module('recipes', [])

.controller('DisplayController', function ($scope, Search, $uibModal) {
  // Your code here
  $scope.data = {}
  angular.extend($scope, Search);
  
  $scope.getRecipes().then(function(recipes){
    $scope.data.recipes = recipes;
    console.log(recipes);
    });
    //need to know format data is coming back in

  Search.getRecipes('stuff', $scope.displayData);

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
          return $scope.recipe
        }
      }
  });
}
})
.controller('RecipeInstanceCtrl', function ($scope, $uibModalInstance, recipe, ShoppingList) {

  $scope.recipe = recipe

  $scope.no = function(){
    $uibModalInstance.close();
  }

  $scope.ok = function () {
    $uibModalInstance.close();
    ShoppingList.addToList(recipe);
    
  };

});
