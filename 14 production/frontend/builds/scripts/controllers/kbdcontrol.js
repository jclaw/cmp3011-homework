'use strict';

angular.module('earApp')
.controller('KeyboardCtrl', function($scope, keyboardConfig) {

var config = keyboardConfig.data;
console.log(config);

function loaded() { document.getElementById('loading').innerHTML = ''; }

$scope.synth = JZZ.synth.MIDIjs({ soundfontUrl: "./soundfont/", instrument: "acoustic_grand_piano" })
  .or(function(){ loaded(); alert('Cannot load MIDI.js!\n' + this.err()); })
  .and(function(){ loaded(); });


$scope.ascii = JZZ.input.ASCII(config.noteAssignments);
$scope.piano = JZZ.input.Kbd({
  	parent: 'piano',
      from: 'C4',
      to: 'B4',
      320: { to: 'C5' },
      450: { to: 'E5' },
      610: { to: 'C6' },
      900: { to: 'C6' },
      onCreate: function() {
		  displayNoteAssignments(this);
      }
});

$scope.ascii.connect($scope.piano);
$scope.piano.connect($scope.synth);

// var msg = JZZ.MIDI(0x90, 63, 127);

function displayNoteAssignments(ref) {
	var assignments = {};
	$.each(config.noteAssignments, function(char, noteValue) {
		// create note assignment display
		// swapping key and value essentially
		if (noteValue in assignments) {
			assignments[noteValue] = assignments[noteValue] + '<br>' + char;
		} else {
			assignments[noteValue] = char;
		}
	});
	$.each(assignments, function(noteValue, text) {
		ref.getKey(noteValue).setInnerHTML('<span class="inner">' + text + '</span>');
	});

	// ref.getKey('C5').setInnerHTML('<span class="inner">' + '[<br> C' + '</span>');
}


function debugPrint() {
	console.log('piano',piano);
	console.log($scope.piano.playing);
}



});


///////////////////////////////////////////////////////////////////

//
// JZZ.synth.OSC.register();
//
// JZZ.input.ASCII({
//   A:'F#4', Z:'G4', S:'G#4', X:'A4', D:'Bb4', C:'B4', V:'C5', G:'C#5', B:'D5',
//   H:'D#5', N:'E5', M:'F5', K:'F#5', '<':'G5', L:'G#5', '>':'A5', ':':'Bb5'
// }).connect(JZZ.input.Kbd({
// 	parent: 'piano',
//     from: 'C4',
//     to: 'B4',
//     0:   { pos: 'W' },
//     320: { },
//     450: { to: 'E5' },
//     610: { to: 'B5' },
//     900: { to: 'B6' },
//     onCreate: function() {
//     //   this.getKeys().setStyle({ borderColor:'#00f' });
//     //   this.getBlackKeys().setStyle({ backgroundColor:'#c0c' }, {});
//     //   this.getWhiteKeys().setStyle({ backgroundColor:'#fef' }, {});
//     }
// }).connect(JZZ().openMidiOut()));