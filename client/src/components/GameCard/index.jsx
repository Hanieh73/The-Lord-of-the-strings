import React, { useEffect, useState } from 'react';
import { useExample } from '../../contexts';

export default function GameCard({ game }) {
  const [gameID, setGameID] = useState(0);
  const [state, setState] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [updatedAt, setUpdatedAt] = useState();

  const { setAllGames, userID, setCurrentGameID } = useExample();

  useEffect(() => {
    setGameID(game.game_id);
    setState(game.state);
    setDifficulty(game.difficulty);
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

  function ifClicked() {
    setCurrentGameID(gameID);
  }

  //MAKE THEM A LINK TO THE GAME PAGE
  return (
    <div className="game-card">
      <p>Game ID: {gameID}</p>
      <p>State: {state}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Last updated: {updatedAt}</p>
    </div>
  );
}
