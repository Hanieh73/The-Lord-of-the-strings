import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import AchievementCard from '.';

// Mocking the useExample context
vi.mock('../../contexts', () => ({
  useExample: () => ({ awardCount: 0 }),
}));

const mockTrophy = {
  name: 'Neon Navigator',
  description: 'Description of Neon Navigator',
  achieved: true,
};

describe('AchievementCard Component', () => {
  beforeEach(() => {
    render(<AchievementCard trophy={mockTrophy} index={0} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders trophy name', () => {
    const trophyNameElement = screen.getByText(mockTrophy.name);
    expect(trophyNameElement).toBeInTheDocument();
  });

  it('renders trophy description', () => {
    const trophyDescriptionElement = screen.getByText(mockTrophy.description);
    expect(trophyDescriptionElement).toBeInTheDocument();
  });


});
