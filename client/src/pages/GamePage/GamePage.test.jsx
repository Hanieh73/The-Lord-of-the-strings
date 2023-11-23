import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GamePage from '.';
// Mocking the SpeechSynthesisUtterance
class SpeechSynthesisUtteranceMock {
  constructor() {
    this.text = '';
    this.voice = null;
  }
}

// Mocking the speechSynthesis object
const speechSynthesisMock = {
  getVoices: vi.fn(),
  speak: vi.fn(),
};

global.SpeechSynthesisUtterance = SpeechSynthesisUtteranceMock;
global.speechSynthesis = speechSynthesisMock;

describe('GamePage Component', () => {
  let originalLocation;
  let originalConversation;

  beforeEach(() => {
    originalLocation = window.location;
    delete window.location;
    window.location = { ...originalLocation, assign: vi.fn() };
    originalConversation = global.fetch;
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: '{"current_location": "City 72"}' }),
      })
    );
  });

  afterEach(() => {
    window.location = originalLocation;
    global.fetch = originalConversation;
  });

  it('renders the game page', () => {
    render(<GamePage />);
    const userInput = screen.getByPlaceholderText('Enter something...');
    expect(userInput).toBeInTheDocument();
  });

  
});
