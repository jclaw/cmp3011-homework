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
	var midiMap = {"0":{"noteChar":"C","midi":0,"octave":0,"black":false},"1":{"noteChar":"C#","midi":1,"octave":0,"black":true},"2":{"noteChar":"D","midi":2,"octave":0,"black":false},"3":{"noteChar":"D#","midi":3,"octave":0,"black":true},"4":{"noteChar":"E","midi":4,"octave":0,"black":false},"5":{"noteChar":"F","midi":5,"octave":0,"black":false},"6":{"noteChar":"F#","midi":6,"octave":0,"black":true},"7":{"noteChar":"G","midi":7,"octave":0,"black":false},"8":{"noteChar":"G#","midi":8,"octave":0,"black":true},"9":{"noteChar":"A","midi":9,"octave":0,"black":false},"10":{"noteChar":"A#","midi":10,"octave":0,"black":true},"11":{"noteChar":"B","midi":11,"octave":0,"black":false},"12":{"noteChar":"C","midi":12,"octave":1,"black":false},"13":{"noteChar":"C#","midi":13,"octave":1,"black":true},"14":{"noteChar":"D","midi":14,"octave":1,"black":false},"15":{"noteChar":"D#","midi":15,"octave":1,"black":true},"16":{"noteChar":"E","midi":16,"octave":1,"black":false},"17":{"noteChar":"F","midi":17,"octave":1,"black":false},"18":{"noteChar":"F#","midi":18,"octave":1,"black":true},"19":{"noteChar":"G","midi":19,"octave":1,"black":false},"20":{"noteChar":"G#","midi":20,"octave":1,"black":true},"21":{"noteChar":"A","midi":21,"octave":1,"black":false},"22":{"noteChar":"A#","midi":22,"octave":1,"black":true},"23":{"noteChar":"B","midi":23,"octave":1,"black":false},"24":{"noteChar":"C","midi":24,"octave":2,"black":false},"25":{"noteChar":"C#","midi":25,"octave":2,"black":true},"26":{"noteChar":"D","midi":26,"octave":2,"black":false},"27":{"noteChar":"D#","midi":27,"octave":2,"black":true},"28":{"noteChar":"E","midi":28,"octave":2,"black":false},"29":{"noteChar":"F","midi":29,"octave":2,"black":false},"30":{"noteChar":"F#","midi":30,"octave":2,"black":true},"31":{"noteChar":"G","midi":31,"octave":2,"black":false},"32":{"noteChar":"G#","midi":32,"octave":2,"black":true},"33":{"noteChar":"A","midi":33,"octave":2,"black":false},"34":{"noteChar":"A#","midi":34,"octave":2,"black":true},"35":{"noteChar":"B","midi":35,"octave":2,"black":false},"36":{"noteChar":"C","midi":36,"octave":3,"black":false},"37":{"noteChar":"C#","midi":37,"octave":3,"black":true},"38":{"noteChar":"D","midi":38,"octave":3,"black":false},"39":{"noteChar":"D#","midi":39,"octave":3,"black":true},"40":{"noteChar":"E","midi":40,"octave":3,"black":false},"41":{"noteChar":"F","midi":41,"octave":3,"black":false},"42":{"noteChar":"F#","midi":42,"octave":3,"black":true},"43":{"noteChar":"G","midi":43,"octave":3,"black":false},"44":{"noteChar":"G#","midi":44,"octave":3,"black":true},"45":{"noteChar":"A","midi":45,"octave":3,"black":false},"46":{"noteChar":"A#","midi":46,"octave":3,"black":true},"47":{"noteChar":"B","midi":47,"octave":3,"black":false},"48":{"noteChar":"C","midi":48,"octave":4,"black":false},"49":{"noteChar":"C#","midi":49,"octave":4,"black":true},"50":{"noteChar":"D","midi":50,"octave":4,"black":false},"51":{"noteChar":"D#","midi":51,"octave":4,"black":true},"52":{"noteChar":"E","midi":52,"octave":4,"black":false},"53":{"noteChar":"F","midi":53,"octave":4,"black":false},"54":{"noteChar":"F#","midi":54,"octave":4,"black":true},"55":{"noteChar":"G","midi":55,"octave":4,"black":false},"56":{"noteChar":"G#","midi":56,"octave":4,"black":true},"57":{"noteChar":"A","midi":57,"octave":4,"black":false},"58":{"noteChar":"A#","midi":58,"octave":4,"black":true},"59":{"noteChar":"B","midi":59,"octave":4,"black":false},"60":{"noteChar":"C","midi":60,"octave":5,"black":false},"61":{"noteChar":"C#","midi":61,"octave":5,"black":true},"62":{"noteChar":"D","midi":62,"octave":5,"black":false},"63":{"noteChar":"D#","midi":63,"octave":5,"black":true},"64":{"noteChar":"E","midi":64,"octave":5,"black":false},"65":{"noteChar":"F","midi":65,"octave":5,"black":false},"66":{"noteChar":"F#","midi":66,"octave":5,"black":true},"67":{"noteChar":"G","midi":67,"octave":5,"black":false},"68":{"noteChar":"G#","midi":68,"octave":5,"black":true},"69":{"noteChar":"A","midi":69,"octave":5,"black":false},"70":{"noteChar":"A#","midi":70,"octave":5,"black":true},"71":{"noteChar":"B","midi":71,"octave":5,"black":false},"72":{"noteChar":"C","midi":72,"octave":6,"black":false},"73":{"noteChar":"C#","midi":73,"octave":6,"black":true},"74":{"noteChar":"D","midi":74,"octave":6,"black":false},"75":{"noteChar":"D#","midi":75,"octave":6,"black":true},"76":{"noteChar":"E","midi":76,"octave":6,"black":false},"77":{"noteChar":"F","midi":77,"octave":6,"black":false},"78":{"noteChar":"F#","midi":78,"octave":6,"black":true},"79":{"noteChar":"G","midi":79,"octave":6,"black":false},"80":{"noteChar":"G#","midi":80,"octave":6,"black":true},"81":{"noteChar":"A","midi":81,"octave":6,"black":false},"82":{"noteChar":"A#","midi":82,"octave":6,"black":true},"83":{"noteChar":"B","midi":83,"octave":6,"black":false}}

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
		// 		midi: i,
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
