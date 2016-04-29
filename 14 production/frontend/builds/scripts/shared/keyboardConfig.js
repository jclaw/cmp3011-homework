'use strict';

var earApp = angular.module('earApp', []);

earApp
.service('keyboardConfig', function() {

	var twoOctASCII = {
		startingNote: {
			note: 'C',
			octave: 4
		},
		ASCII: [
			'R', '5', 'T', '6', 'Y', 'U', '8', 'I', '9', 'O', '0', 'P', '[ C', 'F', 'V', 'G', 'B', 'N', 'J', 'M', 'K', ',', 'L', '.', '/'
		],
		noteAssignments: {}
	}

	generateNoteAssignments(twoOctASCII);

	this.data = twoOctASCII;


	function generateNoteAssignments(obj) {
		var notes = [
			'C','C#','D','D#','E','F','F#','G','G#','A','A#','B'
		]
		var noteIndex = notes.indexOf(obj.startingNote.note);
		var octave = obj.startingNote.octave;
		for (var i = 0; i < obj.ASCII.length; i++) {
			if (noteIndex >= 12) { // cycle through octave
				octave++;
				noteIndex = 0;
			}
			var characters = obj.ASCII[i].split(' ');
			$.each(characters, function(index, value) {
				obj.noteAssignments[value] = notes[noteIndex] + octave;
			})
			noteIndex++;
		}
	}

});
