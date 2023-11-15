import React, { useState } from 'react';
import './GamePage2.css';
import { TypeAnimation } from 'react-type-animation';
import { DigitalMap, Lab, LOTR_Artifacts, Mainframe, Recorder, settings, speaking, Ava, Ava2 } from '../../assets';
import {SettingsPopup} from '../../components'; // Import the SettingsPopup component

const GamePage2 = () => {
  const [dialogue, setDialogue] = useState('The adventurer, Renn Harlow, arrives in City 72, intrigued by rumors of ancient technology and hidden truths.');
  const [userInput, setUserInput] = useState('');
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false); // State for settings visibility
  const livesRemaining = 3;
  const msg = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  console.log(voices);
  const selectedVoice = voices.find(voice => voice.name === 'Microsoft Susan - English (United Kingdom)');

  msg.voice = selectedVoice;

  const speechHandler = (msg) => {
    msg.text = dialogue;
    window.speechSynthesis.speak(msg);
  }

  const toggleInventory = () => {
    setInventoryVisible(!inventoryVisible);
  };

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };

  return (
    <div className="app-container">
      <div className="left-section"></div>
      <div className="middle-section">
        <div className="top-container">
          <TypeAnimation
            sequence={[
              dialogue,
            ]}
            speed={10}
            style={{ fontSize: '1em', display: 'block', minHeight: '200px', color: 'white', fontFamily: "Consolas, sans-serif" }}
          />
        </div>
        <div className="bottom-container">
          <input
            className='user-input'
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter something..."
          />
          <div className='settingsBar'>
            <button className='speechToText' onClick={() => speechHandler(msg)}>
              <img className='speechToTextIcon' src={speaking} />
            </button>
            <button className='speechToText' onClick={toggleSettings}>
              <img className='speechToTextIcon' src={settings} />
            </button>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className='top-container'>
          <div className="lives-remaining-container">
            {Array.from({ length: livesRemaining }, (_, index) => (
              <span key={index} role="img" aria-label="heart">❤️</span>
            ))}
          </div>
          <div className="character-info">
            <h3>Character Information:</h3>
            <p>Name: Dr. Ava Lin</p>
            <img className='characterImg' src={Ava} alt="picture of Dr. Ava Lin" />
            <p>A leading bio-engineer heading the development of enhancements</p>
          </div>
        </div>
        <div className='bottom-container'>
          <div className={`inventory ${inventoryVisible ? 'visible' : ''}`}>
            <div className="inventory-toggle" onClick={toggleInventory}>
              <span><h3>Inventory</h3>{inventoryVisible ? '▼' : '▲'}</span>
            </div>
            {inventoryVisible && (
              <>
                <img src={Recorder} alt="picture of inventory1" className='inventoryItem' />
                <img src={DigitalMap} alt="picture of inventory2" className='inventoryItem' />
                <img src={Mainframe} alt="picture of inventory3" className='inventoryItem' />
              </>
            )}
          </div>
        </div>
      </div>
      {settingsVisible && <SettingsPopup onClose={toggleSettings} />}
    </div>
  );
};

export default GamePage2;
