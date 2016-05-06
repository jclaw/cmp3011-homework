'use strict';

angular.module("earApp")
.directive('enterKey', function($document) {
	return function(scope, element, attrs) {

		$document.bind("keydown keypress", function(event) {
			var keyCode = event.which || event.keyCode;

			// If enter key is pressed
			if (keyCode === 13) {
				scope.$apply(function() {
					// Evaluate the expression
					scope.$eval(attrs.enterKey);
				});

				event.preventDefault();
			}
		});
	};
});
