import React from 'react';
import GameCard from '../GameCard';

export default function LoadGames({ allGames }) {
  return (
    <div className="game-container">
      {allGames.map((game, index) => (
        <GameCard game={game} key={index} />
      ))}
    </div>
  );
}
