import React, { Component } from 'react';

import Header from './components/Header';
import Tutorial from './components/Tutorial';
import Pads from './components/Pads';
import Info from './components/Info';
import StepSequencer from './components/StepSequencer';

import {connectMIDI, MIDISignal} from './scripts/MIDIConnect';

console.log(MIDISignal);

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
      MIDIConnected: false,
      MIDIName: 'NO INPUT',
      drumKit: 'emotional_sounds',
      padKit: 'emotional_sounds',
      keyboardKit: '',
      nameOfTheSong: ''
    }
    this.stepSequencerPlayStop = this.stepSequencerPlayStop.bind(this);
    this.stepSequencerDrumKitChange = this.stepSequencerDrumKitChange.bind(this);
    this.changeBars = this.changeBars.bind(this);
    this.changeBPM = this.changeBPM.bind(this);
    this.changeNoteType = this.changeNoteType.bind(this);
    this.openTutorial = this.openTutorial.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) {
        this.stepSequencerPlayStop();
      }
    })
  }

  connectMIDI() {
    connectMIDI();
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

    const { bpm, noteType, bars, drumKit, playing, tutorialOpen, MIDIName } = this.state;

    return (
      <div className="App">
        <Header />
        {tutorialOpen ? <Tutorial openTutorial={this.openTutorial} /> : ""}
        <Pads MIDISignal={MIDISignal} />
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
    );
  }
}

export default App;
