angular.module('recipes.recipes', [])




.controller('HeaderController', function ($scope, $rootScope, Search, $uibModal, ShoppingList, Auth) {

  // Your code here
  $scope.data = {};
  angular.extend($scope, Search, ShoppingList);

  $scope.changeState = function (state) {
    $state.go(state);
  };

  $scope.isAuth = function () {
    return Auth.isAuth();
  };

  $scope.updateList = function(){
    ShoppingList.orderIngredients(function (newList){
      $scope.data.ingredients = newList;
    });
  };

  $scope.retrieveRecipes = function (data) {
    console.log("getting called");
    Search.getRecipes(data).then(function (recipes) {
      $scope.data.recipes = recipes;
    });
  };

  $rootScope.$on('search', function(e, search){
    $scope.retrieveRecipes(search);
  });

  $scope.open = function (recipeID) {
    Search.getSingleRecipe(recipeID).then(function (recipe){
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/recipes/RecipeContent.html',
        controller: 'RecipeInstanceCtrl',
        resolve: {
          item: function () {
            return recipe;
          }
        }
      });
     });
  };
})

.controller('RecipeInstanceCtrl', function ($scope, $uibModalInstance, Search, item, ShoppingList) {

   angular.extend($scope, Search);
   $scope.currentRecipe = item;
   console.log($scope.currentRecipe);

   $scope.no = function(){
     $uibModalInstance.close();
   };

  $scope.ok = function () {
    $uibModalInstance.close();
    ShoppingList.addToList(item, ShoppingList.orderIngredients);
    //$scope.updateList();
  };
});
