var earApp = angular.module('earApp', []);

earApp.controller('PlayerCtrl', function($scope) {
	$scope.exercisesCompleted = 0;
	$scope.exercisesTotal = 6;
	$scope.state = 'referenceNote';
	$scope.referenceNote = 55;
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
	// 	$(piano.getKeyDOM(note)).addClass('referenceNote');
	// }
	//
	// $scope.playMysteryNote = function() {
	// 	makeNote($scope.mysteryNote, 2000);
	// }

	$scope.playSpecialNote = function(type) {
		if (typeof type == 'string') {
			var note = $scope[type] // get note from previously defined scope var
			makeNote(note, 2000);
			$(piano.getKeyDOM(note)).addClass(type);
			$scope[type + 'Playing'] = true;
			setTimeout(function(){
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
		piano.noteOn(0, note, 120).wait(duration).noteOff(0, note);
	}

	$scope.init = function() {
		$scope.viewData.set($scope.state);
		setTimeout(function() {
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
