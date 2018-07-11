import React from 'react';

export default function Header() {
  return (
    <div className="container">
      <div className="row justify-content-sm-center">
        <p className="Title col-4 col-sm-4 col-md-3 col-lg-3 align-self-center">Motive</p>
        <div className="SaveSongInput col-8 col-sm-9 col-md-6 col-lg-6 align-self-center">
          <input
            type="text"
            placeholder="Insert your song name here..."
            className="SaveSongInput-input"
          />
          <button className="SaveSongInput-button" >save</button>
        </div>
        <div className="Profile col-1 col-sm-1 col-md-1 col-lg-2 offset-lg-1 align-self-center">
          <div className="Profile-MainMenu">
            P
          </div>
        </div>
      </div>
    </div>
  );
}