import React from 'react';
import { LoadAchievements } from '../../components';
import { useExample } from '../../contexts';
import './awards.css';

export default function AchievementPage() {
  //Achievements should have been grabbed when they logged in
  const { achievements } = useExample();
  console.log(
    achievements['Main Storyline Achievements'],
    achievements['The Heist of the Neon Symphony Achievements'],
    achievements['Echoes of the Forgotten War Achievements'],
    achievements['Rise of the Tech-Magi Achievements'],
    achievements['General Achievements']
  );

  return (
    <div>
      <h1>AWARDS</h1>
      <h2>INSERT FILTER BUTTON</h2>
      <h3>?/29</h3>
      <div id="main-awards-container">
        <h3>Main Storyline Achievements</h3>
        <LoadAchievements
          achievements={achievements['Main Storyline Achievements']}
        />
        <h3>The Heist of the Neon Symphony Achievements</h3>
        <LoadAchievements
          achievements={
            achievements['The Heist of the Neon Symphony Achievements']
          }
        />
        <h3>Echoes of the Forgotten War Achievements</h3>
        <LoadAchievements
          achievements={
            achievements['Echoes of the Forgotten War Achievements']
          }
        />
        <h3>Rise of the Tech-Magi Achievements</h3>
        <LoadAchievements
          achievements={achievements['Rise of the Tech-Magi Achievements']}
        />
        <h3>General Achievements</h3>
        <LoadAchievements achievements={achievements['General Achievements']} />
      </div>
    </div>
  );
}
