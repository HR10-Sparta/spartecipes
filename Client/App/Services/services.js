// var module =angular.module('recipe.services', [])

// .factory('Search', function ($http) {
//   // function will retreive recipes based off the search criteria 
//   var getRecipes = function(searchList, cb){
//     return $http({
//       method:'GET',
//       //TODO: get url from server
//       url: "http://api.yummly.com/v1/api/recipes?_app_id=886e5d3d&_app_key=60388a44a6049283ac4d260ecbb0cf24&q=soup"
//       data: searchList
//     })
//     .then(function(resp){
//       cb(resp.data) 
//     });
//   }
//   return {
//     getRecipes: getRecipes
//   }

// });