var earApp = angular.module('earApp', []);

earApp.controller('PlayerCtrl', function($scope) {
	$scope.exercisesCompleted = 0;
	$scope.exercisesTotal = 6;
	$scope.state = 'referenceNote';
	$scope.referenceNote = 55;

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
		if ($scope.state == 'referenceNote')
		$scope.state = state;
		$scope.viewData.set(state);
	}

	function playReferenceNote() {
		var note = $scope.referenceNote;
		piano.noteOn(0, note, 120).wait(2000).noteOff(0, note);
		$(piano.getKeyDOM(note)).addClass('referenceNote');
	}

	$scope.init = function() {
		$scope.viewData.set($scope.state);
		setTimeout(playReferenceNote, 2000);
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
