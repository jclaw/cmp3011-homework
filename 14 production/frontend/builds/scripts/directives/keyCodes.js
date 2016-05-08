'use strict';

$.each([
	{name: 'enterKey', num: 13},
	{name: 'spaceKey', num: 32}
], function(index, keyObj) {
	angular.module("earApp")
	.directive(keyObj.name, function(keyCodeHelper) {
		return function(scope, element, attrs) {
			keyCodeHelper.onKey(keyObj, scope, element, attrs);
		};
	})
})
