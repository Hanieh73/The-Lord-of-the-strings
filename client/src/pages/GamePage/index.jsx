import React, { useState, useEffect } from 'react';
import './GamePage.css';
import { TypeAnimation } from 'react-type-animation';
//Location imports

import {virtualrealitypods, neonstreetsofcity72,mainpowercontrolroom, city72, neonstreets, arrivalincity72, lab, centralplaza, industrialdistrict, mainframechamber, mainframeconsole, secretundergroundlab, undergroundpaths,crowdedmarketstreets, digitalcitymapdisplay,hiddenspeakeasy,highspeedmainavenues,hightechhideout,lasergridprotectedexhibit,marketstalls,narrowalleyways,securecommunicationsroom,shadowyalleys,ultramodernmuseum,briefingtents,traininggrounds,planningrooms,landingcrafts,choppyseawaters,beachlandingzones,bombardedbeachzones,enemybunkers,makeshiftcommandcenters,capturedenemybunkers,makeshiftfieldhospitals,debriefingareas,hightechresearchlabs,experimentaltestingareas,conferencehalls,debatestages,privatemetingrooms,corporateboardrooms,highsecuritylabs } from '../../assets'

//Character imports
import {ava,cipher,depictmayoranikavoss,drelaramorn,echo,vega,rennharlow,axelblackwell, irisflint, jadevortex, lunavega, mikaredstorm, zephyr,aimainframe,knox,lyra,airesearcherdremlcarter,corporatespyalexmercer,dravalin,ethicistdrmayasingh,geneticistdrrajivkumar,professorleoZheng,securityexperthanakim, theaientity,captainlucasford,commanderwilliamharper,diplomaticenvoymariedupont,historiandrelizabethmorgan,lieutenantgracebennett,majorjohnathanellis,privatesamuelking,scoutoliverthompson,sergeantemilyturner
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
  speaking,
  PlayButton,
  StopButton
} from '../../assets';
import {
  SettingsPopup,
  CharacterCard,
  TextToSpeech,
  SpeechToText,
} from '../../components';
import '../../assets';

import { Background } from '../../assets';
const mainStory =  `City 72 Main Story: Summary
  Core Information:
  Educational Focus: General Knowledge (GCSE Level).
  Main Objective: Uncover the secrets of City 72 and understand its past.
  Act 1: Arrival in City 72
  Setting: The vibrant, diverse streets of City 72.
  Key Characters:
  Renn Harlow (protagonist) - A curious adventurer exploring the city.
  Vega - A mysterious local guide who offers insights into the city’s hidden secrets.
  Dr. Elara Morn - A reclusive tech savant with knowledge about the city's ancient technology.
  Cipher - A street-smart hacker who becomes an ally to Renn.
  Knox - A black market dealer known for trading in relics and information.
  Key Items: Digital Map of City 72, Holo-Recorder.
  Objective: Navigate through City 72, interact with key characters to gather information about the city's history, and uncover the whereabouts of the ancient mainframe.
  Act 2: The Mainframe and the Relics
  Setting: Secretive locations within City 72 and the mainframe's hidden chamber.
  Key Characters: Renn Harlow, AI Mainframe.
  Key Items: Access Keycard, Ancient Tech Detector.
  Objective: Locate the mainframe and uncover relics across the city, revealing historical data.
  Act 3: Unlocking the Past
  Setting: Virtual reality pods, historical data banks.
  Key Characters: Renn Harlow, AI Mainframe.
  Key Items: Neural Interface.
  Objective: Experience unique stories from the past by connecting relics to the mainframe.
  Act 4: The Present Echoes the Past
  Setting: Prominent locations in City 72.
  Key Characters: Renn Harlow, Mayor Anika Voss, Echo.
  Key Items: Data Pad, Holo-Disguise.
  Objective: Influence present-day City 72 using insights gained from past experiences.
  Epilogue
  Setting: City 72 reflecting the impact of Renn's choices.
  Objective: Achieve various endings based on decisions throughout the game.
  Conclusion:
  The main story of City 72 intertwines Renn's journey with the city's history. Decisions in the main and mini-stories (discovered through relics) significantly influence the understanding and future of City 72.`;


