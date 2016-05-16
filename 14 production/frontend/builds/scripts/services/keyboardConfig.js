'use strict';

angular.module('earApp')
.service('keyboardConfig', function(noteLogicHelpers) {

	var kbdSettings = {
		startingNote: 	{ midi: 62 },
		endingNote: 	{ midi: 74 },
		assignments: [{
			startingKbdChar: 'Z',
			startingMidi: 62,
			endingMidi: 74
		}]
	}

	var charLayout = [
		['1','2','3','4','5','6','7','8','9','0','-','='],
		['Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
		['A','S','D','F','G','H','J','K','L',';','\''],
		['Z','X','C','V','B','N','M',',','.','/']
	]

	computeFields(kbdSettings);
	this.data = kbdSettings;

	this.getMin = function() {
		return kbdSettings.startingNote;
	}

	this.getMax = function() {
		return kbdSettings.endingNote;
	}

	this.getMinString = function() {
		return kbdSettings.startingNote.noteChar + kbdSettings.startingNote.octave;
	}

	this.getMaxString = function() {
		return kbdSettings.endingNote.noteChar + kbdSettings.endingNote.octave;
	}

	this.getRange = function() {
		return [kbdSettings.startingNote, kbdSettings.endingNote];
	}

	this.stringNote = function(value) {
		var d = kbdSettings;
		var element = d.notesInKeyboard[value - d.startingNote.midi];
		return element.noteChar + element.octave;
	}

	this.getNoteAssignments = function() {
		return kbdSettings.noteAssignments;
	}

	//////////////////////////////////////////////

	function computeFields(data) {

		data.ASCII = setKeyboard(data.assignments);
		data.startingNote = noteLogicHelpers.getNoteObj(data.startingNote.midi);
		data.endingNote = noteLogicHelpers.getNoteObj(data.endingNote.midi);
		data.noteAssignments = {};
		data.notesInKeyboard = [];

		console.log(data);

		var noteIndex = noteLogicHelpers.getIndexOfNote(data.startingNote.noteChar);
		var octave = data.startingNote.octave;
		for (var i = 0; i < data.ASCII.length; i++) {
			if (noteIndex >= 12) { // cycle through octave
				octave++;
				noteIndex = 0;
			}

			var characters = data.ASCII[i].split(' ');
			var noteChar = noteLogicHelpers.getNoteByIndex(noteIndex);
			$.each(characters, function(index, value) {
				data.noteAssignments[value] = noteChar + octave;
			})
			data.notesInKeyboard.push({
				noteChar: noteChar,
				octave: octave,
				midi: JZZ.MIDI.noteValue(noteChar + octave)
			});
			noteIndex++;
		}

		data.endingNote = data.notesInKeyboard[data.notesInKeyboard.length - 1];
	}

	function setKeyboard(config) {
		var ascii = [];
		$.each(config, function(index, pref) {
			var startingNote = noteLogicHelpers.getNoteObj(pref.startingMidi),
				endingNote = noteLogicHelpers.getNoteObj(pref.endingMidi);
			var noteRange = pref.endingMidi - pref.startingMidi;
			var layoutRow, startCharIndex;
			for (layoutRow = 0; layoutRow < charLayout.length; layoutRow++) {
				startCharIndex = charLayout[layoutRow].indexOf(pref.startingKbdChar);
				if (startCharIndex != -1) break;
			}
			var isBlackKey = noteLogicHelpers.isBlackKey({noteChar:startingNote.noteChar});
			if (!isBlackKey && layoutRow != 0) {
				console.log('valid arrangment');

				var upperIndex = startCharIndex + 1,
					lowerIndex = startCharIndex;

				console.log(upperIndex,lowerIndex);
				// loop
				for (var m = pref.startingMidi; m <= pref.endingMidi; m++) {
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
		console.log(ascii);
		return ascii;
	}

});
