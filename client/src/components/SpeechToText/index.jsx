import React, { useState, useEffect } from 'react';
import annyang from 'annyang';
import {PlayButton, StopButton} from '../../assets'
const SpeechToText = ({userInput, setUserInput}) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (annyang) {
      annyang.addCallback('result', (phrases) => {
        setTranscript(phrases[0]);
        setUserInput(transcript);
      });

      if (isListening) {
        annyang.start();
      } else {
        annyang.abort();
      }

      return () => {
        annyang.abort();
      };
    }
  }, [isListening]);

  const startListening = () => {
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
      <>
      <button className="toolBar" onClick={startListening} disabled={isListening}>
        <img className='toolBarIconPS' src={PlayButton} alt="Speech to Text" />
      </button>
      <button className="toolBar" onClick={stopListening} disabled={!isListening}>
        <img className='toolBarIconPS' src={StopButton} alt="Speech to Text" />
      </button>
      </>
  );
};

export default SpeechToText;
