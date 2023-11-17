// SpeechToText.jsx
import React, { useState, useEffect } from 'react';
import annyang from 'annyang';
import { PlayButton, StopButton } from '../../assets';

const SpeechToText = ({ setUserInput, submitUserInput }) => {
  const [transcript, setTranscript] = useState('');
  const startListening = () => {
    annyang.start();
    annyang.addCallback('result', (phrases) => {
      setTranscript(phrases[0]);
    });
    setUserInput(transcript);
  };

  const stopListening = () => {
    annyang.abort();
    submitUserInput();
  };

  return (
    <>
      <button className="toolBar" onClick={startListening}>
        <img className='toolBarIconPS' src={PlayButton} alt="Speech to Text" />
      </button>
      <button className="toolBar" onClick={stopListening}>
        <img className='toolBarIconPS' src={StopButton} alt="Speech to Text" />
      </button>
    </>
  );
};

export default SpeechToText;
