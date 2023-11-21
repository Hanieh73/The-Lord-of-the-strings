import React from 'react';

export default function index() {
  async function saveGame() {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        //CHANGE TO APPROPRIATE DATA FOR UPDATE
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    try {
      const response = await fetch(
        `http://localhost:3000/games/${currentGameID}`,
        options
      );
      const data = await response.json();

      setSaveData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return <button>Save Game</button>;
}
