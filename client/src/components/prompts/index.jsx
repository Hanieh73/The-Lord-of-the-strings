import React from 'react';

const mainStory =
  "Main Story of City 72 Adventure\n\nAct 1: Arrival in City 72\n\n- Introduction: The adventurer, Renn Harlow, arrives in City 72, intrigued by rumors of ancient technology and hidden truths.\n- Exploration: Players navigate the neon-lit streets of City 72, interacting with characters like street vendors and corporate agents, and gathering information about the city's history and the rumored mainframe.\n- Discovery: Renn discovers the mainframe's location in an abandoned sector beneath the city, guided by characters like Vega, the mysterious local guide.\n- Key Locations: Central plaza, neon streets, underground paths.\n- Items: Digital Map of City 72, Holo-Recorder.\n\nAct 2: The Mainframe and the Relics\n\n- Revelation: The mainframe, an ancient AI, is discovered in a secret underground lab. It's a repository of historical data and experiences.\n- First Contact: The AI communicates with Renn, expressing a desire to share the stories within the relics.\n- Gathering Relics: Renn seeks relics across City 72, facing puzzles, negotiations, or confrontations.\n- Key Locations: Industrial district, underground lab, mainframe chamber.\n- Items: Access Keycard, Ancient Tech Detector.\n\nAct 3: Unlocking the Past\n\n- Activation: Each relic, connected to the mainframe, unlocks a unique story from the past.\n- Choices and Consequences: Decisions impact both the historical stories and Renn's understanding of City 72's history.\n- Unraveling Secrets: Renn uncovers narratives about City 72's formation and the mainframe's origins.\n- Key Locations: Virtual reality pods, historical data banks.\n- Items: Neural Interface.\n\nAct 4: The Present Echoes the Past\n\n- Integration: Past experiences influence Renn's present interactions, creating new pathways and alliances in City 72.\n- Revelation of Purpose: The mainframe's intention is revealed, potentially guiding someone to alter the city's future.\n- Climactic Decision: Renn makes a critical decision shaping City 72's future, influenced by past lessons.\n- Key Locations: Political centers, key landmarks.\n- Items: Data Pad, Holo-Disguise.\n\nEpilogue\n\n- Reflections and Consequences: The game concludes with City 72 reflecting the changes brought by Renn's choices, leading to various endings.\n- Conclusion: The story provides a rich context for the player, intertwining Renn's journey with City 72's history, setting the stage for the three branching stories experienced through the relics.\n\nItems Description:\n\n- Digital Map of City 72: Helps navigate the sprawling cyberpunk city.\n- Holo-Recorder: Captures clues and information.\n- Access Keycard: Unlocks the path to the mainframe.\n- Ancient Tech Detector: Helps locate hidden relics and the mainframe.\n- Relic Container: Safely stores collected relics.\n- Stealth Cloak: Used for sneaking into high-security areas.\n- Neural Interface: Connects the adventurer to the mainframe for experiencing history.\n- Data Pad: Contains historical data to influence present-day decisions.\n- Holo-Disguise: Assists in blending in during sensitive missions.\n- Time Capsule: Contains relics and records for future generations.\n\nLocations Description:\n\n- Central Plaza: A bustling hub of activity in the heart of City 72.\n- Neon Streets: Vibrant, neon-drenched streets filled with diverse characters and hidden secrets.\n- Underground Paths: Hidden passages beneath the city, leading to secretive and forgotten places.\n- Industrial District: Decrepit part of the city, housing abandoned factories and warehouses.\n- Secret Underground Lab: Hidden laboratory, home to the ancient mainframe.\n- Mainframe Chamber: Central location where the mainframe is housed, filled with advanced technology.\n\nCharacters Description:\n\n- Renn Harlow: Dynamic, resourceful adventurer. Skilled in navigating through the cyberpunk city and uncovering its secrets.\n- Vega: Mysterious guide with deep knowledge of City 72's hidden truths. Enigmatic and knowledgeable.\n- Dr. Elara Morn: Reclusive tech savant. Brilliant mind with expertise in ancient technology and the mainframe.\n- Cipher: Street-smart hacker with a rebellious edge. Savvy in digital espionage and hacking.\n- Mayor Anika Voss: Charismatic and influential politician. Holds significant power and ambition within City 72.\n- Echo: Well-connected informant. Resourceful and knowledgeable about the city's affairs.";


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

