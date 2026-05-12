import axios from 'axios';
import { it, describe, expect, afterEach, vi } from 'vitest';
import { pokemonApiClient } from '../../app/api/pokemonApiClient';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

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
    mockedAxios.get.mockResolvedValue({ data: mockAllPokemonsData });
    await pokemonApiClient.getAllPokemons();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );
  });

  it('returns response data when the pokemon list request is successful', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockAllPokemonsData });
    const result = await pokemonApiClient.getAllPokemons();
    expect(result).toEqual(mockAllPokemonsData);
  });

  it('rejects with an error when the pokemon list request fails', async () => {
    const error = new Error('failed request');
    mockedAxios.get.mockRejectedValue(error);
    await expect(pokemonApiClient.getAllPokemons()).rejects.toThrow(
      'failed request'
    );
  });
});

describe('pokemonApiClient.getPokemonByType', () => {
  it('calls axios.get with the type endpoint and provided pokemon type', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockPokemonTypeData });
    await pokemonApiClient.getPokemonByType('grass');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/type/grass'
    );
  });

  it('returns response data when the pokemon type request is successful', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockPokemonTypeData });
    const result = await pokemonApiClient.getPokemonByType('grass');
    expect(result).toEqual(mockPokemonTypeData);
  });

  it('rejects with an error when the pokemon type request fails', async () => {
    const error = new Error('failed request');
    mockedAxios.get.mockRejectedValue(error);
    await expect(pokemonApiClient.getPokemonByType('grass')).rejects.toThrow(
      'failed request'
    );
  });
});

describe('pokemonApiClient.getPokemonByName', () => {
  it('calls axios.get with the pokemon endpoint and provided pokemon name', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockPokemonDetailsData });
    await pokemonApiClient.getPokemonByName(mockPokemonDetailsData.name);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
  });
  it('returns response data when the pokemon details request is successful', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockPokemonDetailsData });
    const result = await pokemonApiClient.getPokemonByName(
      mockPokemonDetailsData.name
    );
    expect(result).toEqual(mockPokemonDetailsData);
  });
  it('rejects with an error when the pokemon details request fails', async () => {
    const error = new Error('failed request');
    mockedAxios.get.mockRejectedValue(error);
    await expect(
      pokemonApiClient.getPokemonByName('bulbasaur')
    ).rejects.toThrow('failed request');
  });
});
