import React from 'react';
import {speaking} from "../../assets"
const SpeechToTextComponent = ({ dialogue }) => {
  const msg = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((voice) => voice.name === 'Microsoft Susan - English (United Kingdom)');

  msg.voice = selectedVoice;

  const speechHandler = () => {
    msg.text = dialogue;
    window.speechSynthesis.speak(msg);
  };

  return (
    <button className='speechToText' onClick={speechHandler}>
      <img className='speechToTextIcon' src={speaking} alt="Speech to Text" />
    </button>
  );
};

export default SpeechToTextComponent;
