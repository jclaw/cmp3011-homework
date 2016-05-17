'use strict';

angular.module('earApp')
.service('noteLogicHelpers', function(MidiData) {

	this.getIndexOfNote = function(noteString) {
		var index;
		for (var i = 0; i < MidiData.notes.length; i++) {
			if (MidiData.notes[i].noteString == noteString) {
				index = i;
				break;
			}
		}
		return index;
	}

	this.getNoteByIndex = function(index) {
		return MidiData.notes[index].noteString;
	}

	this.isBlackKey = function(obj) {
		if ('noteString' in obj) {
			var index = this.getIndexOfNote(obj.noteString);
			return index != -1 ? MidiData.notes[index].black : undefined;
		} else if ('midi' in obj) {
			return MidiData.midiMap[obj.midi].black;
		}

	}

	this.getMIDIValue = function(noteString, octave) {
		return MidiData.noteStringMap[noteString + octave];
	}

	this.getNoteObj = function(midi) {
		return MidiData.midiMap[midi];
	}

});
