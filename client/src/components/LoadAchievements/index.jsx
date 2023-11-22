import React from 'react';
import GameCard from '../GameCard';
import AchievementCard from '../AchievementCard';

export default function LoadAchievements({ achievements }) {
  return (
    <div className="awards-container">
      {achievements.map((trophy, index) => (
        <AchievementCard trophy={trophy} key={index} />
      ))}
    </div>
  );
}
