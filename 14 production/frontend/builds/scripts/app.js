'use strict';

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
