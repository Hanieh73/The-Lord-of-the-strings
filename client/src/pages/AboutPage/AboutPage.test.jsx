import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from '.';

describe('AboutPage Component', () => {
  beforeEach(() => {
    render(<AboutPage />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the about page content', () => {
    const aboutPageHeading = screen.getByText('This is a Lap 3 project');
    expect(aboutPageHeading).toBeInTheDocument();
  });
});
