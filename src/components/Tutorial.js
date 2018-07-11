import React from 'react';
import PropTypes from 'prop-types';
const Tutorial = props => {
  return (
    <div className="Tutorial">
      <div className="Tutorial-close" onClick={() => props.openTutorial()}>x</div>
      <h2>This is a tutorial</h2>
      <p>
        This little tool was designed to keep you ocupied in a way no other
        beginner-friendly DAW could keep you. The main idea of this app is for you
        to create a drum pattern on which you could improvise later on your
        MIDI Drum Pad/Keyboard or even your computer's keyboard.
                <br />
        The next steps are going to explian to you how to use this app:
              </p>
      <ul>
        <li>Step Sequencer</li>
        <p>This is how u use it</p>
        <li>Drum Pad</li>
        <p>This is how u use it</p>
        <li>Keyboard</li>
        <p>This is how u use it</p>
        <li>MIDI Connect</li>
        <p>This is how u use it</p>
      </ul>
      <p>Copytight me and my braind and a lot of weed please give me more weed.</p>
    </div>
  );
}

Tutorial.propTypes = {
  openTutorial: PropTypes.func.isRequired,
}

export default Tutorial;