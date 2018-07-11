import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
// core components
import Button from './ControlBar-Button';

const SliderWithTooltip = createSliderWithTooltip(Slider);

class StepSeqControlBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dropDownValue: 'Emotional Sounds'
    }

    this.changeDropDown = this.changeDropDown.bind(this);
    this.openSettingsWindow = this.openSettingsWindow.bind(this);
  }

  changeDropDown(val) {
    this.setState({
      dropDownValue: val.label,
      settingsWindow: false
    });
    this.props.changeDrumKit(val.value);
  }

  openSettingsWindow() {
    this.setState({
      settingsWindow: !this.state.settingsWindow
    })
  }

  percentFormatter(v) {
    return `${v}`;
  }

  log(val) {
    console.log(val);
  }


  render() {
    const { bpm, bars, noteType, playButton, playing, changeBPM, changeBars, changeNoteType } = this.props;
    const style = { width: 160, margin: 5, marginLeft: 10, marginTop: 0 };
    const options = [
      {
        value: 'emotional_sounds', label: 'Emotional Sounds'
      },
      {
        value: 'blue_sounds', label: 'Blue Sounds'
      }
    ];
    const marks = {
      1: {
        style: {
          color: 'rgb(223, 135, 135)',
        },
        label: <strong>whole</strong>,
      },
      2:{
        style: {
          color: 'rgb(223, 135, 135)',
        },
        label: <strong>half</strong>,
      },
      4: {
        style: {
          color: 'rgb(223, 135, 135)',
        },
        label: <strong>quarter</strong>,
      },
      8: {
        style: {
          color: 'rgb(223, 135, 135)',
        },
        label: <strong>eighth</strong>,
      },
      16: {
        style: {
          color: 'rgb(223, 135, 135)',
        },
        label: <strong>sixteenth</strong>,
      },
    };
    return (
      <div className="StepSeq-ControlBar">
        <div className="row">
          <Button onClick={() => playButton()} className={`StepSeq-ControlBar-Button ${playing ? 'on' : ''}`} />
          <div className="StepSeq-ControlBar-Button">
            <div className="StepSeq-ControlBar-RecordSymbol">
            </div>
          </div>
        </div>
        <Dropdown options={options} onChange={this.changeDropDown} value={this.state.dropDownValue} placeholder="Select an option" />
        {this.state.settingsWindow ? (
          <div className="StepSeq-ControlBar-SettingsWindow">
            <div style={style}>
              <p>BPM</p>
              <SliderWithTooltip
                tipFormatter={this.percentFormatter}
                tipProps={{ overlayClassName: 'foo' }}
                defaultValue={bpm}
                onAfterChange={(val) => changeBPM(val)}
                min={60}
                max={160}
              />
              <p>Bars</p>
              <SliderWithTooltip
                tipFormatter={this.percentFormatter}
                tipProps={{ overlayClassName: 'foo' }}
                defaultValue={bars}
                onAfterChange={(val) => changeBars(val)}
                min={2}
                max={8}
              />
              <p>Note Type:</p>
              <Slider min={1}  max={16} marks={marks} step={null} onChange={(val) => changeNoteType(val)} defaultValue={noteType} />
            </div>
          </div>
        ) : ""}
        <div className="StepSeq-ControlBar-Button StepSeq-ControlBar-Button--settings" onClick={this.openSettingsWindow}>
          {`${bpm} ${bars} ${noteType}n`}
        </div>
      </div>
    );
  }
}



StepSeqControlBar.propTYpes = {
  bpm: PropTypes.number.isRequired,
  bars: PropTypes.number.isRequired,
  noteType: PropTypes.string.isRequired,
  playButton: PropTypes.func,
  playing: PropTypes.bool,
  changeBPM: PropTypes.func,
  changeBars: PropTypes.func,
  changeNoteType: PropTypes.func,
}

export default StepSeqControlBar;