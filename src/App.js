import React, { Component } from 'react';
// node library for detecting the device the app is used on
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import Header from './components/Header';
import Tutorial from './components/Tutorial';
import Pads from './components/Pads';
import Info from './components/Info';
import StepSequencer from './components/StepSequencer';

import Tone from 'tone';

import { play } from './scripts/MIDIConnect';

// console.log(MIDISignal);

/*
  Noul plan este:
  - step sequencer in loc de playlist
  - pian/drumpad (optiune de ales dintre ele)
  - softwareul devine mai mult app unde iti poti pune tobele ca tu sa experimentezi peste el si 
    deci sa poti creea muzica
  - (optional) daca exista timp si posibilitate cream si optiunea de inregistrare
*/
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      tutorialOpen: false,
      bpm: 120,
      noteType: 4,
      bars: 4,
      MIDIName: 'NO INPUT',
      drumKit: 'emotional_sounds',
      keyboardKit: '',
      nameOfTheSong: '',
      drumPadPattern: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    }
    this.stepSequencerPlayStop = this.stepSequencerPlayStop.bind(this);
    this.stepSequencerDrumKitChange = this.stepSequencerDrumKitChange.bind(this);
    this.changeBars = this.changeBars.bind(this);
    this.changeBPM = this.changeBPM.bind(this);
    this.changeNoteType = this.changeNoteType.bind(this);
    this.openTutorial = this.openTutorial.bind(this);
    this.setMIDIInput = this.setMIDIInput.bind(this);
    this.onMIDISuccess = this.onMIDISucces.bind(this);
    this.gotMIDImessage = this.gotMIDImessage.bind(this);
    this.onMIDIFailure = function onMIDIFailure() {
      console.warn("Not recognising MIDI controller");
    }
    this.connectMIDI = this.connectMIDI.bind(this);

    this.padNumbers = [
      48, 49, 50, 51,
      44, 45, 46, 47,
      40, 41, 42, 43,
      36, 37, 38, 39
    ]
    this.padPressed = this.padPressed.bind(this);
    this.padClicked = this.padClicked.bind(this);
    Tone.Transport.start();
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) {
        this.stepSequencerPlayStop();
      }
    });

  }

  padPressed(midiNote, onOff) {
    let indexPadNumbers = this.padNumbers.indexOf(midiNote);
    const { drumPadPattern } = this.state;
    let newMatrix;
    let columnIndex = ~~(indexPadNumbers / 4);
    let row = indexPadNumbers - (columnIndex * 4);
    console.log("Coloana si pad-ul: ", columnIndex, row);
    newMatrix = drumPadPattern.slice(0);
    newMatrix[columnIndex][row] = onOff === 153 ? 1 : 0;

      this.setState({
        drumPadPattern: newMatrix
      })

  }

  padClicked(column, row, onOff) {
    const { drumPadPattern } = this.state;
    let newMatrix;
    let indexPadNumbers = row + (column * 4);
    if(onOff === 1) {
      play(this.padNumbers[indexPadNumbers]);
    }
    newMatrix = drumPadPattern.slice(0);
    newMatrix[column][row] = onOff === 1 ? 1 : 0;

    this.setState({
      drumPadPattern: newMatrix
    })
  }

  connectMIDI() {
    // connectMIDI();
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false
      }).then(this.onMIDISuccess, this.onMIDIFailure);
    } else console.warn("No MIDI support in your browser");
  }

  gotMIDImessage(messageData) {
    this.MIDISignal = messageData.data;

    if (this.MIDISignal[0] === 153 && this.MIDISignal[1] >= 36 && this.MIDISignal[1] <= 51) {
      play(this.MIDISignal[1]);
    }
    this.padPressed(this.MIDISignal[1], this.MIDISignal[0]);

    console.log(this.MIDISignal)
  }


  onMIDISucces(midiData) {
    console.log(midiData);
    let midi = midiData; //all our MIDI Data
    this.setMIDIInput(midi.inputs.entries().next().value[1].name);

    let gotMIDI = this.gotMIDImessage; // functia care zice ce facem cu datele
    let allInputs = midi.inputs.values(); //inputurile primite de la controller
    for (let input = allInputs.next(); input && !input.done; input = allInputs.next()) {
      //loop over all available inputs and listen for any MIDI input
      input.value.onmidimessage = gotMIDI;
      //when a MIDI value is received call the onMIDIMessage function
    }
  }

  setMIDIInput(inputMIDIName) {
    if (this.state.MIDIName !== inputMIDIName) {
      this.setState({
        MIDIName: inputMIDIName
      })
    }
  }

  stepSequencerPlayStop() {
    this.setState({
      playing: !this.state.playing
    });
  }

  stepSequencerDrumKitChange(val) {
    console.log(val);
    this.setState({
      drumKit: val
    })
  }

  changeBPM(val) {
    this.setState({
      bpm: val
    })
  }
  changeBars(val) {
    this.setState({
      bars: val
    })
  }
  changeNoteType(val) {
    this.setState({
      noteType: val
    })
  }

  openTutorial() {
    this.setState({
      tutorialOpen: !this.state.tutorialOpen
    })
    if (this.state.playing)
      this.setState({
        playing: false,
      });
  }

  render() {

    const { bpm, noteType, bars, drumKit, playing, tutorialOpen, MIDIName, drumPadPattern } = this.state;
    if (isMobile) {
      return (
        <MobileView>
          <p className="Title">Motive</p>
          <div className="MobileApp">
            <Pads drumPadPattern={drumPadPattern} padClicked={this.padClicked}/>
          </div>
          <p className="Footer">App created with LOVE by <a href="https://www.instagram.com/aling.js/">me</a>.</p>
        </MobileView>
      );
    } else if (isBrowser) {
      return (
        <BrowserView>
          <div className="App">
            <Header />
            {tutorialOpen ? <Tutorial openTutorial={this.openTutorial} /> : ""}
            <Pads drumPadPattern={drumPadPattern} padClicked={this.padClicked}/>
            <Info
              tutorial={this.openTutorial}
              MIDIName={MIDIName}
              MIDIConnect={this.connectMIDI}
            />
            <StepSequencer
              bpm={bpm}
              noteType={noteType}
              bars={bars}
              drumKit={drumKit}
              changeDrumKit={this.stepSequencerDrumKitChange}
              playButton={this.stepSequencerPlayStop}
              playing={playing}
              changeBPM={this.changeBPM}
              changeBars={this.changeBars}
              changeNoteType={this.changeNoteType}
            />
          </div>
        </BrowserView>
      );
    }
  }
}

export default App;
