'use strict';

angular.module('earApp')
.service('keyboardConfig', function() {

	var keyboardSettings = {
		startingNote: {
			note: 'C',
			octave: 4,
			midi: 0			// redefined below
		},
		endingNote: {
			note: '',		// redefined below
			octave: 0,		// redefined below
			midi: 0			// redefined below
		},
		ASCII: [
			'R', '5', 'T', '6', 'Y', 'U', '8', 'I', '9', 'O', '0', 'P', '[ C', 'F', 'V', 'G', 'B', 'N', 'J', 'M', 'K', ',', 'L', '.', '/'
		],
		noteAssignments: {},	// redefined below
		notesInKeyboard: [] 	// redefined below
	}

	var notes = [
		'C','C#','D','D#','E','F','F#','G','G#','A','A#','B'
	]

	computeFields(keyboardSettings);
	this.data = keyboardSettings;

	this.getRange = function() {
		return [keyboardSettings.startingNote, keyboardSettings.endingNote];
	}

	this.stringNote = function(value) {
		var d = keyboardSettings;
		var element = d.notesInKeyboard[value - d.startingNote.midi];
		return element.note + element.octave;
	}

	//////////////////////////////////////////////

	function computeFields(data) {

		var s = data.startingNote;
		data.startingNote.midi = JZZ.MIDI.noteValue(s.note + s.octave);

		var noteIndex = notes.indexOf(data.startingNote.note);
		var octave = data.startingNote.octave;
		for (var i = 0; i < data.ASCII.length; i++) {
			if (noteIndex >= 12) { // cycle through octave
				octave++;
				noteIndex = 0;
			}
			var characters = data.ASCII[i].split(' ');
			$.each(characters, function(index, value) {
				data.noteAssignments[value] = notes[noteIndex] + octave;
			})
			data.notesInKeyboard.push({
				note: notes[noteIndex],
				octave: octave,
				midi: JZZ.MIDI.noteValue(notes[noteIndex] + octave)
			});
			noteIndex++;
		}

		data.endingNote = data.notesInKeyboard[data.notesInKeyboard.length - 1];
	}

});