const charactersInfo = {
  
    "Renn Harlow": "Dynamic, resourceful adventurer. Skilled in navigating through the cyberpunk city and uncovering its secrets.",
    "Vega": "Mysterious guide with deep knowledge of City 72's hidden truths. Enigmatic and knowledgeable.",
    "Dr. Elara Morn": "Reclusive tech savant. Brilliant mind with expertise in ancient technology and the mainframe.",
    "Cipher": "Street-smart hacker with a rebellious edge. Savvy in digital espionage and hacking.",
    "Mayor Anika Voss": "Charismatic and influential politician. Holds significant power and ambition within City 72.",
    "Echo": "Well-connected informant. Resourceful and knowledgeable about the city's affairs.",
    "Mika Redstorm": "Key informant with insights into the city's underworld. Resourceful and cunning.",
    "Axel Blackwell": "Mastermind of the heist. Strategic thinker and planner.",
    "Jade Vortex": "Security expert specializing in infiltration and tech. Analytical and detail-oriented.",
    // "Echo": "Tech-savvy hacker, crucial for information gathering and digital support.",
    "Zephyr": "Stealth specialist with expertise in disabling security systems.",
    "Iris Flint": "Safe cracking expert, skilled in breaking into high-security vaults.",
    "Luna Vega": "Escape driver, adept at high-speed chases and evasive maneuvers.",
    "Captain Rhys Dalton": "Determined police officer. Persistent in thwarting criminal activities.",
    "Major Johnathan Ellis": "Intelligence officer, strategic and serious, focused on war strategies.",
    "Sergeant Emily Turner": "Drill sergeant, authoritative and commanding, responsible for troop training.",
    "Commander William Harper": "Naval commander, leads with courage and determination.",
    "Lieutenant Grace Bennett": "Communications expert, critical in maintaining lines of communication.",
    "Private Samuel King": "Lone survivor, resilient and resourceful in challenging situations.",
    "Captain Lucas Ford": "Tactical leader, excels in strategizing and leading operations.",
    "Scout Oliver Thompson": "Recon expert, adept at stealth and gathering crucial intel.",
    "Dr. Ava Lin": "Leading bio-engineer, innovative in developing cybernetic enhancements.",
    "Professor Leo Zheng": "Neurobiologist, expert in integrating technology with the human nervous system.",
    "Ethicist Dr. Maya Singh": "Ethics specialist, challenges the moral implications of human augmentation.",
    "Geneticist Dr. Rajiv Kumar": "Geneticist, explores the genetic impact of cybernetics on human evolution.",
    "Corporate Spy Alex Mercer": "Sly and cunning, attempts to steal groundbreaking research.",
    "Security Expert Hana Kim": "Protects sensitive information, specialized in security measures.",
    "AI Researcher Dr. Emily Carter": "Studies the integration of AI with biological systems.",
    "The AI Entity": "Newly conscious AI, interacts with the lab's work and poses ethical questions."
}

const heistStory = ` The Heist of the Neon Symphony: Summary
  Core Information:
  Educational Focus: GCSE Level Maths Puzzles (Geometric sequences, Quadratic equations, Trigonometry, Coordinate geometry, Graph theory, Probability).
  Main Objective: To plan and execute a heist to secure the Neon Symphony, using mathematical skills to overcome various challenges.
  Act 1: Gathering Information
  Setting: Night market in City 72.
  Key Characters: Mika Redstorm (provides clues), Axel Blackwell (decodes information).
  Key Items: Neon Decoder (decodes numerical codes).
  Puzzle: Decoding numerical codes using geometric sequences.
  Act 2: Planning the Heist
  Setting: High-tech hideout.
  Key Characters: Axel Blackwell (planner), Jade Vortex (security insights), Echo (hacking and analysis).
  Key Items: Heist Planner, Hacker's Toolkit.
  Puzzle: Planning the heist using quadratic equations.
  Act 3: Executing the Heist
  Setting: Ultra-modern museum.
  Key Characters: Axel Blackwell, Zephyr (Stealth Approach), Iris Flint (Inside Job), Luna Vega (High Octane Heist).
  Key Items: Stealth Suit, Laser Disruptor, Safe Cracker, Power Surge Device.
  Puzzle: Overcoming security challenges using trigonometry and coordinate geometry.
  Act 4: The Escape
  Setting: Streets of City 72.
  Key Characters: Axel Blackwell, Captain Rhys Dalton (pursuer), Luna Vega.
  Key Items: High-Speed Hoverbike, Escape Goggles.
  Puzzle: Calculating escape routes with graph theory and probability.
  Conclusion:
  The outcome of the heist depends on the player's ability to solve math puzzles, impacting the main story of City 72. Success or failure reveals hidden aspects of City 72's past and shapes the narrative.

`;

