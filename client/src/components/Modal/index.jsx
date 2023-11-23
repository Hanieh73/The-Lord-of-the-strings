import React, { useState } from 'react';
import { useExample } from '../../contexts';
import { useNavigate } from 'react-router-dom';

export default function Modal() {
  const { modalState, setModalState, userID, setCurrentGameID } = useExample();

  const [gameData, setGameData] = useState({});
  const navigate = useNavigate();

  const handleBtnCancel = () => {
    setModalState(false);
  };

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
          difficulty: 'Easy',
          story_id: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };
      const response = await fetch(
        'https://city-72-wez6.onrender.com/games/',
        options
      );
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
    <div
      id="myModal"
      className={
        modalState ? 'modal' : 'modal-display-none modal-dialog modal-sm'
      }
    >
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
        <h1 className="modal-text">
          Are You Sure You Want To Start A New Game?
        </h1>

        {/* <div id="form">
          <h2>Choose Difficulty</h2>
          <div id="difficulty-btn">
            <button
              className="difficulty-btn"
              onClick={async () => {
                createGame();
              }}
            >
              Yes
            </button>
            <button
              className="difficulty-btn"
              onClick={() => {
                setModalState(false);
              }}
            >
              No
            </button>
          </div>
        </div> */}

        <div className="buttons">
          <button
            id="create-btn"
            onClick={async () => {
              createGame();
            }}
          >
            Yes
          </button>
          <button
            id="close-btn"
            onClick={() => {
              handleBtnCancel();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
