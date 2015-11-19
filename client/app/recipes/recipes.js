angular.module('recipes.recipes', [])

.controller('HeaderController', function ($scope, $rootScope, Search, $uibModal, ShoppingList) {

  // Your code here
  $scope.data = {};
<<<<<<< 24d54f621963e653b6dd44b8bea3017ce04ece31
  angular.extend($scope, Search);

  $scope.changeState = function (state) {
    $state.go(state);
  };

=======
  angular.extend($scope, Search, ShoppingList);

  $scope.updateList = function(){
    ShoppingList.orderIngredients(function (newList){
      $scope.data.ingredients = newList;
    });
  };
  
>>>>>>> (feat)Added sidebar for viewing ingredients and recipe list
  $scope.retrieveRecipes = function (data) {
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
<<<<<<< 24d54f621963e653b6dd44b8bea3017ce04ece31
    ShoppingList.addToList(item);

=======
    ShoppingList.addToList(item, ShoppingList.orderIngredients);
    //$scope.updateList();
    
>>>>>>> (feat)Added sidebar for viewing ingredients and recipe list
  };

});