const warStory = `Echoes of the Forgotten War: Summary
  Core Information:
  Educational Focus: History Knowledge (D-Day Landings).
  Main Objective: Understand and reenact strategies of the Normandy landings.
  Act 1: Prelude to D-Day
  Setting: Military camp in England.
  Key Characters: Major Johnathan Ellis (intelligence officer), Sergeant Emily Turner (drill sergeant).
  Key Items: Historical Documents, Strategy Maps.
  Puzzle: Arranging historical events leading up to D-Day.
  Act 2: The Invasion Begins
  Setting: English Channel to Normandy beaches.
  Key Characters: Commander William Harper, Lieutenant Grace Bennett, Private Samuel King.
  Key Items: Historical Maps and Tide Tables, Encryption Tools, Minefield Maps.
  Puzzle: Navigating the landing craft using historical maps and tide tables.
  Act 3: Securing the Beachhead
  Setting: Beach under enemy fire.
  Key Characters: Captain Lucas Ford, Diplomatic Envoy Marie Dupont, Scout Oliver Thompson.
  Key Items: Tactical Unit Cards, Paratrooper Communication Gear, Historical Landmark Guide.
  Puzzle: Resource and manpower allocation based on historical unit strengths and weaknesses.
  Act 4: The Aftermath
  Setting: Secured position inland.
  Key Characters: Historian Dr. Elizabeth Morgan.
  Key Items: Report Forms, Casualty and Equipment Lists.
  Puzzle: Compiling a report based on the day's events, matching historical facts.
  Conclusion:
  Players apply historical knowledge and strategic thinking, impacting the main story of City 72. The outcome provides insights into the Normandy landings and World War II.
  `;

const techMagiStory = `Rise of the Tech-Magi: Summary
Core Information:
Educational Focus: Biology Knowledge (GCSE Level).
Main Objective: Navigate the ethical and technical challenges of cybernetic enhancements.
Act 1: The Genesis of Innovation
Setting: Clandestine laboratory beneath City 72.
Key Characters: Dr. Ava Lin, Professor Leo Zheng.
Key Items: Cybernetic Prototypes, Anatomical Models.
Puzzle: Designing cybernetic enhancements integrating with human biology.
Act 2: Ethical Boundaries
Setting: Scientific symposium.
Key Characters: Ethicist Dr. Maya Singh, Geneticist Dr. Rajiv Kumar.
Key Items: Presentation Toolkit, Research Papers on Genetics.
Puzzle: Creating a presentation on the biological impact of cybernetics.
Act 3: Corporate Intrigue
Setting: Corporate boardrooms and meeting places.
Key Characters: Corporate Spy Alex Mercer, Security Expert Hana Kim.
Key Items: Encoded Documents, Decryption Software.
Puzzle: Decoding stolen documents containing biological data.
Act 4: The AI Factor
Setting: AI development wing.
Key Characters: AI Researcher Dr. Emily Carter, The AI Entity.
Key Items: AI Algorithms, Biology Textbooks.
Puzzle: Understanding and influencing AI behavior using biological principles.
Conclusion:
The story outcome depends on players' biology knowledge and ethical choices. Successful cybernetic integration could lead to a new era, while failure poses consequences.
`


