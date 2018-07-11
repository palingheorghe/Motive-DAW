export let MIDISignal;

export function connectMIDI() {
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
      sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
  } else console.warn("No MIDI support in your browser");
}

function onMIDISuccess(midiData) {
  console.log(midiData);
  let midi = midiData; //all our MIDI Data
  let allInputs = midi.inputs.values(); //inputurile primite de la controller
  for (let input = allInputs.next(); input && !input.done; input = allInputs.next()) {
    //loop over all available inputs and listen for any MIDI input
    input.value.onmidimessage = gotMIDImessage;
    //when a MIDI value is received call the onMIDIMessage function
  }
}

function gotMIDImessage(messageData) {
  MIDISignal = messageData.data;
  console.log(MIDISignal)
}

//on failure
function onMIDIFailure() {
  console.warn("Not recognising MIDI controller");
}