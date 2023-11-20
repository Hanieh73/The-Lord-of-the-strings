import React, { useEffect, useRef } from 'react';
import { BackgroundMusic } from '../../assets'; // Adjust the import path based on your project structure

const SettingsPopup = ({ onClose }) => {

  return (
    <div className="settings-popup">
      <h2>Settings</h2>
      <p>
        <label>
          Background Sound
          <input
            type="checkbox"
            
            onChange={handleCheckboxChange}
          />
        </label>
      </p>
      <button>Save</button>
      <button onClick={onClose}>Close</button>
      <audio ref={audioRef} src={BackgroundMusic} />
    </div>
  );
};

export default SettingsPopup;
