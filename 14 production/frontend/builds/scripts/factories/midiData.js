'use strict';

angular.module('earApp')
.factory('MidiData', function() {
	var notes = [
		{noteString: 'C', black: false},
		{noteString: 'C#', black: true},
		{noteString: 'D', black: false},
		{noteString: 'D#', black: true},
		{noteString: 'E', black: false},
		{noteString: 'F', black: false},
		{noteString: 'F#', black: true},
		{noteString: 'G', black: false},
		{noteString: 'G#', black: true},
		{noteString: 'A', black: false},
		{noteString: 'A#', black: true},
		{noteString: 'B', black: false}
	];
	var MidiData = {};
	var processMidi = function() {
		var toReturn = {
			midiMap: {},
			noteStringMap: {}
		};

		var noteIndex = 0;
		for (var i = 0; i < 127; i++) {
			noteIndex = i % 12;
			var noteString = notes[noteIndex].noteString;
			var black = notes[noteIndex].black;
			var octave = Math.floor(i / 12);
			toReturn.midiMap[i] = {
				noteString: noteString,
				midi: i,
				octave: octave,
				black: black
			};
			toReturn.noteStringMap[noteString + octave] = {
				noteString: noteString,
				midi: i,
				octave: octave,
				black: black
			}
		}
		return toReturn;
	}

	MidiData.notes = notes;
	angular.extend(MidiData, processMidi());

	return MidiData;
});
