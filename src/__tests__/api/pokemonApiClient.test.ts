import { it, describe, expect, afterEach, vi } from 'vitest';
import { pokemonApiClient } from '@api/pokemonApiClient';

const mockedAxios = vi.hoisted(() => vi.fn());

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: mockedAxios,
    })),
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

const mockPokemonTypeData = {
  pokemon: [
    {
      pokemon: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      slot: 1,
    },
    {
      pokemon: {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
      slot: 1,
    },
  ],
};

const mockPokemonDetailsData = {
  name: 'bulbasaur',
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('pokemonApiClient.getAllPokemons', () => {
  it('calls axios.get with the pokemon list endpoint including default limit and offset', async () => {
    mockedAxios.mockResolvedValue({ data: mockAllPokemonsData });
    await pokemonApiClient.getAllPokemons();
    expect(mockedAxios).toHaveBeenCalledWith('pokemon?limit=20&offset=0');
  });

  it('returns response data when the pokemon list request is successful', async () => {
    mockedAxios.mockResolvedValue({ data: mockAllPokemonsData });
    const result = await pokemonApiClient.getAllPokemons();
    expect(result).toEqual(mockAllPokemonsData);
  });

  it('rejects with an error when the pokemon list request fails', async () => {
    const error = new Error('failed request');
    mockedAxios.mockRejectedValue(error);
    await expect(pokemonApiClient.getAllPokemons()).rejects.toThrow(
      'failed request'
    );
  });
});

describe('pokemonApiClient.getPokemonByType', () => {
  it('calls axios.get with the type endpoint and provided pokemon type', async () => {
    mockedAxios.mockResolvedValue({ data: mockPokemonTypeData });
    await pokemonApiClient.getPokemonByType('grass');
    expect(mockedAxios).toHaveBeenCalledWith('type/grass');
  });

  it('returns response data when the pokemon type request is successful', async () => {
    mockedAxios.mockResolvedValue({ data: mockPokemonTypeData });
    const result = await pokemonApiClient.getPokemonByType('grass');
    expect(result).toEqual(mockPokemonTypeData);
  });

  it('rejects with an error when the pokemon type request fails', async () => {
    const error = new Error('failed request');
    mockedAxios.mockRejectedValue(error);
    await expect(pokemonApiClient.getPokemonByType('grass')).rejects.toThrow(
      'failed request'
    );
  });
});

describe('pokemonApiClient.getPokemonByName', () => {
  it('calls axios.get with the pokemon endpoint and provided pokemon name', async () => {
    mockedAxios.mockResolvedValue({ data: mockPokemonDetailsData });
    await pokemonApiClient.getPokemonByName(mockPokemonDetailsData.name);
    expect(mockedAxios).toHaveBeenCalledWith('pokemon/bulbasaur');
  });
  it('returns response data when the pokemon details request is successful', async () => {
    mockedAxios.mockResolvedValue({ data: mockPokemonDetailsData });
    const result = await pokemonApiClient.getPokemonByName(
      mockPokemonDetailsData.name
    );
    expect(result).toEqual(mockPokemonDetailsData);
  });
  it('rejects with an error when the pokemon details request fails', async () => {
    const error = new Error('failed request');
    mockedAxios.mockRejectedValue(error);
    await expect(
      pokemonApiClient.getPokemonByName('bulbasaur')
    ).rejects.toThrow('failed request');
  });
});
