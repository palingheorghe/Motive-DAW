import React from 'react';
import PropTypes from 'prop-types';

export default function Info(props) {
  const { tutorial, MIDIName, MIDIConnect } = props;

  function tutorialButton(e) {
    e.preventDefault();
    document.activeElement.blur();
    tutorial();
  }

  return (
    <div className="container mt-2">
      <div className="row">
        <p className="col-md-2 offset-md-2">MIDI Signal: {MIDIName}</p>
        <button className="MIDIConnectButton" onClick={() => MIDIConnect()}>connect</button>
        <button className="InfoTutorialButton offset-md-5" onClick={(e) => tutorialButton(e)}>
          <span className="thatSpan">?</span>
        </button>
      </div>
    </div>
  );
}

Info.propTypes = {
  tutorial: PropTypes.func,
  MIDIName: PropTypes.string,
  MIDIConnect: PropTypes.func,
};