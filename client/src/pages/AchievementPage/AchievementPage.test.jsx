import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import AchievementPage from '.';

// Mocking the useExample context
vi.mock('../../contexts', () => ({
  useExample: () => ({
    achievements: {
      'Main Storyline Achievements': [],
      'The Heist of the Neon Symphony Achievements': [],
      'Echoes of the Forgotten War Achievements': [],
      'Rise of the Tech-Magi Achievements': [],
      'General Achievements': [],
    },
    awardCount: 0,
    setAwardCount: vi.fn(),
  }),
}));

describe('AchievementPage Component', () => {
  beforeEach(() => {
    render(<AchievementPage />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders award count', () => {
    const awardCountElement = screen.getByText('0/29');
    expect(awardCountElement).toBeInTheDocument();
  });

  it('renders general achievements section', () => {
    const generalAchievementsHeading = screen.getByText('General Achievements');
    expect(generalAchievementsHeading).toBeInTheDocument();
  });

  it('renders main storyline achievements section', () => {
    const mainStorylineAchievementsHeading = screen.getByText('Main Storyline Achievements');
    expect(mainStorylineAchievementsHeading).toBeInTheDocument();
  });


});
