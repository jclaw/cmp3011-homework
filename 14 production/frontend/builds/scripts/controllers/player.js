'use strict';

angular.module('earApp')
.controller('PlayerCtrl', function($scope, $rootScope, $timeout, keyboardConfig, localStorageService) {

	$scope.level = 0;
	$scope.levels = 3;
	$scope.gameData = [[]];
	$scope.state = 'referenceNote';
	$scope.referenceNote = 55;
	$scope.gameover = false;
	var localStorageKey = 'gameData';

	var keyboard = keyboardConfig.data;
	var min = JZZ.MIDI.noteValue(keyboard.startingNote.note + keyboard.startingNote.octave);
	$scope.kbdRange = {
		min: min,
		max: min + keyboard.ASCII.length - 1
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
					subtitle: 'I don’t hear anything. Help!'
				},
				'mysteryNote' : {
					title: 'Identify the mystery note.',
					subtitle: 'Use the keyboard below.'
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

	$scope.key = 'none'

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

	$scope.nextLevel = function() {
		$scope.gameData.push([]);
		initiateMysteryNote();

	}

	$scope.playSpecialNote = function(type) {
		if (typeof type == 'string') {
			var note = $scope[type]; // get note from previously defined scope var
			$scope[type + 'Playing'] = true;
			var time = 1800;
			makeNote(note, time);
			$($scope.piano.getKeyDOM(note)).addClass(type);

			$timeout(function(){
				$scope[type + 'Playing'] = false;
			}, time);
		} else {
			console.log('BAD ARG');
		}
	}


	function initiateMysteryNote() {
		// TODO: account for smaller keyboard sizes when screen size changes
		$scope.piano.noteOff(0, $scope.referenceNote);
		$scope.mysteryNote = selectRandNote($scope.kbdRange.min, $scope.kbdRange.max, $scope.referenceNote);
		$scope.action = 'waiting';
		$scope.playSpecialNote('mysteryNote');
		var mysteryNote = {
			key: -1,
			type: 'correct',
			midi: $scope.mysteryNote
		};
		$scope.gameData[$scope.level].push(mysteryNote);
		console.log($scope.gameData);
	}

	function selectRandNote(min, max, skip) {
		var note;
		do {
			note = Math.floor(Math.random() * (max - min + 1)) + min;
		}
		while (note == skip);
		return note;
	}

	function makeNote(note, duration) {
		$scope.piano.noteOn(0, note, 120).wait(duration).noteOff(0, note);
	}

	function processNote(midi) {
		$scope.currNote = Number(midi);
		if ($scope.state == 'mysteryNote' && !$scope.mysteryNotePlaying) {
			if ($scope.currNote == $scope.mysteryNote) {
				// correct note
				console.log('correct');
				resetOrbClasses();
				resetOrbTimers();
				$scope.action = 'success';
				$scope.level++;
				if ($scope.level < $scope.levels) {
					updateSavedData();
				} else {
					// game over!
					$scope.gameover = true;
					updateSavedData();
				}
				$scope.$apply();
			} else if ($scope.currNote != $scope.referenceNote){
				// incorrect note
				console.log('incorrect');
				$scope.action = 'error';
				$scope.errorClass = 'e-' + (Math.abs($scope.mysteryNote - $scope.currNote));
				console.log($scope.gameData);
				var errorNote = {
					key: $scope.gameData[$scope.level].length, // sets key to which error number this is. the mystery note is already in the list
					type: 'error',
					midi: $scope.currNote
				};
				$scope.gameData[$scope.level].push(errorNote);
				// console.log($scope.gameData);
				$scope.$apply();
				if ($scope.errorTimer != null) {
					$timeout.cancel($scope.errorTimer);
				}
				$scope.errorTimer = $timeout(resetOrbClasses, 2000);

			}
		}
		else if ($scope.mysteryNotePlaying) {
			// mystery note is playing
			console.log('skipping the mystery note');
		} else {
			// not in mystery not selection mode
			console.log('wrong mode');
		}


	}

	function resetOrbClasses() {
		$scope.action = 'waiting';
		$scope.errorClass = '';
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
		$($scope.piano.getKeyDOM($scope.referenceNote)).addClass('referenceNote');
		// $timeout(function() {
		// 	$scope.playSpecialNote('referenceNote')
		// }, 1800);
	}

	$scope.$on('$stateChangeStart', function( event ) {
		console.log('here');
		var answer = confirm("Are you sure you want to leave this page?")
		if (!answer) {
			event.preventDefault();
		}
	});



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
