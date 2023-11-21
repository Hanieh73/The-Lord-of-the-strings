import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExample } from '../../contexts';

export default function AchievementCard({ game }) {
  const { setAllGames, userID, setCurrentGameID, currentGameID } = useExample();

  const navigate = useNavigate();

  useEffect(() => {}, []);

  function ifClicked() {
    // setTimeout(() => {
    //   navigate('/game');
    // }, 250);
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
