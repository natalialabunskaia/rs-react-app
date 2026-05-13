import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonCard from "../../app/components/PokemonCard";

describe('PokemonCard', () => {

    const pokemon = {
      name: 'Pikachu',
      imgUrl: 'https://example.com/pikachu.png',
      description: 'type - electric; weight - 60; height - 4'
    };

  it('should display the correct pokemon name', () => {
    

    render(<PokemonCard pokemon={pokemon} />);

    const nameElement = screen.getByText(/Name: Pikachu/i);
    expect(nameElement).toBeInTheDocument();
  });

  it('should desplays the correct pokemon description', () => {
    render(<PokemonCard pokemon={pokemon} />);

    const descriptionElement = screen.getByText(/Description: type - electric; weight - 60; height - 4/i);
    expect(descriptionElement).toBeInTheDocument();
  })
});
