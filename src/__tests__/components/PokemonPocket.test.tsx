import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PokemonPocket from '@components/PokemonPocket';
import { usePokemonStore } from '@stores/PokemonStore';

vi.mock('@stores/PokemonStore', () => ({
  usePokemonStore: vi.fn(),
}));

const mockUsePokemonStore = vi.mocked(usePokemonStore);

const removePokemon = vi.fn();
const removeAllPokemons = vi.fn();

const emptyStoreMock = {
  pokemons: [],
  count: 0,
  removePokemon,
  removeAllPokemons,
};

const onePokemonStoreMock = {
  pokemons: [{ name: 'pikachu' }],
  count: 1,
  removePokemon,
  removeAllPokemons,
};

const twoPokemonsStoreMock = {
  pokemons: [{ name: 'pikachu' }, { name: 'bulbasaur' }],
  count: 2,
  removePokemon,
  removeAllPokemons,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('PokemonPocket', () => {
  it('does not render pocket content when no pokemons are selected', () => {
    mockUsePokemonStore.mockReturnValue(emptyStoreMock);

    render(<PokemonPocket />);

    expect(screen.queryByText(/pokemon pocket/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/you caught/i)).not.toBeInTheDocument();
  });

  it('renders selected pokemons count and names', () => {
    mockUsePokemonStore.mockReturnValue(twoPokemonsStoreMock);

    render(<PokemonPocket />);

    expect(screen.getByText(/pokemon pocket/i)).toBeInTheDocument();
    expect(
      screen.getByText(/you caught: 2 pokemon\(s\)!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('removes all pokemons when Remove all Pokemons is clicked', async () => {
    const user = userEvent.setup();

    mockUsePokemonStore.mockReturnValue(onePokemonStoreMock);

    render(<PokemonPocket />);

    await user.click(
      screen.getByRole('button', { name: /remove all pokemons/i })
    );

    expect(removeAllPokemons).toHaveBeenCalledTimes(1);
  });

  it('removes one pokemon when Remove button is clicked', async () => {
    const user = userEvent.setup();

    mockUsePokemonStore.mockReturnValue(onePokemonStoreMock);

    render(<PokemonPocket />);

    await user.click(screen.getByRole('button', { name: /^remove$/i }));

    expect(removePokemon).toHaveBeenCalledTimes(1);
    expect(removePokemon).toHaveBeenCalledWith('pikachu');
  });

  it('renders Download all Pokemons button', () => {
    render(<PokemonPocket />);

    expect(
      screen.getByRole('button', { name: /download all pokemons/i })
    ).toBeInTheDocument();
  });

  it('has sticky position at the bottom', () => {
    mockUsePokemonStore.mockReturnValue(onePokemonStoreMock);

    const { container } = render(<PokemonPocket />);

    expect(container.querySelector('aside')).toHaveClass(
      'position-sticky',
      'bottom-0'
    );
  });
});
