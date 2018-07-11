import React from 'react';

function ButtonControl(props) {
  return (
    <div onClick={() => props.onClick()} className={props.className}>
      <svg width="15px" height="18px" viewBox="0 0 15 18" version="1.1">
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Play-Button" transform="translate(-7.000000, -4.000000)" fill="#FFFFFF" stroke="#000000">
            <g id="Path-4">
              <polygon points="21.4378621 12.2669961 8.40729813 5.35025134 8.40729813 20.9014425"></polygon>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default ButtonControl;