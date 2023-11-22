import React from 'react';
import resumeImg from './resume.png';
import { useExample } from '../../contexts';
import { useNavigate } from 'react-router-dom';

export default function ContinueGameButton({ allGames }) {
  const currentGame = allGames[0];
  const { currentGameID } = useExample();
  const navigate = useNavigate();

  // takes u to game page with the most current game
  function continueGame() {
    if (currentGameID != 0) {
      navigate('/game');
    }
  }

  return (
    <img
      src={resumeImg}
      alt="resumegame"
      className="img-fluid dashboard-btns-row2"
      id="continue-btn"
      onClick={() => {
        continueGame();
      }}
    />
  );
}
