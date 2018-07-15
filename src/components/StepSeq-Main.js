import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tone from 'tone';
// core components
import SteSeqMainTracks from './SteSeq-Main--Tracks';

// 1 bar = 4 beats

// TO DO : -- Sequence function needs to get the columns dynamically (NOT DONE)
//         -- change bpm/bars/timeSignature(sau poate tipul notelor ???? patrimi/optimi/shit like that) -- NU MERGE DIN PRIMA MAIT REBUIE SA SCHIMBI CEVA DUPA CARE FUNCTONEAZA
//         -- butonul de play trebuie sa se transforme in buton de pauza necesita stilizare
//         -- change drum kit ( GREUUU )
//         -- CERCETAT IN Tone.Buffer

class PlaylistMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matrix: [
        [0,0,0,0], // 1st bar
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0], // 2nd bar
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0], // 3rd bar
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0], // 4th bar
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
      ],
      column: 0,
      keys: new Tone.Players({
        kick: require(`../sounds/drum kits/emotional_sounds/Kick.wav`),
        snare: require(`../sounds/drum kits/emotional_sounds/Snare.wav`),
        hihat: require(`../sounds/drum kits/emotional_sounds/Hat.wav`),
        boom: require(`../sounds/drum kits/emotional_sounds/Tambourine.wav`),
      }).toMaster(),
      loop: new Tone.Sequence(
        (time, col) => {
          console.log('Step Sequencer started playing a loop');
          let column = this.state.matrix[col];
          this.setState({
            column: col //culoare pe step sequencer
          });
          for(let i = 0; i< 4; i++){
            if(column[i] === 1) 
              this.state.keys.get(this.noteNames[i]).start(time, 0, "32n", 0, 0.5);
          }
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], `4n`
      )
    };
    
    
    this.noteNames = ["kick", "snare", "hihat", "boom"];

    Tone.Transport.start();

    // NE MAI GANDIM CUM SCHIMBAM PACK-URILE

    Tone.Transport.bpm.value = this.props.bpm;

    this.createMatrix = this.createMatrix.bind(this);
    this.togglePad = this.togglePad.bind(this);

  }

  createMatrix(bars) { // initializam matricea 
    let newMatrix = [];

    for(let i = 0; i < bars*4; i++) {
      newMatrix.push([0,0,0,0]);
    }

    this.setState({
      matrix: newMatrix
    })
  }

  togglePad(group, pad) {
    const { matrix } = this.state;
    let newMatrix;
    console.log("Coloana si pad-ul: ", group, pad);
    newMatrix = matrix.slice(0);
    newMatrix[group][pad] = matrix[group][pad] === 1 ? 0 : 1;

    this.setState({
      matrix: newMatrix
    })
  }


  componentWillMount() {
    this.createMatrix(this.props.bars); // aceasta metoda se apeleaza inainte de randarea compoonentei
  }

  componentDidUpdate() {
    if(this.props.playing){
      this.state.loop.start();
    }else{
      this.state.loop.stop();
      console.log('Step Sequencer stopped playing');
    }
  }
  componentWillReceiveProps(props) {
    this.state.loop.stop();
   Tone.Transport.stop();
    this.setState({
      loop: new Tone.Sequence(
        (time, col) => {
          console.log('Step Sequencer started playing a loop');
          let column = this.state.matrix[col];
          this.setState({
            column: col //culoare pe step sequencer
          });
          for(let i = 0; i< 4; i++){
            if(column[i] === 1) 
              this.state.keys.get(this.noteNames[i]).start(time, 0, "32n", 0, 0.4);
          }
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], `${this.props.noteType}n`
      )
    })
    this.setState({
      keys: new Tone.Players({
        kick: require(`../sounds/drum kits/${this.props.drumKit}/Kick.wav`),
        snare: require(`../sounds/drum kits/${this.props.drumKit}/Snare.wav`),
        hihat: require(`../sounds/drum kits/${this.props.drumKit}/Hat.wav`),
        boom: require(`../sounds/drum kits/${this.props.drumKit}/Tambourine.wav`),
      }).toMaster()
    })
    Tone.Transport.bpm.value = props.bpm;
    Tone.Transport.start();
  }

  render() {
    const { matrix, column } = this.state;
    return (
      <div className="StepSeq-Main">
        <SteSeqMainTracks instruments={['kick', 'snare', 'hi-hat', 'clap']} />
        {
          matrix.map( (group, groupIndex) => {
            return (
              <div className={`StepSeq-Main--column ${column === groupIndex ? 'on': ''}`} key={`groupColumn-${groupIndex}`}>
                {
                  group.map( (pad, padIndex) => 
                    <div className={`StepSeq-Main--pad ${pad === 1 ? 'on' : ''}`} key={`StepSeqSquare-${padIndex}`} onClick={() => this.togglePad(groupIndex, padIndex)}/>
                   )
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

PlaylistMain.defaultProps = {
  bars: 4
}

PlaylistMain.propTypes = {
  bars: PropTypes.number.isRequired,
  bpm: PropTypes.number,
  playing: PropTypes.bool.isRequired,
  drumKit: PropTypes.string.isRequired,
  noteType: PropTypes.number,
};

export default PlaylistMain;