import { it, describe, expect, afterEach } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import Results from '../../app/components/Results';
import { MemoryRouter } from 'react-router';

afterEach(() => {
  cleanup();
});

const mockPokemons = [
  {
    name: 'bulbasaur',
    imgUrl: 'https://example.com/bulbasaur.png',
    description: 'grass, poison',
    details: 'Height: 7, Weight: 69',
  },
  {
    name: 'ivysaur',
    imgUrl: 'https://example.com/ivysaur.png',
    description: 'grass, poison',
    details: 'Height: 10, Weight: 130',
  },
  {
    name: 'venusaur',
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    description: 'grass, poison',
    details: 'Height: 20, Weight: 1000',
  },
];

describe('Rendering Tests', () => {
  it('should render Results component', () => {
    render(
      <MemoryRouter>
        <Results pokemons={mockPokemons} status="success" />
      </MemoryRouter>
    );
    const resultsContainer = screen.getByTestId('results-container');
    expect(resultsContainer).toBeInTheDocument();
  });

  it('should render one card for each pokemon', () => {
    render(
      <MemoryRouter>
        <Results pokemons={mockPokemons} status="success" />
      </MemoryRouter>
    );
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    expect(pokemonCards).toHaveLength(mockPokemons.length);
  });

  it('each card displays pokemon name', () => {
    render(
      <MemoryRouter>
        <Results pokemons={mockPokemons} status="success" />
      </MemoryRouter>
    );
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    pokemonCards.forEach((pokemonCard, index) => {
      expect(
        within(pokemonCard).getByText(`Pokemon: ${mockPokemons[index].name}`)
      ).toBeInTheDocument();
    });
  });
  it('each card displays pokemon description', () => {
    render(
      <MemoryRouter>
        <Results pokemons={mockPokemons} status="success" />
      </MemoryRouter>
    );
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    pokemonCards.forEach((pokemonCard, index) => {
      expect(
        within(pokemonCard).getByText(
          `Type: ${mockPokemons[index].description}`
        )
      ).toBeInTheDocument();
    });
  });
  it('each card displays pokemon image', () => {
    render(
      <MemoryRouter>
        <Results pokemons={mockPokemons} status="success" />
      </MemoryRouter>
    );
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
