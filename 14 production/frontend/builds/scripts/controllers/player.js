angular.module('earApp')
.controller('PlayerCtrl', function($scope, $timeout, keyboardConfig) {
	$scope.level = 0;
	$scope.levels = 6;
	$scope.numErrors = Array($scope.levels).fill(0);
	$scope.state = 'referenceNote';
	$scope.referenceNote = 55;

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
		title: '',
		subtitle: '',
		subtitleLink: '',
		set: function(state) {
			if (state == 'referenceNote') {
				this.title = 'Can you hear that? It’s your reference note.';
				this.subtitle = 'I don’t hear anything. Help!';
			} else if (state == 'mysteryNote') {
				this.title = 'Identify the mystery note.';
				this.subtitle = 'Use the keyboard below.';
			}
		}
	}

	$scope.setState = function(state) {
		if ($scope.state == 'referenceNote' && state == 'mysteryNote') {
			// moving from referenceNote to mysteryNote
			initiateMysteryNote();
		}
		$scope.state = state;
		$scope.viewData.set(state);
	}

	$scope.nextLevel = function() {
		$scope.level++;
		if ($scope.level < $scope.levels) {
			initiateMysteryNote();
		} else {
			// game over!
		}
	}

	$scope.playSpecialNote = function(type) {
		if (typeof type == 'string') {
			var note = $scope[type] // get note from previously defined scope var
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
		// add playing class to orb
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
				$scope.$apply();
			} else {
				// incorrect note
				console.log('incorrect');
				$scope.action = 'error';
				$scope.errorClass = 'e-' + (Math.abs($scope.mysteryNote - $scope.currNote));
				$scope.numErrors[$scope.level]++;
				console.log($scope.numErrors);
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
		// for (var i = 0; i < $scope.levels; i++) {
		// 	$scope.numErrors[i] = 0;
		// }
		$timeout(function() {
			$scope.playSpecialNote('referenceNote')
		}, 1800);
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
