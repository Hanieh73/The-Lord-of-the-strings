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
  TextToSpeech,
  SpeechToText,
} from '../../components';

const mainStory =
  "Main Story of City 72 Adventure\n\nAct 1: Arrival in City 72\n\n- Introduction: The adventurer, Renn Harlow, arrives in City 72, intrigued by rumors of ancient technology and hidden truths.\n- Exploration: Players navigate the neon-lit streets of City 72, interacting with characters like street vendors and corporate agents, and gathering information about the city's history and the rumored mainframe.\n- Discovery: Renn discovers the mainframe's location in an abandoned sector beneath the city, guided by characters like Vega, the mysterious local guide.\n- Key Locations: Central plaza, neon streets, underground paths.\n- Items: Digital Map of City 72, Holo-Recorder.\n\nAct 2: The Mainframe and the Relics\n\n- Revelation: The mainframe, an ancient AI, is discovered in a secret underground lab. It's a repository of historical data and experiences.\n- First Contact: The AI communicates with Renn, expressing a desire to share the stories within the relics.\n- Gathering Relics: Renn seeks relics across City 72, facing puzzles, negotiations, or confrontations.\n- Key Locations: Industrial district, underground lab, mainframe chamber.\n- Items: Access Keycard, Ancient Tech Detector.\n\nAct 3: Unlocking the Past\n\n- Activation: Each relic, connected to the mainframe, unlocks a unique story from the past.\n- Choices and Consequences: Decisions impact both the historical stories and Renn's understanding of City 72's history.\n- Unraveling Secrets: Renn uncovers narratives about City 72's formation and the mainframe's origins.\n- Key Locations: Virtual reality pods, historical data banks.\n- Items: Neural Interface.\n\nAct 4: The Present Echoes the Past\n\n- Integration: Past experiences influence Renn's present interactions, creating new pathways and alliances in City 72.\n- Revelation of Purpose: The mainframe's intention is revealed, potentially guiding someone to alter the city's future.\n- Climactic Decision: Renn makes a critical decision shaping City 72's future, influenced by past lessons.\n- Key Locations: Political centers, key landmarks.\n- Items: Data Pad, Holo-Disguise.\n\nEpilogue\n\n- Reflections and Consequences: The game concludes with City 72 reflecting the changes brought by Renn's choices, leading to various endings.\n- Conclusion: The story provides a rich context for the player, intertwining Renn's journey with City 72's history, setting the stage for the three branching stories experienced through the relics.\n\nItems Description:\n\n- Digital Map of City 72: Helps navigate the sprawling cyberpunk city.\n- Holo-Recorder: Captures clues and information.\n- Access Keycard: Unlocks the path to the mainframe.\n- Ancient Tech Detector: Helps locate hidden relics and the mainframe.\n- Relic Container: Safely stores collected relics.\n- Stealth Cloak: Used for sneaking into high-security areas.\n- Neural Interface: Connects the adventurer to the mainframe for experiencing history.\n- Data Pad: Contains historical data to influence present-day decisions.\n- Holo-Disguise: Assists in blending in during sensitive missions.\n- Time Capsule: Contains relics and records for future generations.\n\nLocations Description:\n\n- Central Plaza: A bustling hub of activity in the heart of City 72.\n- Neon Streets: Vibrant, neon-drenched streets filled with diverse characters and hidden secrets.\n- Underground Paths: Hidden passages beneath the city, leading to secretive and forgotten places.\n- Industrial District: Decrepit part of the city, housing abandoned factories and warehouses.\n- Secret Underground Lab: Hidden laboratory, home to the ancient mainframe.\n- Mainframe Chamber: Central location where the mainframe is housed, filled with advanced technology.\n\nCharacters Description:\n\n- Renn Harlow: Dynamic, resourceful adventurer. Skilled in navigating through the cyberpunk city and uncovering its secrets.\n- Vega: Mysterious guide with deep knowledge of City 72's hidden truths. Enigmatic and knowledgeable.\n- Dr. Elara Morn: Reclusive tech savant. Brilliant mind with expertise in ancient technology and the mainframe.\n- Cipher: Street-smart hacker with a rebellious edge. Savvy in digital espionage and hacking.\n- Mayor Anika Voss: Charismatic and influential politician. Holds significant power and ambition within City 72.\n- Echo: Well-connected informant. Resourceful and knowledgeable about the city's affairs.";

const GamePage = () => {
  const [dialogue, setDialogue] = useState('John Wick AKA the Boogeyman');
  const [userInput, setUserInput] = useState('');
  const [visibleUserInput, setVisibleUserInput] = useState('');
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
      setVisibleUserInput(userInput);

      try {
        const response = await fetch(
          'https://city-72-wez6.onrender.com/chats',
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify([...conversation, userMessage]),
          }
        );

        const data = await response.json();
        console.log(data.message);
        const formatedData = JSON.parse(data.message);
        console.log(formatedData);
        console.log(formatedData.currentLocation);
        setLocation(formatedData.currentLocation);
        setDialogue(formatedData.narrative);
        setItems(formatedData.items);
        setCharacterdisplayed(formatedData.character);
        setChoices(formatedData.choices);
        // setDialogue(data.message);
        setConversation((prevConversation) => [
          ...prevConversation,
          { role: 'assistant', content: data.message },
        ]);
        setUserInput('');
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
          <p className="visibleUserInput">{visibleUserInput}</p>
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
            <SpeechToText userInput={userInput} setUserInput={setUserInput} />
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