const heistStory = `
# The Heist of the Neon Symphony: Expanded Storyline with GCSE Level Maths Puzzles\n\n## Act 1: Gathering Information\n\n**Setting:** Neon-lit night market in City 72.\n\n**Key Locations:** Market stalls, shadowy alleys, and a hidden speakeasy.\n\n**Objective:** Gather information about the Neon Symphony's location and security.\n\n**Characters:**\n- Mika Redstorm - Provides initial clues at the night market.\n- Axel Blackwell - Decodes numerical codes and gathers information.\n\n**Items:**\n- Neon Decoder - Used to decode numerical codes.\n\n**Puzzle:** Decode a series of numerical codes using geometric sequences.\n\n## Act 2: Planning the Heist\n\n**Setting:** High-tech hideout overlooking the city skyline.\n\n**Key Locations:** Interactive planning table, digital city map display, and a secure communications room.\n\n**Objective:** Devise a plan to infiltrate the museum housing the Neon Symphony.\n\n**Characters:**\n- Axel Blackwell - Leads the planning of the heist.\n- Jade Vortex - Offers insight into museum security.\n- Echo - Assists in planning through hacking and information analysis.\n\n**Items:**\n- Heist Planner - Interactive map for planning the heist.\n- Hacker's Toolkit - Essential for hacking in the Inside Job branch.\n\n**Puzzle:** Use quadratic equations to plan the heist approach.\n\n## Act 3: Executing the Heist\n\n**Setting:** Ultra-modern museum with high-tech security.\n\n**Key Locations:** Laser grid-protected exhibit, secure vault, and main power control room.\n\n**Objective:** Secure the Neon Symphony and escape.\n\n**Characters:**\n- Axel Blackwell - Executes the heist.\n- Zephyr (Stealth Approach) - Assists in disabling security.\n- Iris Flint (Inside Job) - Helps unlock the safe.\n- Luna Vega (High Octane Heist) - Manages the escape.\n\n**Items:**\n- Stealth Suit (Stealth Approach) - For evading detection.\n- Laser Disruptor (Stealth Approach) - Disables laser grids.\n- Safe Cracker (Inside Job) - Opens the safe containing the Neon Symphony.\n- Power Surge Device (High Octane Heist) - Triggers a blackout for a distraction.\n\n**Puzzle:** Apply trigonometry and coordinate geometry in challenges.\n\n## Act 4: The Escape\n\n**Setting:** Neon-lit streets of City 72.\n\n**Key Locations:** Crowded market streets, narrow alleyways, and high-speed main avenues.\n\n**Objective:** Evade pursuit and secure the Neon Symphony.\n\n**Characters:**\n- Axel Blackwell - Leads the escape.\n- Captain Rhys Dalton - Pursues Axel and his team.\n- Luna Vega - Assists in navigating city streets.\n\n**Items:**\n- High-Speed Hoverbike - For a fast escape.\n- Escape Goggles - Navigate the neon-lit streets during the chase.\n\n**Puzzle:** Calculate escape routes using graph theory and probability.\n\n## Conclusion\n\nThe heist's success or failure depends on solving GCSE level maths puzzles. Discovering the secrets of the Neon Symphony reveals hidden truths about City 72's past, influencing the main story's narrative.
`;

const warStory = 
"Act 1: Prelude to D-Day\n\nSetting: Military camp in England, days before the Normandy landings.\n\nKey Locations: Briefing tents, training grounds, and planning rooms.\n\nObjective: Prepare for the impending invasion by gathering intelligence and rallying troops.\n\nCharacters:\n- Major Johnathan Ellis - Intelligence officer, provides historical events for the puzzle.\n- Sergeant Emily Turner - A drill sergeant who helps rally the troops.\n\nItems:\n- Historical Documents - Contain key decisions, speeches, and battles.\n- Strategy Maps - Outline the planned invasion, used for preparation.\n\nPuzzle: Arrange historical events leading up to D-Day in chronological order.\n\nAct 2: The Invasion Begins\n\nSetting: English Channel transitioning to the beaches of Normandy.\n\nKey Locations: Landing crafts, choppy sea waters, and beach landing zones.\n\nObjective: Successfully land on the beach and establish a foothold.\n\nCharacters:\n- Commander William Harper (Commando Mission) - Leads the landing craft navigation.\n- Lieutenant Grace Bennett (Diplomatic Resolution) - Specializes in communications and encryption.\n- Private Samuel King (Lone Survivor) - Expert in survival and minefield navigation.\n\nItems:\n- Historical Maps and Tide Tables (Commando Mission) - For navigating to the beach.\n- Encryption Tools (Diplomatic Resolution) - Used for decoding messages.\n- Minefield Maps (Lone Survivor) - Aid in identifying safe paths.\n\nPuzzle: Navigate the landing craft using historical maps and tide tables.\n\nAct 3: Securing the Beachhead\n\nSetting: Beach under heavy enemy fire.\n\nKey Locations: Bombarded beach zones, enemy bunkers, and makeshift command centers.\n\nObjective: Overcome defenses and secure a position inland.\n\nCharacters:\n- Captain Lucas Ford (Commando Mission) - Tactical leader for resource allocation.\n- Diplomatic Envoy Marie Dupont (Diplomatic Resolution) - Negotiates with paratrooper units.\n- Scout Oliver Thompson (Lone Survivor) - Guides through enemy territory using logic and landmarks.\n\nItems:\n- Tactical Unit Cards (Commando Mission) - Represent different units for strategic deployment.\n- Paratrooper Communication Gear (Diplomatic Resolution) - For negotiating with airborne units.\n- Historical Landmark Guide (Lone Survivor) - Helps navigate enemy territory.\n\nPuzzle: Allocate resources and manpower to key positions using historical unit strengths and weaknesses.\n\nAct 4: The Aftermath\n\nSetting: Secured position inland, post-invasion.\n\nKey Locations: Captured enemy bunkers, makeshift field hospitals, and debriefing areas.\n\nObjective: Reflect on the impact of the operation and gather intelligence for the next phase of the battle.\n\nCharacters:\n- Historian Dr. Elizabeth Morgan - Assists in compiling the report on the day's events.\n\nItems:\n- Report Forms - Used for compiling the aftermath report.\n- Casualty and Equipment Lists - Reference for matching historical facts and figures.\n\nPuzzle: Compile a report based on the events of the day, matching historical facts and figures.\n\nConclusion\n\nThe outcome of this scenario reflects the player's ability to apply historical knowledge and strategic thinking. The experience provides insights into the complexity of the Normandy landings and the broader context of World War II, impacting the adventurer's understanding of military strategy and historical significance in the main story of City 72.";

