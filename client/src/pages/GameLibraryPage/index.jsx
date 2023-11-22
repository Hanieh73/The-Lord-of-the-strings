import React, { useState, useEffect } from 'react';
import {
  LoadGames,
  ContinueGameButton,
  NewGameButton,
  Modal,
} from '../../components';
import { useExample } from '../../contexts';
import './GameLibrary.css';
import { TypeAnimation } from 'react-type-animation';

export default function GameLibraryPage() {
  const { userID, allGames, setAllGames, modalState, setModalState } =
    useExample();
  const [hasGames, setHasGames] = useState(false);

  useEffect(() => {
    document.body.classList.add('game-page-library');
    document.body.classList.remove('home-page');
    document.body.classList.remove('signup-page');

    return () => {
      document.body.classList.remove('game-page-library');
    };
  }, []);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch(`http://localhost:3000/games/show/1`); //HARDCODED FOR 1 FOR NOW
        const data = await response.json();
        // console.log(data);
        setAllGames(data);
        setHasGames(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGames();
    console.log(allGames.length);
  }, []);

  return (
    <div id="main-div">
      {allGames.length ? (
        <>
          <div id="buttons-div">
            <ContinueGameButton allGames={allGames} />
            <NewGameButton />
          </div>
          <LoadGames allGames={allGames} />
        </>
      ) : (
        <div id="main-div">
          <NewGameButton id="buttons-div" />
          <div id="main-div-2">
            <TypeAnimation
              key={'award'}
              sequence={[
                `...there does not seem to be any games linked to your profile. Try creating one!`,
              ]}
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
          </div>
        </div>
      )}
      {modalState ? <Modal /> : null}
    </div>
  );
}
