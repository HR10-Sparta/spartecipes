angular.module('recipes', [])

.controller('DisplayController', function ($scope, Search) {
  // Your code here
  console.log("hello");
  angular.extend($scope, Search);
  
  $scope.displayData = function(data){
    console.log("hello");
      console.log(data);
    //need to know format data is coming back in
  }
  Search.getRecipes('stuff', $scope.displayData);
})
.factory('Search', function ($http) {
  // function will retreive recipes based off the search criteria 
  var getRecipes = function(searchList, cb){
    return $http({
      method:'GET',
      //TODO: get url from server
      crossDomain: true,
      //url: "http://api.yummly.com/v1/api/recipes?_app_id=886e5d3d&_app_key=60388a44a6049283ac4d260ecbb0cf24&q=soup"
      url: "https://api.edamam.com/search?q=chicken&app_id=d5063256&app_key=8afe98dea10de5cb7dc5baebb0431f08"
      //callback: cb
    })
    .then(function(resp){
      cb(resp.data) 
    });
  }
  return {
    getRecipes: getRecipes
  }
  
});