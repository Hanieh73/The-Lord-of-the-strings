import React, { useState } from 'react';
import './GamePage2.css';
import { TypeAnimation } from 'react-type-animation';

const GamePage2 = () => {
  const [dialogue, setDialogue] = useState('Hello World this is the game dialogue');
  const [userInput, setUserInput] = useState('');
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const livesRemaining = 3; 

  const toggleInventory = () => {
    setInventoryVisible(!inventoryVisible);
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
            style={{ fontSize: '1em', display: 'block', minHeight: '200px', color: 'white' }}
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
        </div>
      </div>
      <div className="right-section">
        <div className="hearts-remaining-container">
          {Array.from({ length: livesRemaining }, (_, index) => (
            <span key={index} role="img" aria-label="heart">❤️</span>
          ))}
        </div>
        <div className="character-info">
          <h3>Character Information:</h3>
          <p>Name: Dr. Ava Lin</p>
          <img src=''alt="picture of Dr. Ava Lin"/>
          <p>A leading bio-engineer heading the development of enhancements</p>
        </div>
        <div className={`inventory ${inventoryVisible ? 'visible' : ''}`}>
          <div className="inventory-toggle" onClick={toggleInventory}>
            
            <span><h3>Inventory</h3>{inventoryVisible ? '▼' : '▲'}</span>
          </div>
          {inventoryVisible && (
            <>
              <img src='' alt="picture of inventory1" />
              <img src='' alt="picture of inventory2" />
              <img src='' alt="picture of inventory3" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage2;

