import React from 'react';
import {speaking} from "../../assets"
const  TextToSpeech = ({ dialogue }) => {
  const msg = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((voice) => voice.name === 'Microsoft Susan - English (United Kingdom)');

  msg.voice = selectedVoice;

  const speechHandler = () => {
    msg.text = dialogue;
    window.speechSynthesis.speak(msg);
  };

  return (
    <button className='toolBar' onClick={speechHandler}>
      <img className='toolBarIcon' src={speaking} alt="Start Speaking" />
    </button>
  );
};

export default TextToSpeech;
