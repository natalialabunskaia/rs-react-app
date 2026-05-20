import { it, describe, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { HomePage } from '@pages/HomePage/HomePage';
import { pokeApiService } from '@service/pokeApiService';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

vi.mock('../app/service/pokeApiService', () => ({
  pokeApiService: {
    getBySearchTerm: vi.fn(),
    getPokemonDetails: vi.fn(),
  },
}));

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.mocked(pokeApiService.getBySearchTerm).mockResolvedValue([]);
    vi.mocked(pokeApiService.getPokemonDetails).mockResolvedValue([]);
  });

describe('App initial tests', () => {
  it('If localStorage is empty, Api is called with all pokemons on initial load', async () => {

    render(<MemoryRouter><HomePage /></MemoryRouter >);

    await waitFor(() => {
      expect(pokeApiService.getBySearchTerm).toHaveBeenCalledWith('', 1);
    });
  });
});

describe('localStorage tests', () => {


  it('renders empty search input when localStorage is empty', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);

    const input = screen.getByLabelText('pokemon-type');
    expect(input).toHaveValue('');
  });

  it('uses saved search term from localStorage on initial load', () => {
    const expectedValue = 'fire';
    localStorage.setItem('searchTerm', expectedValue);

    render(<MemoryRouter><HomePage /></MemoryRouter>);

    const input = screen.getByLabelText('pokemon-type');
    expect(input).toHaveValue(expectedValue);
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    const input = screen.getByLabelText('pokemon-type');
    const button = screen.getByLabelText('search');
    await user.type(input, 'water');
    await user.click(button);
    expect(localStorage.getItem('searchTerm')).toBe('water');
  });

  it('Trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    const input = screen.getByLabelText('pokemon-type');
    const button = screen.getByLabelText('search');
    await user.type(input, '     water     ');
    await user.click(button);
    expect(input).toHaveValue('water');
    expect(localStorage.getItem('searchTerm')).toBe('water');
  });

  it('overwrites existing localStorage value when new search is performed', async () => {
    const user = userEvent.setup();
    localStorage.setItem('searchTerm', 'water');
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    const input = screen.getByLabelText('pokemon-type');
    const button = screen.getByLabelText('search');
    expect(input).toHaveValue('water');

    await user.clear(input);
    await user.type(input, 'fire');
    await user.click(button);
    expect(input).toHaveValue('fire');
    expect(localStorage.getItem('searchTerm')).toBe('fire');
  });
});




