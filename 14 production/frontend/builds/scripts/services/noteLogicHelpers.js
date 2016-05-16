'use strict';

angular.module('earApp')
.service('noteLogicHelpers', function() {
	var notes = [
		{noteChar: 'C', black: false},
		{noteChar: 'C#', black: true},
		{noteChar: 'D', black: false},
		{noteChar: 'D#', black: true},
		{noteChar: 'E', black: false},
		{noteChar: 'F', black: false},
		{noteChar: 'F#', black: true},
		{noteChar: 'G', black: false},
		{noteChar: 'G#', black: true},
		{noteChar: 'A', black: false},
		{noteChar: 'A#', black: true},
		{noteChar: 'B', black: false}
	];
	var midiMap = {"0":{"noteChar":"C","octave":0,"black":false},"1":{"noteChar":"C#","octave":0,"black":true},"2":{"noteChar":"D","octave":0,"black":false},"3":{"noteChar":"D#","octave":0,"black":true},"4":{"noteChar":"E","octave":0,"black":false},"5":{"noteChar":"F","octave":0,"black":false},"6":{"noteChar":"F#","octave":0,"black":true},"7":{"noteChar":"G","octave":0,"black":false},"8":{"noteChar":"G#","octave":0,"black":true},"9":{"noteChar":"A","octave":0,"black":false},"10":{"noteChar":"A#","octave":0,"black":true},"11":{"noteChar":"B","octave":0,"black":false},"12":{"noteChar":"C","octave":1,"black":false},"13":{"noteChar":"C#","octave":1,"black":true},"14":{"noteChar":"D","octave":1,"black":false},"15":{"noteChar":"D#","octave":1,"black":true},"16":{"noteChar":"E","octave":1,"black":false},"17":{"noteChar":"F","octave":1,"black":false},"18":{"noteChar":"F#","octave":1,"black":true},"19":{"noteChar":"G","octave":1,"black":false},"20":{"noteChar":"G#","octave":1,"black":true},"21":{"noteChar":"A","octave":1,"black":false},"22":{"noteChar":"A#","octave":1,"black":true},"23":{"noteChar":"B","octave":1,"black":false},"24":{"noteChar":"C","octave":2,"black":false},"25":{"noteChar":"C#","octave":2,"black":true},"26":{"noteChar":"D","octave":2,"black":false},"27":{"noteChar":"D#","octave":2,"black":true},"28":{"noteChar":"E","octave":2,"black":false},"29":{"noteChar":"F","octave":2,"black":false},"30":{"noteChar":"F#","octave":2,"black":true},"31":{"noteChar":"G","octave":2,"black":false},"32":{"noteChar":"G#","octave":2,"black":true},"33":{"noteChar":"A","octave":2,"black":false},"34":{"noteChar":"A#","octave":2,"black":true},"35":{"noteChar":"B","octave":2,"black":false},"36":{"noteChar":"C","octave":3,"black":false},"37":{"noteChar":"C#","octave":3,"black":true},"38":{"noteChar":"D","octave":3,"black":false},"39":{"noteChar":"D#","octave":3,"black":true},"40":{"noteChar":"E","octave":3,"black":false},"41":{"noteChar":"F","octave":3,"black":false},"42":{"noteChar":"F#","octave":3,"black":true},"43":{"noteChar":"G","octave":3,"black":false},"44":{"noteChar":"G#","octave":3,"black":true},"45":{"noteChar":"A","octave":3,"black":false},"46":{"noteChar":"A#","octave":3,"black":true},"47":{"noteChar":"B","octave":3,"black":false},"48":{"noteChar":"C","octave":4,"black":false},"49":{"noteChar":"C#","octave":4,"black":true},"50":{"noteChar":"D","octave":4,"black":false},"51":{"noteChar":"D#","octave":4,"black":true},"52":{"noteChar":"E","octave":4,"black":false},"53":{"noteChar":"F","octave":4,"black":false},"54":{"noteChar":"F#","octave":4,"black":true},"55":{"noteChar":"G","octave":4,"black":false},"56":{"noteChar":"G#","octave":4,"black":true},"57":{"noteChar":"A","octave":4,"black":false},"58":{"noteChar":"A#","octave":4,"black":true},"59":{"noteChar":"B","octave":4,"black":false},"60":{"noteChar":"C","octave":5,"black":false},"61":{"noteChar":"C#","octave":5,"black":true},"62":{"noteChar":"D","octave":5,"black":false},"63":{"noteChar":"D#","octave":5,"black":true},"64":{"noteChar":"E","octave":5,"black":false},"65":{"noteChar":"F","octave":5,"black":false},"66":{"noteChar":"F#","octave":5,"black":true},"67":{"noteChar":"G","octave":5,"black":false},"68":{"noteChar":"G#","octave":5,"black":true},"69":{"noteChar":"A","octave":5,"black":false},"70":{"noteChar":"A#","octave":5,"black":true},"71":{"noteChar":"B","octave":5,"black":false},"72":{"noteChar":"C","octave":6,"black":false},"73":{"noteChar":"C#","octave":6,"black":true},"74":{"noteChar":"D","octave":6,"black":false},"75":{"noteChar":"D#","octave":6,"black":true},"76":{"noteChar":"E","octave":6,"black":false},"77":{"noteChar":"F","octave":6,"black":false},"78":{"noteChar":"F#","octave":6,"black":true},"79":{"noteChar":"G","octave":6,"black":false},"80":{"noteChar":"G#","octave":6,"black":true},"81":{"noteChar":"A","octave":6,"black":false},"82":{"noteChar":"A#","octave":6,"black":true},"83":{"noteChar":"B","octave":6,"black":false}};


	this.getIndexOfNote = function(noteChar) {
		var index;
		for (var i = 0; i < notes.length; i++) {
			if (notes[i].noteChar == noteChar) {
				index = i;
				break;
			}
		}
		return index;
	}

	this.getNoteByIndex = function(index) {
		return notes[index].noteChar;
	}

	this.isBlackKey = function(obj) {
		if ('noteChar' in obj) {
			var index = this.getIndexOfNote(obj.noteChar);
			return index != -1 ? notes[index].black : undefined;
		} else if ('midi' in obj) {
			return midiMap[obj.midi].black;
		}

	}

	this.getMIDIValue = function(noteChar, octave) {
		return JZZ.MIDI.noteValue(noteChar + octave);
		// console.log('getMIDIValue');
		//
		// var obj = {};
		// var noteIndex = 0;
		// for (var i = 0; i < 84; i++) {
		// 	noteIndex = i % 12;
		// 	obj[i] = {
		// 		noteChar: notes[noteIndex].noteChar,
		// 		octave: Math.floor(i / 12),
		// 		black: notes[noteIndex].black
		// 	}
		// }
		// console.log(JSON.stringify(obj));
	}

	this.getNoteObj = function(midi) {
		return midiMap[midi];
	}

});
