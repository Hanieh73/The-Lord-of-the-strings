import React, { useEffect, useRef } from 'react';
import { BackgroundMusic } from '../../assets'; // Adjust the import path based on your project structure

const SettingsPopup = ({ onClose, audioPlayed, setAudioPlayed }) => {
  let vid = document.getElementById("GameAudio");

  // Use useEffect to update the muted property when audioPlayed changes
  useEffect(() => {
    vid.muted = !audioPlayed; // If audioPlayed is true, set muted to false, and vice versa
  }, [audioPlayed]);
  const handleCheckboxChange = () => {
    setAudioPlayed(!audioPlayed);}
  return (
    <div className="settings-popup">
      <h2>Settings</h2>
      <p>
        <label>
          Background Sound
          <input
            type="checkbox"
            defaultChecked={audioPlayed}
            onChange={handleCheckboxChange}
          />
        </label>
      </p>
      <button>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SettingsPopup;
