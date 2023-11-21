import React, { useEffect, useRef } from 'react';
import { BackgroundMusic } from '../../assets'; // Adjust the import path based on your project structure

const SettingsPopup = ({ onClose, audioPlayed, setAudioPlayed }) => {
  let vid = document.getElementById("GameAudio");
  useEffect(() => {
    vid.muted = !audioPlayed; 
  }, [audioPlayed]);
  const handleCheckboxChange = () => {
    setAudioPlayed(!audioPlayed);}
  return (
    <div className="settings-popup">
      <h2>Settings</h2>
        <label className='checkbox-label'>
        <span style={{ marginRight: '20px' }}>Background Music</span>
          <input
            type="checkbox"
            defaultChecked={audioPlayed}
            onChange={handleCheckboxChange}
          />
        </label>
      <button>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SettingsPopup;