const techMagiStory =
"Act 1: The Genesis of Innovation\n\nSetting: Clandestine laboratory beneath City 72.\n\nKey Locations: High-tech research labs, experimental testing areas, and innovation brainstorming rooms.\n\nObjective: Develop the first cybernetic enhancements, revolutionizing human capabilities.\n\nCharacters:\n- Dr. Ava Lin - A leading bio-engineer heading the development of enhancements.\n- Professor Leo Zheng - A neurobiologist specializing in tech and nervous system integration.\n\nItems:\n- Cybernetic Prototypes - Early models of enhancements.\n- Anatomical Models - Displaying human anatomy for identifying enhancement integration points.\n\nPuzzle: Design cybernetic enhancements integrating with human biology, focusing on anatomy and cellular functions.\n\nAct 2: Ethical Boundaries\n\nSetting: Scientific symposium on human augmentation.\n\nKey Locations: Conference halls, debate stages, and private meeting rooms.\n\nObjective: Navigate the ethical dilemmas and societal implications of augmentation.\n\nCharacters:\n- Ethicist Dr. Maya Singh - Presents moral challenges to human augmentation.\n- Geneticist Dr. Rajiv Kumar - Discusses the genetic impact of cybernetics.\n\nItems:\n- Presentation Toolkit - For creating impactful presentations.\n- Research Papers on Genetics - Providing in-depth genetic knowledge.\n\nPuzzle: Create a presentation addressing the biological impact of cybernetics on human evolution, using GCSE-level biology concepts.\n\nAct 3: Corporate Intrigue\n\nSetting: Corporate boardrooms and shadowy meeting places.\n\nKey Locations: High-security labs, corporate offices, and hidden data storage rooms.\n\nObjective: Protect groundbreaking research from rival corporations and espionage.\n\nCharacters:\n- Corporate Spy Alex Mercer - Attempts to steal research.\n- Security Expert Hana Kim - Specializes in safeguarding sensitive information.\n\nItems:\n- Encoded Documents - Containing sensitive biological data.\n- Decryption Software - Essential for understanding stolen documents.\n\nPuzzle: Decode stolen documents containing biological jargon and data, applying knowledge of human biology.\n\nAct 4: The AI Factor\n\nSetting: Advanced AI development wing of the laboratory.\n\nKey Locations: AI core room, digital simulation areas, and ethical debate chambers.\n\nObjective: Address the emergence of sentient AI resulting from experiments.\n\nCharacters:\n- AI Researcher Dr. Emily Carter - Investigates AI and biological system integration.\n- The AI Entity - A newly conscious AI interacting with the lab's work.\n\nItems:\n- AI Algorithms - Biology-based decision-making systems.\n- Biology Textbooks - Covering ecosystems and evolutionary biology.\n\nPuzzle: Understand and influence AI behavior using principles from ecosystems and evolutionary biology.\n\nConclusion\n\nThe outcome depends on the player's understanding of biology and ethical decision-making. Successful integration of cybernetics might herald a new era, while failure or unethical choices could have dire consequences.\n\nThis story tests players' knowledge of biology up to GCSE level, immersing them in a narrative exploring biology, technology, and ethics within City 72's cyberpunk world.";


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




const StoryComponent = () => (
    <div>
        <p>{mainStory}</p>
        <p>{heistStory}</p>
        <p>{warStory}</p>
        <p>{techMagiStory}</p> 
        <p>{achievements}</p>
    </div>
);

export { mainStory, charactersInfo, heistStory, warStory, techMagiStory, achievements, StoryComponent };
