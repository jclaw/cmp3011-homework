'use strict';

angular.module("earApp")
.directive('hoverClass', function() {
	return function(scope, element, attrs) {
		element.bind('mouseenter', function(e) {
			element.addClass('hover');
		});
		element.bind('mouseleave', function(e) {
			element.removeClass('hover');
		});

	};
});
