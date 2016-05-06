'use strict';

angular.module("earApp")
.directive('enterKey', function($document, $location) {
	return function(scope, element, attrs) {

		$document.bind("keydown keypress", function(event) {
			var keyCode = event.which || event.keyCode;

			// If enter key is pressed
			if (keyCode === 13) {
				scope.$apply(function() {
					// Evaluate the expression
					if (attrs.enterKey) {
						scope.$eval(attrs.enterKey);
					} else if (attrs.href){
						var path = attrs.href.split('#');
						$location.path(path[1]);
					}
				});

				event.preventDefault();
			}
		});
	};
});
