'use strict';

angular.module('earApp')
.directive('keyCode', function($document) {
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$document.bind("keypress", function(event) {
				var keyCode = event.which || event.keyCode;

				if (keyCode == $attrs.code) {
					$scope.$apply(function() {
						$scope.$eval($attrs.keyCode, {$event: event});
					});

				}
			});
		}
	};
});
