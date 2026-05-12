import { it, describe, expect, afterEach, vi } from 'vitest';
import { pokeApiService } from '../../app/service/pokeApiService';
import { pokemonApiClient } from '../../app/api/pokemonApiClient';

vi.mock('../../app/api/pokemonApiClient', () => ({
  pokemonApiClient: {
    getAllPokemons: vi.fn(),
    getPokemonByType: vi.fn(),
    getPokemonByName: vi.fn(),
  },
}));

const mockAllPokemonsData = {
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const mockPokemonByTypeData = {
  pokemon: [
    {
      pokemon: {
        name: 'pidgey',
        url: 'https://pokeapi.co/api/v2/pokemon/16/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'pidgeotto',
        url: 'https://pokeapi.co/api/v2/pokemon/17/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'pidgeot',
        url: 'https://pokeapi.co/api/v2/pokemon/18/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'rattata',
        url: 'https://pokeapi.co/api/v2/pokemon/19/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'raticate',
        url: 'https://pokeapi.co/api/v2/pokemon/20/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'spearow',
        url: 'https://pokeapi.co/api/v2/pokemon/21/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'fearow',
        url: 'https://pokeapi.co/api/v2/pokemon/22/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'jigglypuff',
        url: 'https://pokeapi.co/api/v2/pokemon/39/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'wigglytuff',
        url: 'https://pokeapi.co/api/v2/pokemon/40/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'meowth',
        url: 'https://pokeapi.co/api/v2/pokemon/52/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'persian',
        url: 'https://pokeapi.co/api/v2/pokemon/53/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'farfetchd',
        url: 'https://pokeapi.co/api/v2/pokemon/83/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'doduo',
        url: 'https://pokeapi.co/api/v2/pokemon/84/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'dodrio',
        url: 'https://pokeapi.co/api/v2/pokemon/85/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'lickitung',
        url: 'https://pokeapi.co/api/v2/pokemon/108/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'chansey',
        url: 'https://pokeapi.co/api/v2/pokemon/113/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'kangaskhan',
        url: 'https://pokeapi.co/api/v2/pokemon/115/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'tauros',
        url: 'https://pokeapi.co/api/v2/pokemon/128/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'ditto',
        url: 'https://pokeapi.co/api/v2/pokemon/132/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'eevee',
        url: 'https://pokeapi.co/api/v2/pokemon/133/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'porygon',
        url: 'https://pokeapi.co/api/v2/pokemon/137/',
      },
      slot: 1,
    },
  ],
};

const mockBulbasaurData = {
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://example.com/bulbasaur.png',
  },
  types: [
    {
      type: {
        name: 'grass',
      },
    },
    {
      type: {
        name: 'poison',
      },
    },
  ],
  weight: 69,
  height: 7,
};

const mockIvysaurData = {
  name: 'ivysaur',
  sprites: {
    front_default: 'https://example.com/ivysaur.png',
  },
  types: [
    {
      type: {
        name: 'grass',
      },
    },
    {
      type: {
        name: 'poison',
      },
    },
  ],
  weight: 130,
  height: 10,
};

const mockNames = ['bulbasaur', 'ivysaur'];

const mockPokemonDescription = [
  {
    name: 'bulbasaur',
    imgUrl: 'https://example.com/bulbasaur.png',
    description: 'type - grass, poison; weight - 69; height - 7',
  },
  {
    name: 'ivysaur',
    imgUrl: 'https://example.com/ivysaur.png',
    description: 'type - grass, poison; weight - 130; height - 10',
  },
];
afterEach(() => {
  vi.clearAllMocks();
});

describe('pokeApiService.getBySearchTerm', () => {
  it('calls getAllPokemons and returns pokemon names when searchTerm is empty', async () => {
    vi.mocked(pokemonApiClient.getAllPokemons).mockResolvedValue(
      mockAllPokemonsData
    );
    const result = await pokeApiService.getBySearchTerm('');
    expect(pokemonApiClient.getAllPokemons).toHaveBeenCalled();
    expect(pokemonApiClient.getPokemonByType).not.toHaveBeenCalled();
    expect(result).toEqual(
      mockAllPokemonsData.results.map((pokemon) => pokemon.name)
    );
  });

  it('calls getPokemonByType and returns sliced pokemon names array (20 items) when searchTerm exists', async () => {
    vi.mocked(pokemonApiClient.getPokemonByType).mockResolvedValue(
      mockPokemonByTypeData
    );
    const result = await pokeApiService.getBySearchTerm('normal');
    expect(pokemonApiClient.getPokemonByType).toHaveBeenCalled();
    expect(pokemonApiClient.getAllPokemons).not.toHaveBeenCalled();
    expect(result).toHaveLength(20);
  });

  it('rejects when api client fails', async () => {
    const error = new Error('failed request');
    vi.mocked(pokemonApiClient.getPokemonByType).mockRejectedValue(error);
    await expect(pokeApiService.getBySearchTerm('fire')).rejects.toThrow(
      'failed request'
    );
  });
});

describe('pokeApiService.getPokemonDescription', () => {
  it('calls getPokemonByName for each pokemon name', async () => {
    vi.mocked(pokemonApiClient.getPokemonByName)
      .mockResolvedValueOnce(mockBulbasaurData)
      .mockResolvedValueOnce(mockIvysaurData);
    await pokeApiService.getPokemonDescription(mockNames);
    expect(pokemonApiClient.getPokemonByName).toHaveBeenCalledTimes(
      mockNames.length
    );
    expect(pokemonApiClient.getPokemonByName).toHaveBeenCalledWith('bulbasaur');
    expect(pokemonApiClient.getPokemonByName).toHaveBeenCalledWith('ivysaur');
  });

  it('normalizes API data into PokemonDescription objects', async () => {
    vi.mocked(pokemonApiClient.getPokemonByName)
      .mockResolvedValueOnce(mockBulbasaurData)
      .mockResolvedValueOnce(mockIvysaurData);
    const result = await pokeApiService.getPokemonDescription(mockNames);
    expect(result).toEqual(mockPokemonDescription);
  });

  it('returns empty array when names array is empty', async () => {
    vi.mocked(pokemonApiClient.getPokemonByName).mockResolvedValue([]);
    const result = await pokeApiService.getPokemonDescription([]);
    expect(result).toEqual([]);
    expect(pokemonApiClient.getPokemonByName).not.toHaveBeenCalled();
  });
  it('rejects when getPokemonByName fails', async () => {
    const error = new Error('failed request');
    vi.mocked(pokemonApiClient.getPokemonByName).mockRejectedValue(error);
    await expect(
      pokeApiService.getPokemonDescription(mockNames)
    ).rejects.toThrow('failed request');
  });
});
