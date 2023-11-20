import React from 'react';
import GameCard from '../GameCard';
import AchievementCard from '../AchievementCard';

export default function LoadAchievements({ allGames }) {
  return (
    <div className="game-container">
      {allGames.map((game, index) => (
        <GameCard game={game} key={index} />
      ))}
    </div>
  );
}
