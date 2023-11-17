import React, { useState, useEffect } from 'react';
import './GamePage.css';
import { TypeAnimation } from 'react-type-animation';
import { DigitalMap, Lab, LOTR_Artifacts, Mainframe, Recorder, settings, speaking, Ava, Ava2, RennHarlow, RennHarlowVideo } from '../../assets';
import { SettingsPopup, CharacterCard, TextToSpeech, SpeechToText } from '../../components';

const GamePage = () => {
  const [dialogue, setDialogue] = useState('The year is 3052 you have been sent as a future scout to investigate the lost communication from City 72. City 72 stands just off the English coast and is comprised of one tower raising 3 miles into the air. Since last Thursday all communication has ceased. As you fly closer to the city the auto defence torrents fail to recognise your union chip and begin to fire');
  const [userInput, setUserInput] = useState('');
  const [visibleUserInput, setVisibleUserInput] = useState('')
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [livesRemaining, setLivesRemaining] = useState(3);
  const [conversation, setConversation] = useState([
    {
      role: 'system',
      content:
        "I am going to give you a story prompt. You are then going to act in the role of the story master. The story masters job is to tell the story and give players choices (labelled A , B and C) , each choice will lead to new piece of story.  This is called a choice selection" +
        "Every 3 choice selections there should be a puzzle of some kind before the next choice this should be based on Maths GCSE try to work the puzzle into the story. "+
        "Users should be able to ask for hints." + 
        "Do not display hints unless people ask for them." + 
        "After 5 choice selections the story should end with a positive, neutral or negative ending based on choices made." +
        "Here is the prompt:" +
        "The year is 3052 you have been sent as a future scout to investigate the lost communication from City 72. City 72 stands just off the English coast and is comprised of one tower raising 3 miles into the air. Since last Thursday all communication has ceased. As you fly closer to the city the auto defence torrents fail to recognise your union chip and begin to fire'",
    },
  ]);

  const submitUserInput = async () => {
    if (userInput.trim() !== '') {
      const userMessage = { role: 'user', content: userInput };
      setConversation((prevConversation) => [...prevConversation, userMessage]);
      setVisibleUserInput(userInput);

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
          <p className='visibleUserInput'>{visibleUserInput}</p>
          <TypeAnimation
              key={dialogue}
              sequence={[dialogue]}
              speed={80}
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
            <TextToSpeech dialogue={dialogue} />
            <button className='toolBar' onClick={toggleSettings}>
              <img className='toolBarIcon' src={settings} />
            </button>
            <SpeechToText setUserInput={setUserInput} submitUserInput={submitUserInput} />
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className='top-container'>
            <CharacterCard 
            name={"Renn Harlow"}
            VideoSrc={RennHarlowVideo}
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
