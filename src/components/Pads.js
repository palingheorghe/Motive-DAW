import React, { Component } from 'react';
import Pad from './Pad';

export default class Pads extends Component {
  
  componentWillReceiveProps() {
    console.log('uite aici nebunie', this.props.MIDISignal)
  }
  
  render() {

    // const { MIDISignal } = this.props;

    return (
      <div className="Pads container">
        <div className="row justify-content-center mt-1 mt-sm-2">
          <Pad />
          <Pad />
          <Pad />
          <Pad />
        </div>
        <div className="row justify-content-center mt-1 mt-sm-1">
          <Pad />
          <Pad />
          <Pad />
          <Pad />
        </div>
        <div className="row justify-content-center mt-1 mt-sm-1">
          <Pad />
          <Pad />
          <Pad />
          <Pad />
        </div>
        <div className="row justify-content-center mt-1 mt-sm-1">
          <Pad />
          <Pad />
          <Pad />
          <Pad />
        </div>
      </div>
    );
  }
}