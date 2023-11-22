import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExample } from '../../contexts';

import {
  NeonNavigator,
  MainframeMaster,
  CyberSleuth,
  DiplomatoftheDark,
  FuturisticHistorian,
  DecisiveLeader,
  GuardianofthePast,
  StealthySteps,
  InsideJobMastermind,
  HighOctaneHeister,
  CodeCrackerExtraordinaire,
  ArtfulDodger,
  NeonNightcrawler,
  StrategicGenius,
  LoneSurvivor,
  DiplomaticVictory,
  WarHistorian,
  BeachheadHero,
  MasterTactician,
  InnovationPioneer,
  EthicalGuardian,
  CorporateEspionageThwarted,
  AIWhisperer,
  BiotechVisionary,
  SecuritySentinel,
  StoryWeaver,
  PuzzleProdigy,
  CyberpunkConnoisseur,
  MasterofCity72,
  lockPic,
} from '../../assets';

const awardPictures = {
  NeonNavigator,
  MainframeMaster,
  CyberSleuth,
  DiplomatoftheDark,
  FuturisticHistorian,
  DecisiveLeader,
  GuardianofthePast,
  StealthySteps,
  InsideJobMastermind,
  HighOctaneHeister,
  CodeCrackerExtraordinaire,
  ArtfulDodger,
  NeonNightcrawler,
  StrategicGenius,
  LoneSurvivor,
  DiplomaticVictory,
  WarHistorian,
  BeachheadHero,
  MasterTactician,
  InnovationPioneer,
  EthicalGuardian,
  CorporateEspionageThwarted,
  AIWhisperer,
  BiotechVisionary,
  SecuritySentinel,
  StoryWeaver,
  PuzzleProdigy,
  CyberpunkConnoisseur,
  MasterofCity72,
};

export default function AchievementCard({ trophy, index }) {
  const { awardCount } = useExample();
  const [isActive, setActive] = useState(false);
  const [picture, setPicture] = useState();
  // const navigate = useNavigate();

  useEffect(() => {
    const formattedAward = trophy.name.replace(/\s/g, '').replace(/-/g, '');

    setPicture(awardPictures[formattedAward]);
    // if (trophy.achieved == true) {
    // }
  }, []);
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
      <div className="flip-card">
        <div
          className={
            isActive ? 'flip-card-inner is-flipped' : 'flip-card-inner'
          }
          onClick={toggleClass}
        >
          <div
            className="flip-card-front"
            style={{ backgroundImage: `url(${picture})` }}
          >
            {trophy.achieved ? '' : <img src={lockPic} id="award-pic" />}
          </div>
          <div className="flip-card-back">
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
