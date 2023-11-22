import React, { useState } from 'react';
import { useExample } from '../../contexts';

export default function Modal() {
  const { modalState, setModalState } = useExample();

  return (
    <div id="myModal" className={modalState ? 'modal' : 'modal-display-none'}>
      <div className="modal-content">
        <span
          className="close"
          onClick={() => {
            setModalState(false);
          }}
        >
          &times;
        </span>
        <div id="form">
          <button>Easy</button>
          <button>Medium</button>
          <button>Hard</button>
        </div>
        <button>Create Game</button>
      </div>
    </div>
  );
}
