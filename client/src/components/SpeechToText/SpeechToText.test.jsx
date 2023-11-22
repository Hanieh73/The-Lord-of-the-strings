import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpeechToText from '.'; // Adjust the import path as needed

describe('SpeechToText Component', () => {
  beforeEach(() => {
    render(<SpeechToText userInput={() => {}} setUserInput={() => {}} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the play button', () => {
    const playButton = screen.getByAltText('Start Listening');
    expect(playButton).toBeInTheDocument();
  });

  it('renders the stop button', () => {
    const stopButton = screen.getByAltText('Stop Listening');
    expect(stopButton).toBeInTheDocument();
  });

  it('renders the start listening button', () => {
    const startListeningButton = screen.getByRole('button', { name: 'Start Listening' });
    expect(startListeningButton).toBeInTheDocument();
  });

  it('renders the stop listening button', () => {
    const stopListeningButton = screen.getByRole('button', { name: 'Stop Listening' });
    expect(stopListeningButton).toBeInTheDocument();
  });

  it('disables the stop button when listening', () => {
    const stopListeningButton = screen.getByRole('button', { name: 'Stop Listening' });
    expect(stopListeningButton).toBeDisabled();
  });

  it('enables the start button when not listening', () => {
    const startListeningButton = screen.getByRole('button', { name: 'Start Listening' });
    expect(startListeningButton).not.toBeDisabled();
  });
});
