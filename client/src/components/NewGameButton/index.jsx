import React from 'react';
import { useExample } from '../../contexts';
import Modal from '../Modal';
import newgameImg from './new game.png';

export default function NewGameButton() {
  const { userID, allGames, setAllGames, modalState, setModalState } =
    useExample();
  function toggleModal() {
    setModalState(true);
    console.log('hello');
  }
  return (
    <img
      src={newgameImg}
      alt="newgame"
      className="img-fluid dashboard-btns-row2"
      id="new-game-btn"
      onClick={() => {
        toggleModal();
      }}
    />
  );
}
