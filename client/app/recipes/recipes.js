angular.module('recipes.recipes', [])

<<<<<<< HEAD
<<<<<<< HEAD
.controller('HeaderController', function ($scope, Search, $uibModal, ShoppingList) {
  // Your code here
  $scope.data = {};
  angular.extend($scope, Search, ShoppingList);

  $scope.updateList = function(){
    ShoppingList.orderIngredients(function (newList){
      $scope.data.ingredients = newList;
    })
  }
  
=======
.controller('HeaderController', function ($scope, $rootScope, Search, $uibModal) {
=======
.controller('HeaderController', function ($scope, $rootScope, Search, $uibModal, ShoppingList) {

>>>>>>> feat/ViewListAside
  // Your code here
  $scope.data = {};
  angular.extend($scope, Search);

  $scope.changeState = function (state) {
    $state.go(state);
  };

<<<<<<< HEAD
>>>>>>> 24d54f621963e653b6dd44b8bea3017ce04ece31
=======
  angular.extend($scope, Search, ShoppingList);

  $scope.updateList = function(){
    ShoppingList.orderIngredients(function (newList){
      $scope.data.ingredients = newList;
    });
  };
  
>>>>>>> feat/ViewListAside
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
    ShoppingList.addToList(item, ShoppingList.orderIngredients);
    //$scope.updateList();
  };
});
