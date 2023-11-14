import React, { useState } from 'react';
import './GamePage.css'; // Import your CSS file
import { TypeAnimation } from 'react-type-animation';
const GamePage = () => {
  const [dialogue, setDialogue] = useState('Hello World this is the game dialogue');
  const [userInput, setUserInput] = useState('');
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleInventoryToggle = () => {
    setInventoryOpen(!inventoryOpen);
  };

  return (
    <div className="game-container">
      <div className="dialogue-container">
      <p className="dialogue">
      <TypeAnimation
          sequence={[
            dialogue, 
          ]}
          speed={10}
          style={{ fontSize: '1em', display: 'block', minHeight: '200px', color: 'white' }}
      />

        </p>
      <div className='image-container'>
        <p>Image:</p>
      </div>
      <div className="character-info-container">
        
        <h3>Character Info:</h3>
        <p>Name: Dr. Ava Lin</p>
        <p>A leading bio-engineer heading the development of enhancements</p>
      </div>
      
    </div>

      <div className="user-input-container">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type your response..."
          className='userInput'
        />
        <button onClick={handleInventoryToggle} className='inventorybtn'>Inventory</button>
      </div>
      {inventoryOpen && (
        <div className="inventory-container">
          {/* Display inventory items here */}
          <p>Inventory Items:</p>
          {/* Add your inventory items rendering logic here */}
        </div>
      )}
      
    </div>
  );
};

export default GamePage;
