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
//


/////////////////////////////////////////////////////////////////////


function loaded() { document.getElementById('loading').innerHTML = ''; }

var synth = JZZ.synth.MIDIjs({ soundfontUrl: "./soundfont/", instrument: "acoustic_grand_piano" })
  .or(function(){ loaded(); alert('Cannot load MIDI.js!\n' + this.err()); })
  .and(function(){ loaded(); });



var ascii = JZZ.input.ASCII({
    A:'F#4', Z:'G4', S:'G#4', X:'A4', D:'Bb4', C:'B4', V:'C5', G:'C#5', B:'D5',
    H:'D#5', N:'E5', M:'F5', K:'F#5', '<':'G5', L:'G#5', '>':'A5', ':':'Bb5'
});
var piano = JZZ.input.Kbd({
  	parent: 'piano',
      from: 'C4',
      to: 'B4',
      0:   { pos: 'W' },
      320: { },
      450: { to: 'E5' },
      610: { to: 'B5' },
      900: { to: 'B6' },
      onCreate: function() {
      //   this.getKeys().setStyle({ borderColor:'#00f' });
      //   this.getBlackKeys().setStyle({ backgroundColor:'#c0c' }, {});
      //   this.getWhiteKeys().setStyle({ backgroundColor:'#fef' }, {});
      }
});

ascii.connect(piano);
piano.connect(synth);









// var piano = JZZ.input.Kbd({parent:'piano', from:'C5', to:'B5', onCreate:function() {
//   this.getBlackKeys().setStyle({color:'#fff'});
//   this.getKey('C5').setInnerHTML('<span class=inner>Z</span>');
//   this.getKey('C#5').setInnerHTML('<span class=inner>S</span>');
//   this.getKey('D5').setInnerHTML('<span class=inner>X</span>');
//   this.getKey('D#5').setInnerHTML('<span class=inner>D</span>');
//   this.getKey('E5').setInnerHTML('<span class=inner>C</span>');
//   this.getKey('F5').setInnerHTML('<span class=inner>V</span>');
//   this.getKey('F#5').setInnerHTML('<span class=inner>G</span>');
//   this.getKey('G5').setInnerHTML('<span class=inner>B</span>');
//   this.getKey('G#5').setInnerHTML('<span class=inner>H</span>');
//   this.getKey('A5').setInnerHTML('<span class=inner>N</span>');
//   this.getKey('A#5').setInnerHTML('<span class=inner>J</span>');
//   this.getKey('B5').setInnerHTML('<span class=inner>M</span>');
// }});
//
// var ascii = JZZ.input.ASCII({
//   Z:'C5', S:'C#5', X:'D5', D:'D#5', C:'E5', V:'F5',
//   G:'F#5', B:'G5', H:'Ab5', N:'A5', J:'Bb5', M:'B5'
// });
//
// ascii.connect(piano);
// piano.connect(synth);
// --></script>
