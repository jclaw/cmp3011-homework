angular.module('earApp')
.controller('PlayerCtrl', function($scope, $timeout, keyboardConfig) {
	$scope.exercisesCompleted = 0;
	$scope.exercisesTotal = 6;
	$scope.state = 'referenceNote';
	$scope.referenceNote = 55;
	var keyboard = keyboardConfig.data;
	var min = JZZ.MIDI.noteValue(keyboard.startingNote.note + keyboard.startingNote.octave);
	$scope.kbdRange = {
		min: min,
		max: min + keyboard.ASCII.length - 1
	};


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

	// $scope.playReferenceNote = function() {
	// 	var note = $scope.referenceNote;
	// 	makeNote(note, 2000);
	// 	$($scope.piano.getKeyDOM(note)).addClass('referenceNote');
	// }
	//
	// $scope.playMysteryNote = function() {
	// 	makeNote($scope.mysteryNote, 2000);
	// }

	$scope.playSpecialNote = function(type) {
		if (typeof type == 'string') {
			var note = $scope[type] // get note from previously defined scope var
			$scope[type + 'Playing'] = true;
			makeNote(note, 2000);
			$($scope.piano.getKeyDOM(note)).addClass(type);

			$timeout(function(){
				$scope[type + 'Playing'] = false;
			}, 2000);
		} else {
			console.log('BAD ARG');
		}
	}


	function initiateMysteryNote() {
		// TODO: account for smaller keyboard sizes when screen size changes
		$scope.mysteryNote = selectRandNote($scope.kbdRange.min, $scope.kbdRange.max, $scope.referenceNote);

		// $scope.playMysteryNote();
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
			} else {
				// incorrect note
				console.log('incorrect');
				$('.orb').removeClassWildcard('e-');
				var errorClass = 'e-' + (Math.abs($scope.mysteryNote - $scope.currNote));
				console.log($scope.mysteryNote, $scope.currNote);
				console.log(errorClass);
				$('.orb').addClass('error ' + errorClass);
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
		$timeout(function() {
			$scope.playSpecialNote('referenceNote')
		}, 2000);
	}

});

$(document).foundation();
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
		console.log(pattern);
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
	}
});






// $('.orb-inner').addClass('infinite').animateCss('pulse');

// $('.orb-outer')
// 	.mouseenter(function() {
// 		$('.orb-outer').changeDuration('_1000ms');
// 	})
// 	.mouseleave(function() {
// 		$('.orb-outer').addClass('animated');
// 	})
