JZZ.synth.OSC.register();

JZZ.input.ASCII({
  A:'F#4', Z:'G4', S:'G#4', X:'A4', D:'Bb4', C:'B4', V:'C5', G:'C#5', B:'D5',
  H:'D#5', N:'E5', M:'F5', K:'F#5', '<':'G5', L:'G#5', '>':'A5', ':':'Bb5'
}).connect(JZZ.input.Kbd({parent:'piano'}).connect(JZZ().openMidiOut()));
