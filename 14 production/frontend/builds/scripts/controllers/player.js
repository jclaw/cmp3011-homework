'use strict';

angular.module('earApp')
.controller('PlayerCtrl', function($scope, $rootScope, $timeout, keyboardConfig, localStorageService) {

	$scope.level = 0;
	$scope.levels = 2;
	$scope.gameData = [[]];
	$scope.state = 'referenceNote';
	$scope.referenceNote = 55;
	$scope.gameover = false;
	$scope.notesToSkip = [$scope.referenceNote];
	var localStorageKey = 'gameData';

	$scope.kbdRange = {
		min: keyboardConfig.getMin().midi,
		max: keyboardConfig.getMax().midi
	};
	$scope.errorTimer = null;
	$scope.action = '';
	$scope.errorClass = '';

	$scope.viewData = {
		title: 'hi',
		subtitle: '',
		subtitleLink: '',
		set: function(state) {
			var stateMap = {
				'referenceNote' : {
					title: 'Play the blue note to hear your reference note.',
					subtitle: ''
				},
				'mysteryNote' : {
					title: 'Identify the mystery note.',
					subtitle: ''
				}
			}
			if (stateMap[state]) {
				var viewData = this;
				$.each(stateMap[state], function(key, value) {
					viewData[key] = value;
				});
			}
		}
	}

	$scope.key = 'none';

    $rootScope.$on('keypress', function (evt, obj, key) {
        $scope.$apply(function () {
            $scope.key = key;
        });
    })

	$scope.setState = function(state) {
		if ($scope.state == 'referenceNote' && state == 'mysteryNote') {
			// moving from referenceNote to mysteryNote
			initiateMysteryNote();
		}
		$scope.state = state;
		$scope.viewData.set(state);
	}

	$scope.continue = function() {
		$scope.gameData.push([]);
		initiateMysteryNote();
	}

	$scope.skip = function() {
		console.log($scope.gameData);
		$scope.gameData[$scope.level] = [];
		$scope.nextLevel();
		$scope.continue();
	}

	$scope.nextLevel = function() {
		$scope.level++;
		if ($scope.level < $scope.levels) {
			updateSavedData();
		} else {
			// game over!
			$scope.gameover = true;
			updateSavedData();
		}
	}

	$scope.playSpecialNote = function(type) {
		if (typeof type == 'string') {
			var note = $scope[type]; // get note from previously defined scope var
			$scope[type + 'Playing'] = true;
			var time = 1800;
			makeNote(note, time);
			$($scope.piano.getKeysDOM()).removeClass(type);
			$($scope.piano.getKeyDOM(note)).addClass(type);

			$timeout(function(){
				$scope[type + 'Playing'] = false;
			}, time);
		} else {
			console.log('BAD ARG');
		}
	}

	$scope.playMysteryNote = function() {
		var note = $scope.mysteryNote;
		var time = 1800;

		resetOrbClasses();

		makeNote(note, time, 'mysteryNote'); // will set $scope.mysteryNotePlaying to true until note is off

	}

	function initiateMysteryNote() {
		// TODO: account for smaller keyboard sizes when screen size changes

		$($scope.piano.getKeysDOM()).removeClass('mysteryNote found color-pulse');
		$scope.piano.noteOff(0, $scope.referenceNote);
		$scope.mysteryNote = selectRandNote($scope.kbdRange.min, $scope.kbdRange.max);
		var note = $scope.mysteryNote;
		$($scope.piano.getKeyDOM(note)).addClass('mysteryNote');
		$scope.action = 'waiting';
		$scope.orbClasses = 'reveal-play';
		var mysteryNoteObj = {
			key: -1,
			type: 'correct',
			midi: note
		};
		$scope.gameData[$scope.level].push(mysteryNoteObj);
		$scope.notesToSkip.push(note);
	}

	function selectRandNote(min, max) {
		var note;
		var exists = true;
		do {
			note = Math.floor(Math.random() * (max - min + 1)) + min;
			if ($scope.notesToSkip.indexOf(note) == -1) {
				exists = false;
			}
		}
		while (exists);
		return note;
	}

	function makeNote(note, duration, scopeVar) {

		if (scopeVar) {
			$scope[scopeVar + 'Playing'] = true;
			$timeout(function(){
				$scope[scopeVar + 'Playing'] = false;
			}, duration);
		}

		$scope.piano.noteOn(0, note, 120).wait(duration).noteOff(0, note);

	}

	function processNote(midi) {
		$scope.currNote = Number(midi);
		if ($scope.state == 'mysteryNote' && !$scope.mysteryNotePlaying && $scope.action != 'success') {
			if ($scope.currNote == $scope.mysteryNote) {
				// correct note
				resetOrbClasses();
				resetOrbTimers();
				$scope.action = 'success';
				$($scope.piano.getKeyDOM($scope.mysteryNote)).addClass('found');
				$scope.nextLevel();
				$scope.$apply();

			} else if ($scope.currNote != $scope.referenceNote){
				// incorrect note
				$scope.action = 'error';
				$scope.errorClass = 'e-' + (Math.abs($scope.mysteryNote - $scope.currNote));
				var errorNote = {
					key: $scope.gameData[$scope.level].length, // sets key to which error number this is. the mystery note is already in the list
					type: 'error',
					midi: $scope.currNote
				};
				$scope.gameData[$scope.level].push(errorNote);
				$scope.$apply();
				if ($scope.errorTimer != null) {
					$timeout.cancel($scope.errorTimer);
				}
				$scope.errorTimer = $timeout(resetOrbClasses, 4000);

			}
		}
		else if ($scope.mysteryNotePlaying) {
			// mystery note is playing
		} else {
			// not in mystery not selection mode
		}


	}

	function resetOrbClasses() {
		$scope.action = 'waiting';
		$scope.errorClass = '';
		$scope.orbClasses = '';
	}

	function resetOrbTimers() {
		if ($scope.errorTimer != null) {
			$timeout.cancel($scope.errorTimer);
		}
	}

	function deleteSavedData() {
		localStorageService.remove(localStorageKey);
		$scope.gameData = [[]];
	}

	function updateSavedData() {
		localStorageService.set(localStorageKey, $scope.gameData);
	};

	$( document ).on( 'noteOn noteOff', function(e) {
		handleNoteEvent(e)
	});

	function handleNoteEvent(e) {
		var data = e.detail;
		stripNote(data.value, data.state, data.playing);
	}

	function stripNote(midi, state, playing) {
		if (state == 'on') processNote(midi);
	}



	$scope.init = function() {
		$scope.viewData.set($scope.state);
		deleteSavedData();
		$($scope.piano.getKeyDOM($scope.referenceNote)).addClass('referenceNote color-pulse');
	}




});

// $(document).foundation();
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    },
	removeClassWildcard: function (prefix) {
		var maxErrors = 24;
		var pattern = new RegExp(prefix + '\\d{1,' + maxErrors +'}');
		$(this).removeClass( function() { /* Matches even table-col-row */
		     var toReturn = '',
		         classes = this.className.split(' ');
		     for(var i = 0; i < classes.length; i++ ) {
		         if( pattern.test( classes[i] ) ) { /* Filters */
		             toReturn += classes[i] +' ';
		         }
		     }
		     return toReturn ; /* Returns all classes to be removed */
		});
		return $(this);
	}
});
