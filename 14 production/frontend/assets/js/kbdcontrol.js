var twoOctASCII = {
	startingNote: {
		note: 'C',
		octave: 4
	},
	ASCII: [
		'R', '5', 'T', '6', 'Y', 'U', '8', 'I', '9', 'O', '0', 'P', '[', 'F', 'V', 'G', 'B', 'N', 'J', 'M', 'K', ',', 'L', '.', '/'
	],
	noteAssignments: {}
}

generateNoteAssignments(twoOctASCII);

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
		obj.noteAssignments[obj.ASCII[i]] = notes[noteIndex] + octave;
		noteIndex++;
	}
}


// piano soundfont

var keyboard = twoOctASCII;

function loaded() { document.getElementById('loading').innerHTML = ''; }

var synth = JZZ.synth.MIDIjs({ soundfontUrl: "./soundfont/", instrument: "acoustic_grand_piano" })
  .or(function(){ loaded(); alert('Cannot load MIDI.js!\n' + this.err()); })
  .and(function(){ loaded(); });



var ascii = JZZ.input.ASCII(keyboard.noteAssignments);
var piano = JZZ.input.Kbd({
  	parent: 'piano',
      from: 'C4',
      to: 'B4',
      320: { to: 'C5' },
      450: { to: 'E5' },
      610: { to: 'C6' },
      900: { to: 'C6' },
      onCreate: function() {
		  this.getBlackKeys().setStyle({color:'#fff'});
		  displayNoteAssignments(this);
        // this.getKey('C5').setStyle({ backgroundColor:'#00f' });
      //   this.getBlackKeys().setStyle({ backgroundColor:'#c0c' }, {});
      //   this.getWhiteKeys().setStyle({ backgroundColor:'#fef' }, {});
		//  	console.log(this.getKeys());
      }
});

ascii.connect(piano);
piano.connect(synth);


msg = JZZ.MIDI(0x90, 63, 127);

function displayNoteAssignments(ref) {
	$.each(twoOctASCII.noteAssignments, function(key, value) {
		console.log('key', key,'value',value);
		ref.getKey(value).setInnerHTML('<span class="inner">' + key + "</span>");
	});
}



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
