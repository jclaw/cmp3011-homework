'use strict';

angular.module('earApp')
.service('keyCodeHelper', function($document, $location) {

	this.onKey = function(keyObj, scope, element, attrs) {
		$document.bind("keydown keypress", function(event) {
			var keyCode = event.which || event.keyCode;

			// If space key is pressed
			if (keyCode === keyObj.num) {
				scope.$apply(function() {
					// Evaluate the expression
					if (attrs[keyObj.name]) {
						if (attrs[keyObj.name] == 'ng-click' && attrs.ngClick) {
							scope.$eval(attrs.ngClick);
						} else {
							scope.$eval(attrs[keyObj.name]);
						}
					} else if (attrs.href){
						var path = attrs.href.split('#');
						$location.path(path[1]);
					}
				});

				event.preventDefault();
			}
		});
	}

});