const achievements = {
    "Main Storyline Achievements": [
        {
            "name": "Neon Navigator",
            "description": "Successfully navigate the neon streets of City 72 without getting lost.",
            "achieved": false
        },
        {
            "name": "Mainframe Master",
            "description": "Unlock all historical stories in the mainframe.",
            "achieved": false
        },
        {
            "name": "Cyber Sleuth",
            "description": "Uncover every hidden secret in City 72.",
            "achieved": false
        },
        {
            "name": "Diplomat of the Dark",
            "description": "Successfully negotiate with all factions in City 72.",
            "achieved": false
        },
        {
            "name": "Futuristic Historian",
            "description": "Complete all historical scenarios in the mainframe.",
            "achieved": false
        },
        {
            "name": "Decisive Leader",
            "description": "Make a critical decision that significantly alters the course of City 72's future.",
            "achieved": false
        },
        {
            "name": "Guardian of the Past",
            "description": "Preserve the integrity and history of City 72.",
            "achieved": false
        }
    ],
    "The Heist of the Neon Symphony Achievements": [
        {
            "name": "Stealthy Steps",
            "description": "Complete the heist using the Stealth Approach without triggering any alarms.",
            "achieved": false
        },
        {
            "name": "Inside Job Mastermind",
            "description": "Successfully perform the heist using the Inside Job approach without getting caught.",
            "achieved": false
        },
        {
            "name": "High-Octane Heister",
            "description": "Complete the High Octane Heist within a record time.",
            "achieved": false
        },
        {
            "name": "Code Cracker Extraordinaire",
            "description": "Solve all puzzles in the heist without hints.",
            "achieved": false
        },
        {
            "name": "Artful Dodger",
            "description": "Evade Captain Rhys Dalton in the final chase.",
            "achieved": false
        },
        {
            "name": "Neon Nightcrawler",
            "description": "Navigate the night market flawlessly to gather all necessary information.",
            "achieved": false
        }
    ],
    "Echoes of the Forgotten War Achievements": [
        {
            "name": "Strategic Genius",
            "description": "Perfectly execute the D-Day strategy without any major setbacks.",
            "achieved": false
        },
        {
            "name": "Lone Survivor",
            "description": "Successfully complete the Lone Survivor scenario without losing any troop.",
            "achieved": false
        },
        {
            "name": "Diplomatic Victory",
            "description": "Achieve success in the Diplomatic Resolution without resorting to combat.",
            "achieved": false
        },
        {
            "name": "War Historian",
            "description": "Compile a flawless report on the day's events in the aftermath.",
            "achieved": false
        },
        {
            "name": "Beachhead Hero",
            "description": "Secure the beachhead with minimal casualties.",
            "achieved": false
        },
        {
            "name": "Master Tactician",
            "description": "Optimize resource allocation in the Commando Mission to achieve the best outcome.",
            "achieved": false
        }
    ],
    "Rise of the Tech-Magi Achievements": [
        {
            "name": "Innovation Pioneer",
            "description": "Successfully develop and integrate a new cybernetic enhancement.",
            "achieved": false
        },
        {
            "name": "Ethical Guardian",
            "description": "Navigate all ethical dilemmas without compromising moral standards.",
            "achieved": false
        },
        {
            "name": "Corporate Espionage Thwarted",
            "description": "Prevent Alex Mercer from stealing any research.",
            "achieved": false
        },
        {
            "name": "AI Whisperer",
            "description": "Effectively communicate and cooperate with the AI entity.",
            "achieved": false
        },
        {
            "name": "Biotech Visionary",
            "description": "Make groundbreaking discoveries in the field of AI and biology.",
            "achieved": false
        },
        {
            "name": "Security Sentinel",
            "description": "Keep all sensitive information secure from rival factions.",
            "achieved": false
        }
    ],
    "General Achievements": [
        {
            "name": "Story Weaver",
            "description": "Explore all possible endings across all stories.",
            "achieved": false
        },
        {
            "name": "Puzzle Prodigy",
            "description": "Solve all puzzles across the game without errors.",
            "achieved": false
        },
        {
            "name": "Cyberpunk Connoisseur",
            "description": "Interact with every character in the game.",
            "achieved": false
        },
        {
            "name": "Master of City 72",
            "description": "Complete all achievements in the game.",
            "achieved": false
        }
    ]
}
const locationImages = {

  virtualrealitypods,neonstreetsofcity72,mainpowercontrolroom, city72, neonstreets, arrivalincity72, lab, centralplaza, industrialdistrict, mainframechamber, mainframeconsole, secretundergroundlab, undergroundpaths,crowdedmarketstreets, digitalcitymapdisplay,hiddenspeakeasy,highspeedmainavenues,hightechhideout,lasergridprotectedexhibit,marketstalls,narrowalleyways,securecommunicationsroom,shadowyalleys,ultramodernmuseum,briefingtents,traininggrounds,planningrooms,landingcrafts,choppyseawaters,beachlandingzones,bombardedbeachzones,enemybunkers,makeshiftcommandcenters,capturedenemybunkers,makeshiftfieldhospitals,debriefingareas,hightechresearchlabs,experimentaltestingareas,conferencehalls,debatestages,privatemetingrooms,corporateboardrooms,highsecuritylabs 

};
const characterImages = {ava,cipher,depictmayoranikavoss,drelaramorn,echo,vega,rennharlow,axelblackwell, irisflint, jadevortex, lunavega, mikaredstorm, zephyr,aimainframe,knox,lyra,airesearcherdremlcarter,corporatespyalexmercer,dravalin,ethicistdrmayasingh,geneticistdrrajivkumar,professorleoZheng,securityexperthanakim, theaientity,captainlucasford,commanderwilliamharper,diplomaticenvoymariedupont,historiandrelizabethmorgan,lieutenantgracebennett,majorjohnathanellis,privatesamuelking,scoutoliverthompson,sergeantemilyturner
};
const itemImages = {
  digitalmapofcity72, lotrartifacts, mainframe, holorecorder,stealthcloak, datapad, ancienttechdetector, neuralinterface, timecapsule
}

