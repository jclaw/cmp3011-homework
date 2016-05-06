'use strict';

angular.module("earApp")
.directive('confirmOnExit', function() {
        return {
            link: function($scope, elem, attrs) {
                window.onbeforeunload = function(){
					return "Are you sure you want to quit? All progress in this session will be lost.";
                }
                $scope.$on('$stateChangeStart', function(event, next, current) {
					if(!confirm("Are you sure you want to quit? All progress in this session will be lost.")) {
						event.preventDefault();
					}
                });
            }
        };
    });
