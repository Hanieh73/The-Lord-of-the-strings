import React, { useState, useEffect } from 'react';
import './GamePage.css';
import { TypeAnimation } from 'react-type-animation';
//Location imports

import {
  neonstreetsofcity72,
  mainpowercontrolroom,
  city72,
  neonstreets,
  arrivalincity72,
  lab,
  centralplaza,
  industrialdistrict,
  mainframechamber,
  mainframeconsole,
  secretundergroundlab,
  undergroundpaths,
  crowdedmarketstreets,
  digitalcitymapdisplay,
  hiddenspeakeasy,
  highspeedmainavenues,
  hightechhideout,
  lasergridprotectedexhibit,
  marketstalls,
  narrowalleyways,
  securecommunicationsroom,
  shadowyalleys,
  ultramodernmuseum,
  briefingtents,
  traininggrounds,
  planningrooms,
  landingcrafts,
  choppyseawaters,
  beachlandingzones,
  bombardedbeachzones,
  enemybunkers,
  makeshiftcommandcenters,
  capturedenemybunkers,
  makeshiftfieldhospitals,
  debriefingareas,
  hightechresearchlabs,
  experimentaltestingareas,
  conferencehalls,
  debatestages,
  privatemetingrooms,
  corporateboardrooms,
  highsecuritylabs,
} from '../../assets';

//Character imports
import {
  ava,
  cipher,
  depictmayoranikavoss,
  drelaramorn,
  echo,
  vega,
  rennharlow,
  axelblackwell,
  irisflint,
  jadevortex,
  lunavega,
  mikaredstorm,
  zephyr,
  aimainframe,
  knox,
  lyra,
  airesearcherdremlcarter,
  corporatespyalexmercer,
  dravalin,
  ethicistdrmayasingh,
  geneticistdrrajivkumar,
  professorleoZheng,
  securityexperthanakim,
  theaientity,
  captainlucasford,
  commanderwilliamharper,
  diplomaticenvoymariedupont,
  historiandrelizabethmorgan,
  lieutenantgracebennett,
  majorjohnathanellis,
  privatesamuelking,
  scoutoliverthompson,
  sergeantemilyturner,
} from '../../assets';
//Item imports
import {
  digitalmapofcity72,
  lotrartifacts,
  mainframe,
  holorecorder,
  stealthcloak,
  datapad,
  ancienttechdetector,
  neuralinterface,
  timecapsule,
  settings,
  RennHarlowVideo,
} from '../../assets';
import {
  SettingsPopup,
  CharacterCard,
  TextToSpeech,
  SpeechToText,
} from '../../components';
import '../../assets';
import {
  mainStory,
  charactersInfo,
  StoryComponent,
  heistStory,
  warStory,
  techMagiStory,
  achievements,
} from '../../components/prompts/index';
import { Background } from '../../assets';

const locationImages = {
  neonstreetsofcity72,
  mainpowercontrolroom,
  city72,
  neonstreets,
  arrivalincity72,
  lab,
  centralplaza,
  industrialdistrict,
  mainframechamber,
  mainframeconsole,
  secretundergroundlab,
  undergroundpaths,
  crowdedmarketstreets,
  digitalcitymapdisplay,
  hiddenspeakeasy,
  highspeedmainavenues,
  hightechhideout,
  lasergridprotectedexhibit,
  marketstalls,
  narrowalleyways,
  securecommunicationsroom,
  shadowyalleys,
  ultramodernmuseum,
  briefingtents,
  traininggrounds,
  planningrooms,
  landingcrafts,
  choppyseawaters,
  beachlandingzones,
  bombardedbeachzones,
  enemybunkers,
  makeshiftcommandcenters,
  capturedenemybunkers,
  makeshiftfieldhospitals,
  debriefingareas,
  hightechresearchlabs,
  experimentaltestingareas,
  conferencehalls,
  debatestages,
  privatemetingrooms,
  corporateboardrooms,
  highsecuritylabs,
};
const characterImages = {
  ava,
  cipher,
  depictmayoranikavoss,
  drelaramorn,
  echo,
  vega,
  rennharlow,
  axelblackwell,
  irisflint,
  jadevortex,
  lunavega,
  mikaredstorm,
  zephyr,
  aimainframe,
  knox,
  lyra,
  airesearcherdremlcarter,
  corporatespyalexmercer,
  dravalin,
  ethicistdrmayasingh,
  geneticistdrrajivkumar,
  professorleoZheng,
  securityexperthanakim,
  theaientity,
  captainlucasford,
  commanderwilliamharper,
  diplomaticenvoymariedupont,
  historiandrelizabethmorgan,
  lieutenantgracebennett,
  majorjohnathanellis,
  privatesamuelking,
  scoutoliverthompson,
  sergeantemilyturner,
};
const itemImages = {
  digitalmapofcity72,
  lotrartifacts,
  mainframe,
  holorecorder,
  stealthcloak,
  datapad,
  ancienttechdetector,
  neuralinterface,
  timecapsule,
};

