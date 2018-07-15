import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Pads extends Component {

  render() {
     const { drumPadPattern, padClicked } = this.props;
    return (
      <div className="Pads container">
        {
          drumPadPattern.map( (group, groupIndex) => {
            return (
              <div className={`row justify-content-center mt-1 mt-sm-2`} key={`groupPadColumn-${groupIndex}`}>
                {
                  group.map( (pad, padIndex) => <div 
                                                  className={`Pad ${pad === 1 ? 'PadActive ' : ''}mx-1`} 
                                                  key={`Pad-${padIndex}`} 
                                                  onMouseDown={() => padClicked(groupIndex, padIndex, 1)}
                                                  onMouseUp={() => padClicked(groupIndex, padIndex, 0)}
                                                />)
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

Pads.propTypes = {
  drumPadPattern: PropTypes.arrayOf(PropTypes.array).isRequired,
  padClicked: PropTypes.func,
}