import { useExample } from '../../contexts';
import { BackgroundMusic } from '../../assets';

const GamePage = () => {

  const [audioPlayed, setAudioPlayed] = useState(true);
  const [dialogue, setDialogue] = useState('Enter Continue');

  const [userInput, setUserInput] = useState('');
  const [visibleUserInput, setVisibleUserInput] = useState('Enter Continue');
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [conversation, setConversation] = useState([
    {
      role: 'system',
      content: `In 'City 72,' a text-based adventure game, you are the story master, guiding the narrative and presenting choices to the players. The main story, played first, tests players' general knowledge to GCSE level through puzzles encountered during gameplay, with a puzzle appearing every three choices.

      Upon discovering three ancient relics simultaneously, the player can activate one, leading to one of three mini-stories, each linked to GCSE level knowledge:
      
      'The Heist of the Neon Symphony': Focuses on mathematical skills.
      'Echoes of the Forgotten War': Centers on historical knowledge, especially D-Day.
      'Rise of the Tech-Magi': Explores biology knowledge.
      The story masters job is to tell the story and give players choices (labelled A , B and C) each choice will lead to new piece of story.  This is called a choice selection. Every 3 choice selections there should be a puzzle of some kind before the next choice this should be based on type of puzle the story requires, try to work the puzzle into the story. 
      Typing 'h' or 'hint' offers guidance relevant to the current puzzle or scenario. Responses should be formatted as a JSON string, including 'current_location', 'act', 'storyname', 'narrative', 'items' (from ${itemImages}), 'character', 'choices', and 'achievements'.
      
      An exmple of a puzzle the player will encounter is:
      Narrative: "Renn examines a mural with symbols hinting at historical events."
      Choices:
      {"A": "Identify the ladder and circle as the Moon Landing."}
      {"B": "Assume the broken wall symbolizes the fall of the Berlin Wall."}
      {"C": "Interpret the gears as the Industrial Revolution."}      

      Main Story the player plays through first:
      ${mainStory}
      The three mini stories the player will encounter later in the game:
      ${heistStory}, ${warStory}, ${techMagiStory}
      And achivements:
      ${achievements}. 
      
      Response format which should look like this:
      {
        "current_location": "City 72",
        "act": "Act 1: Arrival in City 72",
        "storyname": "City 72 Main Story",
        "narrative": "You chose: Study the documents and relics. Diving into the relics, Renn uncovers tales of ancient civilizations and forgotten technologies. A hint about a hidden mainframe beneath City 72 emerges, promising answers and secrets.",
        "items": ["Old documents", "Relics"],
        "character": "Renn Harlow",
        "choices": [
          {"A": "Locate the mainframe using the digital map."},
          {"B": "Consult Dr. Elara Morn for mainframe insights."},
          {"C": "Meet Knox for additional clues."}
        ],
        "achievements": {
          "name": "name of the achivement",
          "achieved": false
        }
      }

    Narrative Progression:
      Begins with the player's choice acknowledgment.
      Continues with the consequences and developments of that choice.
      Consistently adapted to the player's decisions for an immersive experience.
      Always start with the main story and ensure a complete response for each interaction."
    `,
    },
  ]);

  const [location, setLocation] = useState(locationImages.city72);
  const [narrative, setNarrative] = useState('narrative');
  const [items, setItems] = useState([]);
  const [characterdisplayed, setCharacterdisplayed] = useState(rennharlow);
  const [characterName, setCharacterName] = useState('Renn Harlow');
  const [choices, setChoices] = useState([]);
  // const { currentGameID } = useExample();
  // const [saveData, setSaveData] = useState();

  // async function grabSaveData() {
  //   try {
  //     const response = await fetch(
  //       `https://city-72-wez6.onrender.com/progress/game/${currentGameID}`
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
  //       `https://city-72-wez6.onrender.com/games/${currentGameID}`,
  //       options
  //     );
  //     const data = await response.json();

  //     setSaveData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    document.getElementById('root').classList.add('game-page-text')
    document.getElementById('root').classList.remove('home-page')
    document.getElementById('root').classList.remove('signup-page')
    document.body.classList.add('game-page-text');
    document.body.classList.remove('home-page');
    document.body.classList.remove('signup-page');

    return () => {
      document.getElementById('root').classList.remove('game-page-text')
      document.body.classList.remove('game-page-text');
    };
  }, []);


  let choiceMade = ""
  const [choicesMade, setChoicesMade] = useState([]);

  const submitUserInput = async () => {
    if (userInput.trim() !== '') {
      // Extract the choice from the user input
      const userChoice = userInput.trim().toUpperCase();

      // Show the choice in visibleUserInput
    if (userChoice == "A" || userChoice == "B" || userChoice == "C") {
        const choiceIndex = userChoice.charCodeAt(0) - 'A'.charCodeAt(0);
        choiceMade = choices[choiceIndex][userChoice];
        setVisibleUserInput(`You Chose: ${choiceMade}`);
      } else {
        setVisibleUserInput(`You Chose: ${choiceMade}`);
      }
      const userMessage = { role: 'user', content: userInput };
      setConversation((prevConversation) => [...prevConversation, userMessage]);
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

        if (formatedData.character == "" || formatedData.character == null || formatedData.character == "None") {
          setCharacterName('Renn Harlow');
          setCharacterdisplayed(rennharlow);
        }else if(formatedData.character == "Street vendor"){
          setCharacterName('Mika Redstorm');
          setCharacterdisplayed(mikaredstorm);
        }else if(formatedData.character == "Ancient AI within the mainframe"){
          setCharacterName('Mainframe');
          setCharacterdisplayed(mainframe);
        }
        else {
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
      setUserInput("");
    }
  };

  return (
    <>
    <audio id='GameAudio'
        src={BackgroundMusic}
        autoPlay={audioPlayed}
        loop 
        volume={0.2} 
      >
        Your browser does not support the audio tag.
      </audio>
    <div className="app-container">
      <div className="left-section" style={{ backgroundImage: `url(${location})` }}></div>
      <div className="middle-section">
      <video autoPlay muted loop className="background-video">
        <source src={Background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <div className="top-container">
          <p className="visibleUserInput">{visibleUserInput}</p>
          <div className='conversation'>
            {conversation.map((message, index) => (
              <div key={index}>
                {message.role === 'assistant' && 
                  <TypeAnimation
                    className={`${message.role}-text`}
                    key={index}  // Use the index as the key
                    sequence={[JSON.parse(message.content).narrative.toString()]}
                    speed={80}
                    cursor={false}
                    style={{
                      fontSize: '0.75em',
                      display: 'block',
                      color: 'yellow',
                      fontFamily: 'Courier New',
                      width: '100%',
                    }}
                  />
                }
              </div>
            ))}
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
          {/* <div className="settingsBar">
            <TextToSpeech dialogue={dialogue} />
            <button className="toolBar" onClick={toggleSettings}>
              <img className="toolBarIcon" src={settings} />
            </button>
            <SpeechToText userInput={userInput} setUserInput={setUserInput} />
          </div> */}
        </div>
      </div>
      <div className="right-section">
        <div className='topr-container'>
          <CharacterCard
            name={characterName}
            img={characterdisplayed}
            description={charactersInfo[characterName]}
          />
        </div>
        <div className="bottom-container">
          <div className={`inventory ${inventoryVisible ? 'visible' : ''}`}>
            {/* <div className="inventory-toggle" onClick={toggleInventory}>
              <span className='inventoryIcons'>
                <h3>Inventory</h3>
                {inventoryVisible ? '▼' : '▲'}
              </span>
            </div> */}
            {true && (
              <div className="settingsBar">
                <TextToSpeech dialogue={dialogue} />
                <SpeechToText userInput={userInput} setUserInput={setUserInput} />
                
                <button className="toolBar" onClick={toggleSettings}>
                  <img className="toolBarIcon" src={settings} />
                </button>
                
            </div>
            )}
          </div>
        </div>
      </div>
      {settingsVisible && <SettingsPopup onClose={toggleSettings} audioPlayed={audioPlayed} setAudioPlayed={setAudioPlayed} />}
    </div>
    </>
  );
  
};

export default GamePage;