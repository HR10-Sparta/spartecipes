var module = angular.module('recipe.services', [])

.factory('Search', function($http) {
  var currentRecipe;
  // function will retreive recipes based off the search criteria
  var getRecipes = function(searchCriteria) {
    return $http({
        method: 'GET',
        url: '/api/recipes/search/' + searchCriteria,
      })
      .then(function(data) {
        return data.data.Results;
      });
  };

  var getSingleRecipe = function(recipeID) {
    return $http({
        method: 'GET',
        url: '/api/recipes/' + recipeID,
      })
      .then(function(data) {
        return data.data;
      });
  };

  return {
    currentRecipe: currentRecipe,
    getRecipes: getRecipes,
    getSingleRecipe: getSingleRecipe
  };

})

.factory('ShoppingList', function() {
  var list = [];
  var ingredientList = {};

<<<<<<< HEAD
  var addToList = function(recipe) {
=======
  var addFrac = function(frac1, frac2){
    console.log(Number(frac1));
    console.log(Number(frac1) + Number(frac2));
    if (frac1.length > 2 && frac2.length > 2)
      if(frac1[2] === frac2[2]){
        newTop = Number(frac1[0]) + Number(frac2[0]);
        return newTop + '/' + frac[2]
    }
  }
  var addToList = function(recipe, cb){
>>>>>>> feat/ViewListAside
    list.push(recipe);
    cb(list)
  };

  var removeFromList = function(id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].RecipeID === id) {
        list.splice(i, 1);
        orderIngredients(list);
      }
    }
  };

  var recipeInList = function(id) {
    console.log(id);
    for (var i = 0; i < list.length; i++) {
      if (list[i].RecipeID === id) {
        console.log("is in list");
        return true;
      }
    }
    console.log("not in list");
    return false;
  };

  var orderIngredients = function(list){ 
    for (var key in ingredientList){
      delete ingredientList[key];
    } 

    for (var i = 0; i < list.length; i++){
      var temp = list[i].Ingredients;
      for (var x = 0; x < temp.length; x++){
        if (!ingredientList.hasOwnProperty(temp[x].Name)){
          ingredientList[temp[x].Name] = [temp[x].DisplayQuantity, temp[x].Unit];
        }
        else {
          if (ingredientList[temp[x].Name][0][1] === "/") { 
            ingredientList[temp[x].Name][0] = addFrac(ingredientList[temp[x].Name][0], temp[x].DisplayQuantity);
          } else if (temp[x].DisplayQuantity[1] === "/") {
            ingredientList[temp[x].Name][0] = addFrac(temp[x].DisplayQuantity, ingredientList[temp[x].Name][0]);  
          } else {
            ingredientList[temp[x].Name][0] = Number(ingredientList[temp[x].Name][0]) + Number(temp[x].DisplayQuantity);   
          }
        }
      }
    }
  };

  return {
    recipeInList: recipeInList,
    list: list,
    removeFromList: removeFromList,
    addToList: addToList,
    ingredientList: ingredientList,
    orderIngredients: orderIngredients
  };

});
