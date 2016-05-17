'use strict';

angular.module('earApp')
.service('keyboardConfig', function(noteLogicHelpers) {
	var keyboard = this;
	var kbdSettings = {};

	var charLayout = [
		['1','2','3','4','5','6','7','8','9','0','-','='],
		['Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
		['A','S','D','F','G','H','J','K','L',';','\''],
		['Z','X','C','V','B','N','M',',','.','/']
	]

	keyboard.config = {};

	keyboard.initialize = function() {
		kbdSettings.assignments = [];
		var startingNote = keyboard.config.assignments[0].midi;
		var endingNote = startingNote + keyboard.config.range - 1;
		var lastIndex = keyboard.config.assignments.length-1;
		$.each(keyboard.config.assignments, function(index, pref) {
			var endMidi = index == lastIndex ? endingNote : keyboard.config.assignments[index+1].midi - 1;
			kbdSettings.assignments[index] = {
				startChar: pref.char,
				startMidi: pref.midi,
				endMidi: endMidi
			}
		})
		kbdSettings.startingNote = {midi: startingNote};
		kbdSettings.endingNote = {midi: endingNote};
		computeFields(kbdSettings);
	}

	keyboard.getMin = function() {
		return kbdSettings.startingNote;
	}

	keyboard.getMax = function() {
		return kbdSettings.endingNote;
	}

	keyboard.getMinString = function() {
		return kbdSettings.startingNote.noteString + kbdSettings.startingNote.octave;
	}

	keyboard.getMaxString = function() {
		return kbdSettings.endingNote.noteString + kbdSettings.endingNote.octave;
	}

	keyboard.getRange = function() {
		return [kbdSettings.startingNote, kbdSettings.endingNote];
	}

	keyboard.stringNote = function(value) {
		var d = kbdSettings;
		var element = d.notesInKeyboard[value - d.startingNote.midi];
		return element.noteString + element.octave;
	}

	keyboard.getNoteAssignments = function() {
		return kbdSettings.noteAssignments;
	}

	keyboard.getNotesInKeyboard = function() {
		return kbdSettings.notesInKeyboard;
	}

	//////////////////////////////////////////////

	function computeFields(data) {
		data.ASCII = setKeyboard(data.assignments);
		data.startingNote = noteLogicHelpers.getNoteObj(data.startingNote.midi);
		data.endingNote = noteLogicHelpers.getNoteObj(data.endingNote.midi);
		data.noteAssignments = {};
		data.notesInKeyboard = [];

		var noteIndex = noteLogicHelpers.getIndexOfNote(data.startingNote.noteString);
		var octave = data.startingNote.octave;
		for (var i = 0; i < data.ASCII.length; i++) {
			if (noteIndex >= 12) { // cycle through octave
				octave++;
				noteIndex = 0;
			}

			var characters = data.ASCII[i].split(' ');
			var noteString = noteLogicHelpers.getNoteByIndex(noteIndex);
			$.each(characters, function(index, value) {
				data.noteAssignments[value] = noteString + octave;
			})
			data.notesInKeyboard.push({
				noteString: noteString,
				octave: octave,
				midi: JZZ.MIDI.noteValue(noteString + octave)
			});
			noteIndex++;
		}

		data.endingNote = data.notesInKeyboard[data.notesInKeyboard.length - 1];
	}

	function setKeyboard(config) {
		var ascii = [];
		$.each(config, function(index, pref) {
			var startingNote = noteLogicHelpers.getNoteObj(pref.startMidi),
				endingNote = noteLogicHelpers.getNoteObj(pref.endMidi);
			var noteRange = pref.endMidi - pref.startMidi;
			var layoutRow, startCharIndex;
			for (layoutRow = 0; layoutRow < charLayout.length; layoutRow++) {
				startCharIndex = charLayout[layoutRow].indexOf(pref.startChar);
				if (startCharIndex != -1) break;
			}
			var isBlackKey = noteLogicHelpers.isBlackKey({noteString:startingNote.noteString});
			if (!isBlackKey && layoutRow != 0) {

				var lowerIndex = startCharIndex;
				var upperIndex = lowerIndex;
				upperIndex += noteLogicHelpers.isBlackKey({midi:(startingNote.midi + 1)}) ? 1 : 2;

				// loop
				for (var m = pref.startMidi; m <= pref.endMidi; m++) {
					var charToAdd;
					if (noteLogicHelpers.isBlackKey({midi: m})) {
						charToAdd = charLayout[layoutRow - 1][upperIndex];
						if (noteLogicHelpers.isBlackKey({midi: m + 2})) {
							upperIndex += 1;
						} else {
							upperIndex += 2;
						}
					} else {
						charToAdd = charLayout[layoutRow][lowerIndex];
						lowerIndex++;
					}

					if (charToAdd) {
						ascii.push(charToAdd);
					} else {
						console.log('invalid range');
					}

				}

			} else if (isBlackKey) {
				console.log("can't start with a black key");
				return -1;
			} else {
				console.log('invalid layout row');
			}
		});
		return ascii;
	}

});
