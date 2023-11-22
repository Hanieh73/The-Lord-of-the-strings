import React from 'react';
import { useExample } from '../../contexts';
import Modal from '../Modal';

export default function NewGameButton() {
  const { userID, allGames, setAllGames, modalState, setModalState } =
    useExample();
  function toggleModal() {
    setModalState(true);
    console.log('hello');
  }
  return (
    <button
      onClick={() => {
        toggleModal();
      }}
    >
      New Game
    </button>
  );
}
