import React, { useEffect } from 'react';
import { LoadAchievements } from '../../components';
import { useExample } from '../../contexts';
import { TypeAnimation } from 'react-type-animation';
import './awards.css';

export default function AchievementPage() {
  //Achievements should have been grabbed when they logged in
  //GRAB ACHIEVEMENTS AGAIN
  const { setAchievements, achievements, awardCount, setAwardCount } =
    useExample();

  useEffect(() => {
    async function getAchievements() {
      const option = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
        }),
      };
      const res = await fetch('https://city-72-wez6.onrender.com//users/showId', option);
      const resData = await res.json();
      // console.log('ACHIEVEMENT PAGE BABYYYYYY');
      setAchievements(resData.achievements);
    }
    getAchievements();

    let count = 0;
    achievements['Main Storyline Achievements'].forEach((element) => {
      if (element.achieved == true) {
        count += 1;
      }
    });
    console.log(awardCount);
    achievements['The Heist of the Neon Symphony Achievements'].forEach(
      (element) => {
        if (element.achieved == true) {
          count += 1;
        }
      }
    );
    console.log(awardCount);
    achievements['Echoes of the Forgotten War Achievements'].forEach(
      (element) => {
        if (element.achieved == true) {
          count += 1;
        }
      }
    );
    console.log(awardCount);
    achievements['Rise of the Tech-Magi Achievements'].forEach((element) => {
      if (element.achieved == true) {
        count += 1;
      }
    });
    console.log(awardCount);
    achievements['General Achievements'].forEach((element) => {
      if (element.achieved == true) {
        count += 1;
      }
    });
    setAwardCount(count);
    console.log(awardCount);
  }, []);

  // console.log(
  //   achievements['Main Storyline Achievements'],
  //   achievements['The Heist of the Neon Symphony Achievements'],
  //   achievements['Echoes of the Forgotten War Achievements'],
  //   achievements['Rise of the Tech-Magi Achievements'],
  //   achievements['General Achievements']
  // );

  return (
    <div id="example">
      <TypeAnimation
        key={'award'}
        sequence={[`AWARDS`]}
        speed={10}
        style={{
          fontSize: '50px',
          display: 'block',
          maxHeight: '250px',
          fontWeight: 'bold' /* Optional: Adjust font weight as needed */,
          textShadow:
            '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.5)',
        }}
      />

      <h3>{awardCount}/29</h3>
      <div id="main-awards-container">
        <h3>General Achievements</h3>
        <LoadAchievements achievements={achievements['General Achievements']} />
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
      </div>
    </div>
  );
}
