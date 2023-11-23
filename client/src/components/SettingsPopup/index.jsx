import React, { useEffect } from 'react';
import { BackgroundMusic } from '../../assets';

const SettingsPopup = ({ onClose, audioPlayed, setAudioPlayed }) => {
  useEffect(() => {
    const vid = document.getElementById("GameAudio");

    if (vid) {
      vid.muted = !audioPlayed;
    }
  }, [audioPlayed]);

  const handleCheckboxChange = () => {
    setAudioPlayed(!audioPlayed);
  };

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
