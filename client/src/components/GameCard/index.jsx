import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExample } from '../../contexts';

export default function GameCard({ game }) {
  const [gameID, setGameID] = useState(0);
  const [state, setState] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [score, setScore] = useState(0);
  const [updatedAt, setUpdatedAt] = useState();
  const {
    setAllGames,
    userID,
    setCurrentGameID,
    currentGameID,
    saveData,
    setSaveData,
  } = useExample();

  const navigate = useNavigate();

  useEffect(() => {
    setGameID(game.game_id);
    setState(game.state);
    setDifficulty(game.difficulty);
    setScore(game.score);
    setUpdatedAt(game.updated_at.substring(0, 10));
  }, [currentGameID]);

  async function deleteGame() {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(
        `https://city-72-wez6.onrender.com//games/${gameID}`,
        options
      );

      if (response.status === 204) {
        const response2 = await fetch(
          `https://city-72-wez6.onrender.com//games/show/${userID}`
        );
        const data = await response2.json();

        setAllGames(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function grabSaveData() {
    try {
      const response = await fetch(
        `https://city-72-wez6.onrender.com//progress/game/${currentGameID}`
      );
      const data = await response.json();
      console.log(data);
      setSaveData(data);
    } catch (error) {
      console.log(error);
    }
  }

  function ifClicked() {
    setCurrentGameID(gameID);
    grabSaveData();
    // setTimeout(() => {
    //   navigate('/game');
    // }, 250);
  }

  //MAKE THEM A LINK TO THE GAME PAGE
  return (
    <div
      className="game-card"
      onClick={() => ifClicked()}
      style={
        gameID == currentGameID
          ? { border: '5px solid #ba00cc' }
          : { border: '1px solid black' }
      }
    >
      <p>Game ID: {gameID}</p>
      <p>State: {state}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Score: {score}</p>
      <p>Last updated: {updatedAt}</p>
    </div>
  );
}
// .substring(0, 10)
