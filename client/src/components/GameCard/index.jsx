import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExample } from '../../contexts';

export default function GameCard({ game }) {
  const [gameID, setGameID] = useState(0);
  const [state, setState] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [score, setScore] = useState(0);
  const [updatedAt, setUpdatedAt] = useState();
  const [saveData, setSaveData] = useState();
  const { setAllGames, userID, setCurrentGameID, currentGameID } = useExample();

  const navigate = useNavigate();

  useEffect(() => {
    setGameID(game.game_id);
    setState(game.state);
    setDifficulty(game.difficulty);
    setScore(game.score);
    setUpdatedAt(game.updated_at);
  }, []);

  async function deleteGame() {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(
        `http://localhost:3000/games/${gameID}`,
        options
      );

      if (response.status === 204) {
        const response2 = await fetch(
          `http://localhost:3000/games/show/${userID}`
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
        `http://localhost:3000/progress/game/${currentGameID}`
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
    setTimeout(() => {
      navigate('/game');
    }, 250);
  }

  //MAKE THEM A LINK TO THE GAME PAGE
  return (
    <div className="game-card" onClick={() => ifClicked()}>
      <p>Game ID: {gameID}</p>
      <p>State: {state}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Score: {score}</p>
      <p>Last updated: {updatedAt}</p>
    </div>
  );
}
