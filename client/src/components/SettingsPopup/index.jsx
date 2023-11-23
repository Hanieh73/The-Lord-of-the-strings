import React, { useEffect, useRef } from 'react';
import { BackgroundMusic } from '../../assets'; // Adjust the import path based on your project structure
import { useExample } from '../../contexts';
import { useNavigate } from 'react-router-dom';

const SettingsPopup = ({
  onClose,
  audioPlayed,
  setAudioPlayed,
  conversation,
}) => {
  const { currentGameID } = useExample();
  const navigate = useNavigate();

  let vid = document.getElementById('GameAudio');
  useEffect(() => {
    vid.muted = !audioPlayed;
  }, [audioPlayed]);

  async function saveGame() {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        saved_chat: conversation,
        items: [7, 3, 9, 5],
        score: 7395,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    try {
      const response = await fetch(
        `https://city-72-game.onrender.com/games/${currentGameID}`,
        options
      );
      const data = await response.json();
      console.log('YAHOOO!', data);
      // setSaveData(data);
      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckboxChange = () => {
    setAudioPlayed(!audioPlayed);
  };
  return (
    <div className="settings-popup">
      <h2>Settings</h2>
      <label className="checkbox-label">
        <span style={{ marginRight: '20px' }}>Background Music</span>
        <input
          type="checkbox"
          defaultChecked={audioPlayed}
          onChange={handleCheckboxChange}
        />
      </label>
      <button
        onClick={() => {
          saveGame();
        }}
      >
        Save
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SettingsPopup;
