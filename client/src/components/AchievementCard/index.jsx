import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExample } from '../../contexts';

export default function AchievementCard({ trophy, key }) {
  //  const { setAwardCount, awardCount } = useExample();
  const [isActive, setActive] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (trophy.achieved == true) {
  //     setAwardCount(awardCount + 1);
  //   }
  // }, []);
  const toggleClass = () => {
    setActive(!isActive);
  };

  function ifClicked() {
    // setTimeout(() => {
    //   navigate('/game');
    // }, 250);
  }

  //MAKE THEM A LINK TO THE GAME PAGE
  return (
    <>
      <div class="flip-card">
        <div
          class={isActive ? 'flip-card-inner is-flipped' : 'flip-card-inner'}
          onClick={toggleClass}
        >
          <div class="flip-card-front">
            <img />
          </div>
          <div class="flip-card-back">
            <p>{trophy.name}</p>
            <p>{trophy.description}</p>
            <p>{trophy.achieved}</p>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <div className="awards-card" onClick={() => ifClicked()}>
        <p>{trophy.name}</p>
        <p>{trophy.description}</p>
        <p>{trophy.achieved}</p>
      </div> */
}
