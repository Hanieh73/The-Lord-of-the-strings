import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterCard from '.';

describe('CharacterCard Component', () => {
  const characterData = {
    name: 'John Doe',
    img: 'http://localhost:3000/path/to/image.jpg',
    description: 'A description of the character.',
  };

  beforeEach(() => {
    render(<CharacterCard {...characterData} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders character name', () => {
    const nameElement = screen.getByText(`Name: ${characterData.name}`);
    expect(nameElement).toBeInTheDocument();
  });

  it('renders character image', () => {
    const imgElement = screen.getByAltText('picture of character');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(characterData.img);
  });

  it('renders character description', () => {
    const descriptionElement = screen.getByText(characterData.description);
    expect(descriptionElement).toBeInTheDocument();
  });
});
