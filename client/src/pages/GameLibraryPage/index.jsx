import React, { useState, useEffect } from 'react';
import { LoadGames, ContinueGameButton } from '../../components';
import { useExample } from '../../contexts';
import './GameLibrary.css';

export default function GameLibraryPage() {
  const { userID, allGames, setAllGames } = useExample();

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch(`http://localhost:3000/games/show/1`); //HARDCODED FOR 1 FOR NOW
        const data = await response.json();

        setAllGames(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGames();
  }, [allGames]);

  return (
    <div>
      <ContinueGameButton allGames={allGames} />
      <button>New Game</button>
      <LoadGames allGames={allGames} />
    </div>
  );
}
