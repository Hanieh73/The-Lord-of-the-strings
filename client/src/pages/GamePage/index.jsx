import React, { useState, useEffect } from 'react';
import './GamePage.css';
import { TypeAnimation } from 'react-type-animation';
import {
  DigitalMap,
  Lab,
  LOTR_Artifacts,
  Mainframe,
  Recorder,
  settings,
  speaking,
  Ava,
  Ava2,
  RennHarlow,
} from '../../assets';
import {
  SettingsPopup,
  CharacterCard,
  LivesRemaining,
  SpeechToText,
} from '../../components';

const GamePage = () => {
  const [userInput, setUserInput] = useState('');
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [livesRemaining, setLivesRemaining] = useState(3);

  const [aiResponse, setAiResponse] = useState({});
  const [location, setLocation] = useState('');
  const [dialogue, setDialogue] = useState('Loading...');
  const [currentItems, setCurrentItems] = useState('');

  const [conversation, setConversation] = useState([
    {
      role: 'system',
      content: `I will provide a story setting, and your role is to act as the story master, guiding the narrative and presenting choices to the players. Each choice, labeled A, B, and C, leads to new developments in the story. 
      return the following object as your response {Location: return the location of the scene, Content: the next events in the story after a choice has been made, Characters: return the names of characters that appear on the story, Choices: return the list of choices the user can do, Items: return items user picks up}. All these should be characters, items, locations from the prompt below.
      Jump to straight to the story. Here's the story prompt: 
      
      Act 1: Arrival in City 72

      Introduction: The adventurer, Renn Harlow, arrives in City 72, intrigued by rumors of ancient technology and hidden truths.
      
      Exploration: Players navigate the neon-lit streets of City 72, interacting with characters like street vendors and corporate agents, and gathering information about the city's history and the rumored mainframe.
      
      Discovery: Renn discovers the mainframe's location in an abandoned sector beneath the city, guided by characters like Vega, the mysterious local guide.
      
      Key Locations: Central plaza, neon streets, underground paths.
      
      Items: Digital Map of City 72, Holo-Recorder.
      
      Renn Harlow - The main adventurer protagonist.

      Vega - Mysterious local guide in City 72.

      Dr. Elara Morn - Reclusive tech savant, knowledgeable about the mainframe.

      Cipher - Street-smart hacker ally.

      Knox - Black market dealer in relics.

      Lyra - Keeper of an ancient archive.

      AI Mainframe - Ancient, sentient AI narrating and guiding historical experiences.

      Mayor Anika Voss - Influential politician with a hidden agenda.

      Echo - Provides crucial information about current city affairs.

      Items: 
      Digital Map of City 72 - A tool for navigating the sprawling city.

      Holo-Recorder - Used for capturing clues and information.

      Access Keycard - Unlocks the path to the mainframe.

      Ancient Tech Detector - Helps locate hidden relics and the mainframe.

      Relic Container - Stores collected relics safely.

      Stealth Cloak - Used for sneaking into high-security areas.

      Neural Interface - Connects the adventurer to the mainframe for experiencing history.

      Data Pad - Contains historical data to influence present-day decisions.

      Holo-Disguise - Assists in blending in during sensitive missions.

      Time Capsule - Contains relics and records for future generations.

      Location:
      Central Plaza: A bustling hub of activity in the heart of City 72.

      Neon Streets: The vibrant, neon-drenched streets filled with diverse characters and hidden secrets.

      Underground Paths: Hidden passages beneath the city, leading to secretive and forgotten places.`,
    },
  ]);

  useEffect(() => {
    async function initialise() {
      try {
        const response = await fetch('http://localhost:3000/chats', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify([...conversation]),
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
    initialise();
  }, []);

  const submitUserInput = async () => {
    if (userInput.trim() !== '') {
      const userMessage = { role: 'user', content: userInput };
      setConversation((prevConversation) => [...prevConversation, userMessage]);
      setUserInput('');

      try {
        const response = await fetch('http://localhost:3000/chats', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify([...conversation, userMessage]),
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
      console.log(conversation);
    }
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
            speed={40}
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
            className="user-input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter something..."
          />
          <div className="settingsBar">
            <SpeechToText dialogue={dialogue} />
            <button className="speechToText" onClick={toggleSettings}>
              <img className="speechToTextIcon" src={settings} />
            </button>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="top-container">
          <LivesRemaining livesRemaining={livesRemaining} />
          <CharacterCard
            name={'Renn Harlow'}
            img={RennHarlow}
            description={'An Adventurer'}
          />
        </div>
        <div className="bottom-container">
          <div className={`inventory ${inventoryVisible ? 'visible' : ''}`}>
            <div className="inventory-toggle" onClick={toggleInventory}>
              <span>
                <h3>Inventory</h3>
                {inventoryVisible ? '▼' : '▲'}
              </span>
            </div>
            {inventoryVisible && (
              <>
                <img
                  src={Recorder}
                  alt="picture of inventory1"
                  className="inventoryItem"
                />
                <img
                  src={DigitalMap}
                  alt="picture of inventory2"
                  className="inventoryItem"
                />
                <img
                  src={Mainframe}
                  alt="picture of inventory3"
                  className="inventoryItem"
                />
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
