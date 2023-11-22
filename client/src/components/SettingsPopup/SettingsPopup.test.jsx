import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsPopup from '.';

describe('SettingsPopup Component', () => {
  let onCloseSpy;
  let setAudioPlayedSpy;

  beforeEach(() => {
    onCloseSpy = vi.fn();
    setAudioPlayedSpy = vi.fn().mockReturnValue([true, vi.fn()]);

    render(
      <SettingsPopup onClose={onCloseSpy} audioPlayed={true} setAudioPlayed={setAudioPlayedSpy} />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the SettingsPopup component', () => {
    const settingsPopup = screen.getByText('Settings');
    expect(settingsPopup).toBeInTheDocument();
  });

  it('handles checkbox change correctly', () => {
    const checkbox = screen.getByRole('checkbox');
    
    fireEvent.click(checkbox);

    expect(setAudioPlayedSpy).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const closeButton = screen.getByRole('button', { name: /close/i });
    
    fireEvent.click(closeButton);

    expect(onCloseSpy).toHaveBeenCalled();
  });
});
