import { it, describe, expect, afterEach } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import Results from '../../app/components/Results';

afterEach(() => {
  cleanup();
});

const mockPokemons = [
  {
    name: 'bulbasaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    description: 'type - grass, poison; weight - 69; height - 7',
  },
  {
    name: 'ivysaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    description: 'type - grass, poison; weight - 130; height - 10',
  },
  {
    name: 'venusaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    description: 'type - grass, poison; weight - 1000; height - 20',
  },
];

describe('Rendering Tests', () => {
  it('should render Results component', () => {
    render(<Results pokemons={mockPokemons} />);
    const resultsContainer = screen.getByTestId('results-container');
    expect(resultsContainer).toBeInTheDocument();
  });

  it('should render one card for each pokemon', () => {
    render(<Results pokemons={mockPokemons} />);
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(mockPokemons.length);
  });

  it('each card displays pokemon name', () => {
    render(<Results pokemons={mockPokemons} />);
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    pokemonCards.forEach((pokemonCard, index) => {
      expect(
        within(pokemonCard).getByText(`Name: ${mockPokemons[index].name}`)
      ).toBeInTheDocument();
    });
  });
  it('each card displays pokemon description', () => {
    render(<Results pokemons={mockPokemons} />);
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    pokemonCards.forEach((pokemonCard, index) => {
      expect(
        within(pokemonCard).getByText(
          `Description: ${mockPokemons[index].description}`
        )
      ).toBeInTheDocument();
    });
  });
  it('each card displays pokemon image', () => {
    render(<Results pokemons={mockPokemons} />);
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    pokemonCards.forEach((pokemonCard, index) => {
      const image = within(pokemonCard).getByRole('img', {
        name: mockPokemons[index].name,
      });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockPokemons[index].imgUrl);
    });
  });
});
