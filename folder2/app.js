// Code goes here

var app = angular
.module('earApp', [
	'ngRoute'
]);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/player.html'
  })
})

// var controllers = {};
// controllers.testController = function($scope){
//    $scope.first = "Info";
//     $scope.customers=[
//         {name:'jerry',city:'chicago'},
//         {name:'tom',city:'houston'},
//         {name:'enslo',city:'taipei'}
//     ];
// }
//
// demo.controller(controllers)
