import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonCard from '@components/PokemonCard';
import { MemoryRouter } from 'react-router';

describe('PokemonCard', () => {
  const pokemon = {
    name: 'Pikachu',
    imgUrl: 'https://example.com/pikachu.png',
    description: 'electric',
  };

  it('should display the correct pokemon name', () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={pokemon} />
      </MemoryRouter>
    );

    const nameElement = screen.getByText(/Pokemon: Pikachu/i);
    expect(nameElement).toBeInTheDocument();
  });

  it('should desplays the correct pokemon description', () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={pokemon} />
      </MemoryRouter>
    );

    const descriptionElement = screen.getByText(
      /type: electric/i
    );
    expect(descriptionElement).toBeInTheDocument();
  });
});
