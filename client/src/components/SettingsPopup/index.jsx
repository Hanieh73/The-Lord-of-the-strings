import React from 'react';

const SettingsPopup = ({ onClose }) => {
  return (
    <div className="settings-popup">
      <h2>Settings</h2>
      <p>Volume</p>
      <button>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SettingsPopup;
