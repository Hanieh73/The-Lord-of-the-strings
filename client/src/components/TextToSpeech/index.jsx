import React from 'react';
import { speaking } from '../../assets';

const TextToSpeech = ({ dialogue }) => {
  const msg = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();

  // Check if voices is not undefined and has at least one element
  const selectedVoice = voices && voices.length > 0
    ? voices.find((voice) => voice.name === 'Microsoft Susan - English (United Kingdom)') || voices[0]
    : null;

  if (selectedVoice) {
    msg.voice = selectedVoice;
  }

  const speechHandler = () => {
    msg.text = dialogue;
    window.speechSynthesis.speak(msg);
  };

  return (
    <button className='toolBar' onClick={speechHandler}>
      <img className='toolBarIcon' src={speaking} alt="Speech to Text" />
    </button>
  );
};

export default TextToSpeech;
