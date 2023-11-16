import React, { useState, useEffect } from 'react';
import './GamePage.css';
import { TypeAnimation } from 'react-type-animation';
import { DigitalMap, Lab, LOTR_Artifacts, Mainframe, Recorder, settings, speaking, Ava, Ava2, RennHarlow } from '../../assets';
import { SettingsPopup, CharacterCard, LivesRemaining } from '../../components';

const GamePage = () => {
  const [dialogue, setDialogue] = useState('John Wick AKA the Boogeyman');
  const [userInput, setUserInput] = useState('');
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [livesRemaining, setLivesRemaining] = useState(3);
  const [conversation, setConversation] = useState([
    {
      role: 'system',
      content:
        'You are John Wick from the John Wick movies. You are to answer questions as this character. Do not break character.',
    },
  ]);

  const submitUserInput = async () => {
    if (userInput.trim() !== '') {
      const userMessage = { role: 'user', content: userInput };
      setConversation((prevConversation) => [...prevConversation, userMessage]);
      setUserInput('');

      try {
        const response = await fetch('http://localhost:3000/chats', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify([...conversation, userMessage]), // Use updated state
        });

        const data = await response.json();
        setDialogue(data.message);
        setConversation((prevConversation) => [
          ...prevConversation,
          { role: 'assistant', content: data.message },
        ]);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    }
  };

  const msg = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((voice) => voice.name === 'Microsoft Susan - English (United Kingdom)');

  msg.voice = selectedVoice;

  const speechHandler = (msg) => {
    msg.text = dialogue;
    window.speechSynthesis.speak(msg);
  };

  const toggleInventory = () => {
    setInventoryVisible(!inventoryVisible);
  };

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitUserInput();
    }
  };

  return (
    
    <div className="app-container">
      <div className="left-section"></div>
      <div className="middle-section">
        <div className="top-container">
          <TypeAnimation
              key={dialogue}
              sequence={[dialogue]}
              speed={10}
              style={{
                fontSize: '1em',
                display: 'block',
                minHeight: '200px',
                color: 'white',
                fontFamily: 'Courier New',
              }}
            />
          </div>
        <div className="bottom-container">
          <input
            className='user-input'
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
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
            <LivesRemaining 
            livesRemaining={livesRemaining}
            />
            <CharacterCard 
            name={"Renn Harlow"}
            img={RennHarlow}
            description={"An Adventurer"}
            />
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

export default GamePage;
