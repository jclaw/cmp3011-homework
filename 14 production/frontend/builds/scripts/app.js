'use strict';

var app = angular
.module('earApp', [
	'ngRoute',
	'LocalStorageModule'
]);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/player.html'
  })
  .when('/results', {
	templateUrl: 'views/results.html'
  })
})

// var app = angular
// .module('earApp', [
// 	// 'ngAnimate',
// 	// 'ngAria',
// 	// 'ngCookies',
// 	// 'ngResource',
// 	'ngRoute'
// 	// 'ngSanitize',
// 	// 'ngTouch'
// ]);
//
// app.config(function ($routeProvider) {
// 	$routeProvider
// 	.when('/', {
// 		templateUrl: 'views/player.html'
// 	})
// 	.when('/level', {
// 		templateUrl: 'views/player.html'
// 	})
// 	.otherwise({
// 		redirectTo: '/'
// 	})
// })
