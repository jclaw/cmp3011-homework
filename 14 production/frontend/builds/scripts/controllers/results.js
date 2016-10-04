'use strict';

angular.module('earApp')
.controller('ResultsCtrl', function($scope, keyboardConfig, localStorageService) {

	var localStorageKey = 'gameData';
	$scope.grade = 0;

	$scope.init = function() {
		loadSavedData();
		calculateGrade();
	}

	function calculateGrade() {
		var numLevels = $scope.numberlines.length;
		var kbdMinMax = keyboardConfig.getRange();
		var kbdRange = kbdMinMax[1].midi - kbdMinMax[0].midi;

		$scope.maxGrade = numLevels * kbdRange;
		$scope.grade = $scope.maxGrade;
		$.each($scope.numberlines, function(i, line) {
			if (line.length == 0) { // skipped level
				$scope.grade -= $scope.maxGrade * .1; // minus 10%
			}
			else {
				var result = $.grep(line, function(el){ return el.type == 'correct'; });
				var correctNote = result[0].midi;

				$.each(line, function(j, el) {
					$scope.grade -= Math.abs(correctNote - el.midi) / 2;
				});
			}
		});
	}

	function loadSavedData() {
		var savedData = localStorageService.get(localStorageKey);
		if (savedData) {
			$scope.numberlines = savedData;
		} else {
			alert('error!');
		}
	}

	function deleteSavedData() {
		localStorageService.remove(localStorageKey);
		$scope.numberlines = [[]];
	}
});
