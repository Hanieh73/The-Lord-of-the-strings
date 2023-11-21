import React, { useState, useEffect } from 'react';
import './GamePage.css';
import { TypeAnimation } from 'react-type-animation';
//Location imports
import {city72, neonstreets, arrivalincity72, lab, centralplaza, industrialdistrict, mainframechamber, mainframeconsole, secretundergroundlab, undergroundpaths, virtualrealitypod} from '../../assets'
//Character imports
import {ava, cipher, depictmayoranikavoss, drelaramorn, echo, vega, rennharlow} from '../../assets'
//Item imports
import { digitalmapofcity72, lotrartifacts, mainframe, holorecorder,stealthcloak, datapad, ancienttechdetector, neuralinterface, timecapsule, settings, RennHarlowVideo } from '../../assets';
import { SettingsPopup, CharacterCard, TextToSpeech, SpeechToText} from '../../components';
import '../../assets'
import { mainStory, charactersInfo, StoryComponent, heistStory, warStory, techMagiStory, achievements } from '../../components/prompts/index'

const locationImages = {
  city72, neonstreets, arrivalincity72, lab, centralplaza, industrialdistrict, mainframechamber, mainframeconsole, secretundergroundlab, undergroundpaths, virtualrealitypod
};
const characterImages = {
  ava, cipher, depictmayoranikavoss, drelaramorn, echo, vega, rennharlow
}
const itemImages = {
  digitalmapofcity72, lotrartifacts, mainframe, holorecorder,stealthcloak, datapad, ancienttechdetector, neuralinterface, timecapsule
}


import { useExample } from '../../contexts';



const GamePage = () => {
  const [dialogue, setDialogue] = useState('enter continue');
  const [userInput, setUserInput] = useState('');
  const [visibleUserInput, setVisibleUserInput] = useState('');
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [conversation, setConversation] = useState([
    {
      role: 'system',
      content: `I will provide a story setting, and your role is to act as the story master, guiding the narrative and presenting choices to the players. Each choice, labeled A, B, and C, leads to new developments in the story. Format the response JSON object with the keys: 'current_location', 'narrative', 'items', 'character', 'choices'. Here's the story prompt: ${mainStory}, ${heistStory}, ${warStory}, ${techMagiStory}, ${achievements} \n\nResponse format:\n\n{\n  'currentLocation': 'the current character location',\n'narrative': 'Approaching City 72, athe adventurer turned to the crowded streets.',\n'items': ['List of currently possessed items'],\n'character': 'Main character name or name of character being interacted with by main character',\n'choices': [\n{'A': 'Choice A description'},\n{'B': 'Choice B description'},\n{'C': 'Choice C description'}\n]\n }`,
    },
  ]);

  const [location, setLocation] = useState(locationImages.city72)
  const [narrative, setNarrative] = useState('narrative')
  const [items, setItems] = useState([])
  const [characterdisplayed, setCharacterdisplayed] = useState(rennharlow)
  const [characterName, setCharacterName] = useState('Renn Harlow')
  const [choices, setChoices] = useState([]);
  // const { currentGameID } = useExample();
  // const [saveData, setSaveData] = useState();

  // async function grabSaveData() {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/progress/game/${currentGameID}`
  //     );
  //     const data = await response.json();

  //     setSaveData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function saveGame() {
  //   const options = {
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //       //CHANGE TO APPROPRIATE DATA FOR UPDATE
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   };

  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/games/${currentGameID}`,
  //       options
  //     );
  //     const data = await response.json();

  //     setSaveData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  const submitUserInput = async () => {
    if (userInput.trim() !== '') {
      const userMessage = { role: 'user', content: userInput };
      setConversation((prevConversation) => [...prevConversation, userMessage]);
      setVisibleUserInput(userInput);

      try {
        const response = await fetch('https://city-72-wez6.onrender.com/chats', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify([...conversation, userMessage]),
        });

        const data = await response.json();
        console.log(data.message)
        const formatedData = JSON.parse(data.message)

        console.log(formatedData)
        const formattedLocation = formatedData.current_location ? formatedData.current_location.replace(/\s/g, '').toLowerCase() : '';
        setLocation(locationImages[formattedLocation]);
        console.log('Formatted Location:', formattedLocation.toString());
        console.log('Location Image:', locationImages[formattedLocation]);

        setDialogue(formatedData.narrative)

        const formattedItems = formatedData.items.map(item => item.replace(/\s/g, '').replace(/[^\w\s]/g, '').toLowerCase())
        const itemsArray = formattedItems.map(item => itemImages[item]);
        setItems(itemsArray);

        const formattedCharacter = formatedData.character ? formatedData.character.replace(/\s/g, '').toLowerCase() : '';
        setCharacterdisplayed(characterImages[formattedCharacter])
        setCharacterName(formatedData.character)

        setChoices(formatedData.choices)
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
      <div className="left-section" style={{backgroundImage: `url(${location})`}}></div>
      <div className="middle-section">
        <div className="top-container">
          <p className='visibleUserInput'>{visibleUserInput}</p>
          <div className="dialogue">
          <TypeAnimation
              key={dialogue}
              sequence={[dialogue]}
              speed={80}
              style={{
                fontSize: '1em',
                display: 'block',
                minHeight: '375px',
                color: 'white',
                fontFamily: 'Courier New',
              }}
            />
          </div>
          <div className='choices'>
          {choices.map((choice, index) => (
            <div key={index} className={`choice${index + 1}`}>
              <p>{Object.keys(choice)[0]}</p>
              <p>{choice[Object.keys(choice)[0]]}</p>
            </div>
          ))}
          </div>
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
            <TextToSpeech dialogue={dialogue} />
            <button className="toolBar" onClick={toggleSettings}>
              <img className="toolBarIcon" src={settings} />
            </button>
            <SpeechToText userInput={userInput} setUserInput={setUserInput} />
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className='topr-container'>
            <CharacterCard 
            name={characterName}
            // VideoSrc={RennHarlowVideo}
            img={characterdisplayed}
            description={charactersInfo[characterName]}
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
              {items.map((item, index) => (
                <img key={index} src={item} alt={item} className='inventoryItem' />
              ))} 
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
