import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import backgroundmp4 from './background.mp4';
import { TypeAnimation } from 'react-type-animation';

import scrollImg from './scroll.png';
export default function LeaderboardsPage() {
  useEffect(() => {
    async function fetchLeaderboardData() {
      const response = await fetch(
        'https://city-72-game.onrender.com/games/scores/leaderboard'
      );
      const resData = await response.json();
      let currentDisplayed = 1;
      resData.forEach((e) => {
        if (currentDisplayed <= 15) {
          const tr = document.createElement('tr');

          switch (currentDisplayed) {
            case 1:
              tr.classList.add('gold');
              console.log('gold');
              break;
            case 2:
              tr.classList.add('silver');
              console.log('silver');
              break;
            case 3:
              tr.classList.add('bronze');
              console.log('bronze');
              break;
          }
          const tdName = document.createElement('td');
          tdName.textContent = e.name;
          const tdScore = document.createElement('td');
          tdScore.textContent = e.score;
          tr.appendChild(tdName);
          tr.appendChild(tdScore);
          document.querySelector('.retro-futuristic-table').appendChild(tr);
          currentDisplayed++;
        }
        //console.log(currentDisplayed);
        console.log(e.name);
      });
    }
    fetchLeaderboardData();
  }, []);

  const navigate = useNavigate();

  function backToDash() {
    navigate('/dashboard');
  }

  return (
    <div className="leaderboard">
      <video id="video-background" autoPlay loop muted>
        <source src={backgroundmp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div id="overlay"></div>

      <div className="back-leaderboard" onClick={backToDash}>
        {'<'}
      </div>

      <div className="row dashboard2 leaderboard-moveup">
        <div className="col-12">
          <div className="overlay-text text-center">
            <TypeAnimation
              key={'Leaderboards'}
              sequence={[`Leaderboard`]}
              speed={10}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row dashboard2 justify-content-center">
          <div className="col-12 scroll-bg">
            <div className="leaderboard-table text-center">
              <table className="retro-futuristic-table">
                <th>Name</th>
                <th>Score</th>
              </table>
            </div>
            <img src={scrollImg} alt="scroll" className="scroll-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
