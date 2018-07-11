import React from 'react';
import PropTypes from 'prop-types';

export default function SteSeqMainTracks(props) {

  const { instruments } = props;

  return (
    <div className="StepSeq-Main--tracks">
      <div className="StepSeq-Main--track">{instruments[0]}</div>
      <div className="StepSeq-Main--track">{instruments[1]}</div>
      <div className="StepSeq-Main--track">{instruments[2]}</div>
      <div className="StepSeq-Main--track">{instruments[3]}</div>
    </div>
  );
}

SteSeqMainTracks.propTypes = {
  instruments: PropTypes.arrayOf(PropTypes.string),
}