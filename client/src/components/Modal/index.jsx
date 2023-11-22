import React, { useState } from 'react';
import { useExample } from '../../contexts';
import { useNavigate } from 'react-router-dom';

export default function Modal() {
  const { modalState, setModalState, userID, setCurrentGameID } = useExample();
  const [gameDifficulty, setGameDifficulty] = useState();
  const [gameData, setGameData] = useState({});
  const navigate = useNavigate();

  function selectDifficulty(e) {
    //console.log(e.target.textContent);
    setGameDifficulty(e.target.textContent);
    console.log(gameDifficulty);
  }

  async function createGame() {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          user_id: userID,
          state: 'in-progress',
          difficulty: gameDifficulty,
          story_id: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };
      const response = await fetch('http://localhost:3000/games/', options);
      const data = await response.json();

      setGameData(data);
      setCurrentGameID(data.Game.game_id);

      if (response.ok) {
        navigate('/game');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="myModal" className={modalState ? 'modal' : 'modal-display-none'}>
      <div className="modal-content">
        <div>
          <span
            className="close"
            onClick={() => {
              setModalState(false);
            }}
          >
            &times;
          </span>
        </div>
        <h1>Create Game</h1>

        <div id="form">
          <h2>Choose Difficulty</h2>
          <div id="difficulty-btn">
            <button className="difficulty-btn" onClick={selectDifficulty}>
              Easy
            </button>
            <button className="difficulty-btn" onClick={selectDifficulty}>
              Medium
            </button>
            <button className="difficulty-btn" onClick={selectDifficulty}>
              Hard
            </button>
          </div>
        </div>
        <button
          id="create-btn"
          onClick={async () => {
            createGame();
          }}
        >
          Create Game
        </button>
      </div>
    </div>
  );
}
