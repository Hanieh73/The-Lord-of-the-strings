import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoutImg from './logout.png';
import awardsImg from './award.png';
import newgameImg from './new game.png';
import resumeImg from './resume.png';
import dashImg from './dash2.png';
import leaderboardImg from './leaderboard.png';
import settingsImg from './settings.png';
import backgroundmp4 from './background.mp4';
import { TypeAnimation } from 'react-type-animation';
import { useExample } from '../../contexts';

export default function DashboardPage() {
  const { setAwardCount } = useExample();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [about, setAbout] = useState(false);

  useEffect(() => {
    setAwardCount(0);
    async function fetchUser() {
      const option = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.token,
        }),
      };
      const res = await fetch('http://localhost:3000/users/showId', option);
      const resData = await res.json();

      setUser(resData.username);
      console.log(user);
    }
    fetchUser();
    console.log(user);
  }, []);

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  function leaderboard() {
    navigate('/leaderboard');
  }

  function clickAbout() {
    if (about == false) {
      setAbout(true);
      const elements = document.querySelectorAll('#all-dash-btns');
      elements.forEach((element) => {
        element.classList.add('push-left');
      });

      const aboutTitles = document.querySelectorAll('.about-gap');
      aboutTitles.forEach((title) => {
        title.classList.add('about-title-animation');
      });
    } else {
      const elements = document.querySelectorAll('#all-dash-btns');
      elements.forEach((element) => {
        element.classList.remove('push-left');
      });

      const aboutTitles = document.querySelectorAll('.about-gap');
      aboutTitles.forEach((title) => {
        title.classList.remove('about-title-animation');
      });

      setAbout(false);
    }
  }

  return (
    <div className="dashboard">
      <video id="video-background" autoPlay loop muted>
        <source src={backgroundmp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div id="overlay"></div>

      <div className="about" onClick={clickAbout}>
        ?
      </div>
      <div className="row dashboard2">
        <div className="col-12">
          <div className="dashboard-img">
            <div className="overlay-text text-center">
              {user && (
                <TypeAnimation
                  key={'Welcome'}
                  sequence={[`Welcome ${user}`]}
                  speed={10}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row">
                <div className="col-3"></div>
                <div className="col-2 text-right">
                    <img src={logoutImg} alt="logout" className='img-fluid dashboard-btns'/>
                </div>
                <div className="col-2 text-center">
                    <img src={settingsImg} alt="settings" className='img-fluid dashboard-btns'/>
                </div>
                <div className="col-2 text-left">
                    <img src={awardsImg} alt="Awards" className='img-fluid dashboard-btns'/>
                </div>
                <div className="col-3"></div>
            </div>


            <div className="row">
                <div className="col-3"></div>
                <div className="col-2 text-right">
                    <img src={newgameImg} alt="newgame" className='img-fluid dashboard-btns-row2'/>
                </div>
                <div className="col-2 text-center">
                    <img src={resumeImg} alt="resumegame" className='img-fluid dashboard-btns-row2'/>
                </div>
                <div className="col-2 text-left">
                    <img src={leaderboardImg} alt="leaderboards" className='img-fluid dashboard-btns-row2'/>
                </div>
                <div className="col-3"></div>
            </div> */}

      <div className="row dashboard2" id="all-dash-btns">
        <div className="col-3"></div>
        <div className="col-2 text-right">
          <img
            src={newgameImg}
            alt="newgame"
            className="img-fluid dashboard-btns-row2"
            onClick={() => {
              navigate('/load');
            }}
          />
        </div>
        <div className="col-2 text-center">
          <img
            src={awardsImg}
            alt="Awards"
            className="img-fluid dashboard-btns"
            onClick={() => {
              navigate('/achievement');
            }}
          />
        </div>
        <div className="col-2 text-left">
          <img
            src={leaderboardImg}
            alt="leaderboards"
            className="img-fluid dashboard-btns-row2"
            onClick={leaderboard}
          />
        </div>
        <div className="col-3 text-center about-box">
          <div className="about-1">
            <span className="about-gap">How to Play:</span>
            <hr className="hr-about" />
            Navigate the game using simple text commands and make decisions to
            progress through challenges. Interact with characters, solve
            puzzles, and choose your path wisely to conquer subjects. Type your
            responses, explore, and immerse yourself in this retro-futuristic
            learning experience. Remember, every choice matters on your quest
            for academic excellence!
          </div>
          <div className="about-2">
            <span className="about-gap">Mission of the Game:</span>
            <hr className="hr-about" />
            Embark on a retro-futuristic educational journey where your
            decisions shape the course of learning. Explore a dynamic,
            text-based world designed to enhance your GCSE knowledge through
            interactive challenges and engaging scenarios. Your mission: master
            the subjects, overcome obstacles, and achieve academic success in
            this unique revision adventure.
          </div>
        </div>
      </div>

      <div className="row" id="all-dash-btns">
        <div className="col-4"></div>

        <div className="col-2 text-center">
          <img
            src={settingsImg}
            alt="settings"
            className="img-fluid dashboard-btns"
          />
        </div>
        <div className="col-2 text-left">
          <img
            src={logoutImg}
            alt="logout"
            className="img-fluid dashboard-btns"
            onClick={logout}
          />
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}
