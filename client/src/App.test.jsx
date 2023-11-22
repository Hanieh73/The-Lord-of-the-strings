import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <App />
      </Router>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the home page by default', () => {
    const homePageElement = screen.getByText('HomePage');
    expect(homePageElement).toBeInTheDocument();
  });

});
