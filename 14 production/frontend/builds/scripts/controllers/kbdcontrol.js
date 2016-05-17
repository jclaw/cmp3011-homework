'use strict';

angular.module('earApp')
.controller('KeyboardCtrl', function($scope, keyboardConfig) {

keyboardConfig.config = {
	range: 20,
	assignments: [
		{char: 'Q', midi: 48}
	]
};
keyboardConfig.initialize();

var noteAssignments = keyboardConfig.getNoteAssignments();

function loaded() { document.getElementById('loading').innerHTML = ''; }

$scope.synth = JZZ.synth.MIDIjs({ soundfontUrl: "./soundfont/", instrument: "acoustic_grand_piano" })
  .or(function(){ loaded(); alert('Cannot load MIDI.js!\n' + this.err()); })
  .and(function(){ loaded(); });

var min = keyboardConfig.getMinString(),
	max = keyboardConfig.getMaxString();

$scope.ascii = JZZ.input.ASCII(noteAssignments);
$scope.piano = JZZ.input.Kbd({
  	parent: 'piano',
      from: min,
      320: { to: 'C5' },
      450: { to: 'E5' },
      610: { to: max },
      900: { to: max },
      onCreate: function() {
		  displayNoteAssignments(this);
      }
});

$scope.ascii.connect($scope.piano);
$scope.piano.connect($scope.synth);

function displayNoteAssignments(ref) {
	var assignments = {};
	$.each(noteAssignments, function(char, noteValue) {
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
