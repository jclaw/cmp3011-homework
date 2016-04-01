JZZ.synth.OSC.register();

JZZ.input.ASCII({
  A:'F#4', Z:'G4', S:'G#4', X:'A4', D:'Bb4', C:'B4', V:'C5', G:'C#5', B:'D5',
  H:'D#5', N:'E5', M:'F5', K:'F#5', '<':'G5', L:'G#5', '>':'A5', ':':'Bb5'
}).connect(JZZ.input.Kbd({
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
}).connect(JZZ().openMidiOut()));


// <script><!--
// JZZ.synth.OSC.register();
//
// JZZ.input.Kbd({
//   parent: 'piano',
//   from: 'C4',
//   to: 'B4',
//   0:   { pos: 'W' },
//   320: { },
//   450: { to: 'E5' },
//   610: { to: 'B5' },
//   900: { to: 'B6' },
//   onCreate: function() {
//     this.getKeys().setStyle({ borderColor:'#00f' });
//     this.getBlackKeys().setStyle({ backgroundColor:'#c0c' }, {});
//     this.getWhiteKeys().setStyle({ backgroundColor:'#fef' }, {});
//   }
// }).connect(JZZ().openMidiOut());
// --></script>