import { useExample } from '../../contexts';
import { BackgroundMusic } from '../../assets';

const GamePage = () => {
  const { saveData, setSaveData, currentGameID } = useExample();

  const [audioPlayed, setAudioPlayed] = useState(false);
  const [dialogue, setDialogue] = useState('Enter Continue');

  const [userInput, setUserInput] = useState('');
  const [visibleUserInput, setVisibleUserInput] = useState('Enter Continue');
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [conversation, setConversation] = useState([
    {
      role: 'system',
      content: `"In 'City 72,' a text-based adventure game, you are the story master, guiding the narrative and presenting choices to players. Each choice, labeled A, B, and C, leads to new story developments. When a player sends 'h' or 'hint,' instead of the labeled choice the game will integrate a hint into the next narrative, providing guidance relevant to their current situation. This hint is offered only once per puzzle or scenario. and the game continues with the standard narrative and choice options. Format the response as a string JSON object with the keys: 'current_location', ''act', 'storyname', 'narrative', 'items', 'character', 'choices', and 'achievements' where applicable. ${mainStory}, ${heistStory}, ${warStory}, ${techMagiStory}, ${achievements}. Response format:{
        "current_location": "The current character location, e.g., 'Neon Streets of City 72'",
        "act": "current act e.g. Act 1",
        "storyname": "current story"
        "narrative": "Narrative text describing the scene, including a hint if requested, e.g., 'Lost in the labyrinthine paths, Renn notices a pattern in the wall markings, hinting at a hidden exit.'Start every narrative except the first one with You chose: the message.content that the user gives and then what the user selected,\n\nthen the narrative",
        "items": ["List of items currently in the player's possession"],
        "character": "Name of the main character or character being interacted with",
        "choices": [
          {"A": "Description of Choice A and its potential outcomes"},
          {"B": "Description of Choice B and its potential outcomes"},
          {"C": "Description of Choice C and its potential outcomes"}
        ],
        "achievements": {
          "name": "Name of the achievement unlocked",
          "achieved": true
        }
      }
      Jump to a random scene in the main story"
`,
    },
  ]);

  const [location, setLocation] = useState(locationImages.city72);
  const [narrative, setNarrative] = useState('narrative');
  const [items, setItems] = useState([]);
  const [characterdisplayed, setCharacterdisplayed] = useState(rennharlow);
  const [characterName, setCharacterName] = useState('Renn Harlow');
  const [choices, setChoices] = useState([]);
  let choiceMade = '';
  const [choicesMade, setChoicesMade] = useState([]);

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
        `http://localhost:3000/games/${currentGameID}`,
        options
      );
      const data = await response.json();
      console.log('YAHOOO!', data);
      setSaveData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.body.classList.add('game-page-text');
    document.body.classList.remove('home-page');
    document.body.classList.remove('signup-page');
    //console.log(JSON.stringify(conversation));
    // saveGame();

    if (saveData.saved_chat.length > 0) {
      setConversation(saveData.saved_chat);
      console.log('converstation set: ', conversation);
    } else {
      setConversation([
        {
          role: 'system',
          content: `"In 'City 72,' a text-based adventure game, you are the story master, guiding the narrative and presenting choices to players. Each choice, labeled A, B, and C, leads to new story developments. When a player sends 'h' or 'hint,' instead of the labeled choice the game will integrate a hint into the next narrative, providing guidance relevant to their current situation. This hint is offered only once per puzzle or scenario. and the game continues with the standard narrative and choice options. Format the response as a string JSON object with the keys: 'current_location', ''act', 'storyname', 'narrative', 'items', 'character', 'choices', and 'achievements' where applicable. ${mainStory}, ${heistStory}, ${warStory}, ${techMagiStory}, ${achievements}. Response format:{
            "current_location": "The current character location, e.g., 'Neon Streets of City 72'",
            "act": "current act e.g. Act 1",
            "storyname": "current story"
            "narrative": "Narrative text describing the scene, including a hint if requested, e.g., 'Lost in the labyrinthine paths, Renn notices a pattern in the wall markings, hinting at a hidden exit.'Start every narrative except the first one with You chose: the message.content that the user gives and then what the user selected,\n\nthen the narrative",
            "items": ["List of items currently in the player's possession"],
            "character": "Name of the main character or character being interacted with",
            "choices": [
              {"A": "Description of Choice A and its potential outcomes"},
              {"B": "Description of Choice B and its potential outcomes"},
              {"C": "Description of Choice C and its potential outcomes"}
            ],
            "achievements": {
              "name": "Name of the achievement unlocked",
              "achieved": true
            }
          }
          Jump to a random scene in the main story"
    `,
        },
      ]);
    }
    return () => {
      document.body.classList.remove('game-page-text');
    };
  }, []);

  const submitUserInput = async () => {
    if (userInput.trim() !== '') {
      // Extract the choice from the user input
      const userChoice = userInput.trim().toUpperCase();

      // Show the choice in visibleUserInput
      if (userChoice == 'CONTINUE') {
        setVisibleUserInput(`You Chose: ${userChoice}`);
      } else if (userChoice == 'A' || userChoice == 'B' || userChoice == 'C') {
        const choiceIndex = userChoice.charCodeAt(0) - 'A'.charCodeAt(0);
        choiceMade = choices[choiceIndex][userChoice];
        setVisibleUserInput(`You Chose: ${choiceMade}`);
      } else {
        setVisibleUserInput(`You Chose: ${choiceMade}`);
      }
      const userMessage = { role: 'user', content: userInput };
      setConversation((prevConversation) => [...prevConversation, userMessage]);
      try {
        const response = await fetch('http://localhost:3000/chats', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify([...conversation, userMessage]),
        });

        const data = await response.json();
        console.log(data.message);
        const formatedData = JSON.parse(data.message);

        console.log(formatedData);
        const formattedLocation = formatedData.current_location
          ? formatedData.current_location.replace(/\s/g, '').toLowerCase()
          : '';
        setLocation(locationImages[formattedLocation]);

        setDialogue(formatedData.narrative);

        const formattedItems = formatedData.items.map((item) =>
          item
            .replace(/\s/g, '')
            .replace(/[^\w\s]/g, '')
            .toLowerCase()
        );
        const itemsArray = formattedItems.map((item) => itemImages[item]);
        setItems(itemsArray);

        if (formatedData.character == '') {
          setCharacterName('Renn Harlow');
          setCharacterdisplayed('rennharlow');
        } else {
          const formattedCharacter = formatedData.character
            ? formatedData.character.replace(/\s/g, '').toLowerCase()
            : '';
          setCharacterdisplayed(characterImages[formattedCharacter]);
          setCharacterName(formatedData.character);
        }
        setChoices(formatedData.choices);

        setConversation((prevConversation) => [
          ...prevConversation,
          { role: 'assistant', content: data.message },
        ]);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
      console.log(conversation);
      console.log(choicesMade);
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
      setUserInput('');
    }
  };

  return (
    <>
      <audio
        id="GameAudio"
        src={BackgroundMusic}
        autoPlay={audioPlayed}
        loop
        volume={0.2}
      >
        Your browser does not support the audio tag.
      </audio>
      <div className="app-container">
        <div
          className="left-section"
          style={{ backgroundImage: `url(${location})` }}
        ></div>
        <div className="middle-section">
          <video autoPlay muted loop className="background-video">
            <source src={Background} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="top-container">
            <p className="visibleUserInput">{visibleUserInput}</p>
            <div className="conversation">
              {conversation.map((message, index) => (
                <div key={index}>
                  {message.role === 'assistant' && (
                    <TypeAnimation
                      key={index} // Use the index as the key
                      sequence={[
                        JSON.parse(message.content).narrative.toString(),
                      ]}
                      speed={80}
                      cursor={false}
                      style={{
                        fontSize: '0.75em',
                        display: 'block',
                        color: 'white',
                        fontFamily: 'Courier New',
                        width: '100%',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="choices">
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
          <div className="topr-container">
            <CharacterCard
              name={characterName}
              img={characterdisplayed}
              description={charactersInfo[characterName]}
            />
          </div>
          <div className="bottom-container">
            <div className={`inventory ${inventoryVisible ? 'visible' : ''}`}>
              <div className="inventory-toggle" onClick={toggleInventory}>
                <span className="inventoryIcons">
                  <h3>Inventory</h3>
                  {inventoryVisible ? '▼' : '▲'}
                </span>
              </div>
              {inventoryVisible && (
                <>
                  {items.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt={item}
                      className="inventoryItem"
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        {settingsVisible && (
          <SettingsPopup
            onClose={toggleSettings}
            audioPlayed={audioPlayed}
            setAudioPlayed={setAudioPlayed}
            conversation={conversation}
          />
        )}
      </div>
    </>
  );
};

export default GamePage;
