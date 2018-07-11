import React from 'react';
import PropTypes from 'prop-types';

// core components
import Main from './StepSeq-Main';
import ControlBar from './StepSeq-ControlBar';

export default function StepSequencer(props) {

  const { 
    bpm, 
    noteType, 
    bars, 
    playButton, 
    playing, 
    changeDrumKit, 
    drumKit, 
    changeBPM, 
    changeBars, 
    changeNoteType 
  } = props;

  return (
    <div className="StepSequencer">
      <ControlBar 
        bpm={bpm} 
        noteType={noteType} 
        bars={bars} 
        playButton={playButton} 
        playing={playing}
        changeDrumKit={changeDrumKit} 
        changeBPM={changeBPM}
        changeBars={changeBars}
        changeNoteType={changeNoteType}
      />
      <Main bars={bars} bpm={bpm} noteType={noteType} playing={playing} drumKit={drumKit}/>
    </div >
  );
}

StepSequencer.defaultProps = {
  bpm: 120,
  noteType: 4,
  bars: 4
};

StepSequencer.propTypes = {
  bpm: PropTypes.number.isRequired,
  noteType: PropTypes.number.isRequired,
  bars: PropTypes.number.isRequired,
  drumKit: PropTypes.string.isRequired,
  changeDrumKit: PropTypes.func,
  playButton: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  changeBPM: PropTypes.func,
  changeBars: PropTypes.func,
  changeNoteType: PropTypes.func,
};